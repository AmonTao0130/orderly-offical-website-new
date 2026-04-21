import express from "express";
import { handler as ssrHandler } from "../dist/server/entry.mjs";
import { createProxyMiddleware } from "http-proxy-middleware";
import markdownMiddleware from "./markdownMiddleware.mjs";

const app = express();

// 添加安全头中间件 - 必须在所有路由之前
app.use((req, res, next) => {
  // const scriptSrc = [
  //   "https://www.googletagmanager.com",
  //   "https://www.google-analytics.com",
  //   "https://cdn.cookie3.co",
  // ];
  // CSP 配置，使用其他标签有可能会导致其他问题，所以目前只用 frame-ancestors 'none' 标签来限制 iframe 嵌套
  const csp = [
    // "default-src 'self'",
    // `script-src 'self' 'unsafe-inline' ${scriptSrc.join(" ")}`, // 允许外部脚本来源
    // `script-src-elem 'self' 'unsafe-inline' ${scriptSrc.join(" ")}`, // 显式允许 <script> 标签的外部来源
    // "style-src 'self' 'unsafe-inline'",
    // "img-src 'self' data: blob: https:",
    // "font-src 'self' data:",
    // "connect-src https: wss: data: blob:",
    "frame-ancestors 'none'",
    // "form-action 'self'",
  ].join("; ");

  // 设置安全头
  res.setHeader("Content-Security-Policy", csp);
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Referrer-Policy", "strict-origin-when-cross-origin");

  next();
});

app.use(markdownMiddleware());

// 仅允许特定域名访问部分 API（/api/articles, /api/pinArticles）
const BASE_ALLOWED_ORIGINS = [
  "https://orderly.network",
  "https://www.orderly.network",
  "https://dev-v2.orderly.network",
  // "http://localhost",
];

function getAdditionalOrigins() {
  const env = process.env.ALLOWED_ORIGINS;
  if (typeof env === "string" && env.trim()) {
    return env.split(",").map((o) => o.trim());
  }
  console.log("env", env);
  return [];
}

function isOriginAllowed(origin, referer) {
  if (!origin && !referer) return false;
  const allowed = [...BASE_ALLOWED_ORIGINS, ...getAdditionalOrigins()];

  const isAllowed = (urlStr) => {
    try {
      const u = new URL(urlStr);
      const host = `${u.protocol}//${u.host}`;
      return allowed.includes(urlStr) || allowed.includes(host);
    } catch {
      return false;
    }
  };

  if (origin && isAllowed(origin)) return true;
  if (referer && isAllowed(referer)) return true;
  return false;
}

function corsHeaders(origin, methods = "GET, OPTIONS") {
  const headers = { "Content-Type": "application/json" };
  if (origin) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = methods;
    headers["Access-Control-Allow-Headers"] = "Content-Type";
  }
  return headers;
}

app.use((req, res, next) => {
  const path = req.path || req.url || "";
  const isProtectedApi =
    path.startsWith("/api/articles") || path.startsWith("/api/pinArticles");

  if (!isProtectedApi) return next();

  const origin = req.headers.origin || null;
  const referer = req.headers.referer || null;

  if (!isOriginAllowed(origin, referer)) {
    return res
      .status(403)
      .set({ "Content-Type": "application/json" })
      .send(JSON.stringify({ message: "Access denied. Origin not allowed." }));
  }

  if (req.method === "OPTIONS") {
    return res.status(204).set(corsHeaders(origin)).send();
  }

  // 通过校验，继续处理
  return next();
});

// 根据 astro.config.mjs 中的 `base` 选项进行更改，默认值为"/"
const base = "/";
app.use(base, express.static("dist/client/"));

// 添加/docs代理转发到/docs/getting-started/what-is-orderly-network，否则/docs会导致
app.use(
  "/docs",
  createProxyMiddleware({
    target:
      "https://orderly.mintlify.dev/docs/getting-started/what-is-orderly-network",
    changeOrigin: true,
    pathFilter: (path, req) => path === "/",
  })
);

// 添加/docs/*代理转发规则
app.use(
  "/docs",
  createProxyMiddleware({
    target: "https://orderly.mintlify.dev/docs",
    changeOrigin: true,
  })
);

app.use(ssrHandler);

app.listen(80);
