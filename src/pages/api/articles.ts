export const prerender = false

import type { APIRoute } from "astro";
import { getArticles } from "@/strapi/services";
import type { PublicationState } from "@/strapi/type";

export const GET: APIRoute = async (data) => {
  const params = data.url.searchParams;

  const res = await getArticles({
    pagination: {
      page: params.get("page") ? parseInt(params.get("page")!) : 1,
      pageSize: 6,
    },
    category: params.get("category")!,
    publicationState: params.get("publicationState") as PublicationState,
  });

  return new Response(JSON.stringify(res));
};
