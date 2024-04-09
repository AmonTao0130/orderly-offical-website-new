import express from "express";
import { handler as ssrHandler } from "../dist/server/entry.mjs";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

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
