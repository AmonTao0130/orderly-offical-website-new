export const prerender = false;

import type { APIRoute } from "astro";
import { getArticleBySlug } from "@/strapi/services";

export const GET: APIRoute = async (data) => {
  const params = data.url.searchParams;
  const slug = params.get("slug")!;

  const res = await getArticleBySlug(slug);

  return new Response(JSON.stringify(res));
};
