/**
 * API 域名白名单检查工具
 */

// 允许访问的域名白名单
const ALLOWED_ORIGINS = [
  "https://orderly.network",
  "https://www.orderly.network",
  "https://dev-v2.orderly.network",
];

// 从环境变量读取额外允许的域名（用逗号分隔）
const getAdditionalOrigins = (): string[] => {
  const envOrigins = import.meta.env.ALLOWED_ORIGINS;
  if (typeof envOrigins === "string" && envOrigins.trim()) {
    return envOrigins.split(",").map((origin) => origin.trim());
  }
  return [];
};

/**
 * 检查请求的域名是否在白名单中
 * @param origin - 请求的 Origin 头
 * @param referer - 请求的 Referer 头
 * @returns 如果域名在白名单中返回 true，否则返回 false
 */
export function isOriginAllowed(
  origin: string | null,
  referer: string | null
): boolean {
  // 如果没有 Origin 和 Referer，可能是直接请求 api，拒绝访问
  if (!origin && !referer) {
    return false;
  }

  // 合并所有允许的域名
  const allowedOrigins = [...ALLOWED_ORIGINS, ...getAdditionalOrigins()];
  // 检查 Origin 头
  if (origin) {
    try {
      const originUrl = new URL(origin);
      const originHost = `${originUrl.protocol}//${originUrl.host}`;
      if (
        allowedOrigins.includes(origin) ||
        allowedOrigins.includes(originHost)
      ) {
        return true;
      }
    } catch {
      // Origin 格式无效，继续检查 Referer
    }
  }

  // 如果 Origin 不存在，检查 Referer 头
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      const refererHost = `${refererUrl.protocol}//${refererUrl.host}`;
      if (
        allowedOrigins.includes(referer) ||
        allowedOrigins.includes(refererHost)
      ) {
        return true;
      }
    } catch {
      // Referer 格式无效，忽略
    }
  }

  return false;
}

/**
 * 检查请求的域名并返回 403 响应（如果被拒绝）
 * @param request - 请求对象
 * @returns 如果域名不在白名单中，返回 403 响应；否则返回 null
 */
export function checkOrigin(request: Request): Response | null {
  const origin = request.headers.get("Origin");
  const referer = request.headers.get("Referer");

  if (!isOriginAllowed(origin, referer)) {
    return new Response(
      JSON.stringify({ error: "Access denied. Origin not allowed." }),
      {
        status: 403,
        // headers: {
        //   "Content-Type": "application/json",
        // },
      }
    );
  }

  return null;
}

/**
 * 获取 CORS 响应头
 * @param origin - 请求的 Origin 头
 * @param methods - 允许的 HTTP 方法，默认为 GET
 * @returns CORS 响应头对象
 */
export function getCorsHeaders(
  origin: string | null,
  methods: string = "GET"
): Record<string, string> {
  return {
    "Content-Type": "application/json",
    // 如果需要 CORS，添加以下头部
    ...(origin && {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": methods,
      "Access-Control-Allow-Headers": "Content-Type",
    }),
  };
}
