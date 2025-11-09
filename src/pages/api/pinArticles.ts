export const prerender = false;

import type { APIRoute } from "astro";
import { getPinArticles } from "@/strapi/services";
import { getDataFromCache, TTL_MAP } from "@/strapi/memoryCache";
import { getPublicationState, isDev } from "@/utils";

export const GET: APIRoute = async (data) => {
  const hostname = data.url.hostname;
  const publicationState = getPublicationState(hostname);
  const cacheKey = `/pinArticles?publicationState=${publicationState}`;

  const ttlMs = isDev(hostname) ? TTL_MAP.MINUTES_DEV : TTL_MAP.HOUR;

  const { data: res, hit } = await getDataFromCache(
    cacheKey,
    () => getPinArticles(publicationState),
    ttlMs
  );

  return new Response(JSON.stringify({ data: res || [] }), {
    headers: {
      "Content-Type": "application/json",
      "Strapi-Cache": hit ? "HIT" : "MISS",
    },
  });
};
