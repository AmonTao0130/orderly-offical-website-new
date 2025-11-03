import express from "express";
import { handler as ssrHandler } from "../dist/server/entry.mjs";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

// 添加安全头中间件 - 必须在所有路由之前
app.use((req, res, next) => {
  // CSP 配置
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'", // Astro SSR 必须
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src https: wss: data: blob:",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ");

  // 设置安全头
  res.setHeader("Content-Security-Policy", csp);
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Referrer-Policy", "strict-origin-when-cross-origin");

  next();
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
