import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://orderly.network",
  // Enable React to support React JSX components.
  integrations: [react(), tailwind(), sitemap()],
  // 默认预渲染为 HTML, 添加 export const prerender = false 到任何应该按需服务器渲染的文件
  output: "hybrid",
  adapter: node({
    mode: "middleware",
  }),
  /** 允许开发时使用ip地址访问 */
  server: {
    host: true,
  },
});
