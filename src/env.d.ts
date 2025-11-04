/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly ALLOWED_ORIGINS?: string; // 允许访问 API 的域名列表，用逗号分隔
}
