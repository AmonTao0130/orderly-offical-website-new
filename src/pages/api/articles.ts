export const prerender = false;

import type { APIRoute } from "astro";
import {
  checkCategoryIsExist,
  getArticles,
  STRAPI_MAX_PAGE_SIZE,
} from "@/strapi/services";
import { type PublicationState } from "@/strapi/type";
import { getDataFromCache, TTL_MAP } from "@/strapi/memoryCache";
import { getPublicationState, isDev } from "@/utils";

function formatPage(page: string | null) {
  if (!page) {
    return 1;
  }
  const pageNum = parseInt(page);
  if (isNaN(pageNum) || pageNum < 1) {
    return 1;
  }

  // TODO: 目前文章总数不到 200，页码只有 2 页，这里限制最大页码为 10，后续文章数量多了，再调整这个数字
  //  page 太多会导致缓存的 key 太多，导致服务器内存不够
  return Math.min(pageNum, 10);
}

export const GET: APIRoute = async (data) => {
  const params = data.url.searchParams;
  const hostname = data.url.hostname;
  const page = formatPage(params.get("page"));
  const category = params.get("category");
  const publicationState = getPublicationState(hostname);

  const categoryStr = (await checkCategoryIsExist(category))
    ? `&category=${category}`
    : "";

  const cacheKey = `/articles?page=${page}${categoryStr}&publicationState=${publicationState}`;

  const ttlMs = isDev(hostname) ? TTL_MAP.MINUTES_DEV : TTL_MAP.DEFAULT;

  const { data: res, hit } = await getDataFromCache(
    cacheKey,
    () =>
      getArticles({
        pagination: {
          page: page,
          pageSize: STRAPI_MAX_PAGE_SIZE,
        },
        category: category!,
        publicationState: publicationState as PublicationState,
      }),
    ttlMs
  );

  return new Response(JSON.stringify(res), {
    headers: {
      "Content-Type": "application/json",
      "Strapi-Cache": hit ? "HIT" : "MISS",
    },
  });
};
