/// <reference types="astro/client" />

interface ImportMetaEnv {
  // 允许访问 API 的域名列表，用逗号分隔
  readonly ALLOWED_ORIGINS?: string;
}
