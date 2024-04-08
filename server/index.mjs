import express from "express";
import { handler as ssrHandler } from "../dist/server/entry.mjs";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
// 根据 astro.config.mjs 中的 `base` 选项进行更改。
// 它们应该匹配。默认值为"/"。
const base = "/";
app.use(base, express.static("dist/client/"));

// 添加代理转发规则
app.use(
  "/docs",
  createProxyMiddleware({
    target: "https://orderly.mintlify.dev:443",
    changeOrigin: true,
    headers: {
      Host: "orderly.mintlify.dev",
      "X-Forwarded-Host": "orderly.network",
      "X-Forwarded-Proto": "https",
    },
  })
);

app.use(ssrHandler);

app.listen(8080);
app.listen(80);
