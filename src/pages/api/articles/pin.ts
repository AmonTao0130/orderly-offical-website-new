import type { APIRoute } from "astro";
import { getArticles } from "@/strapi/services";
import type { PublicationState } from "@/strapi/type";

export const GET: APIRoute = async (data) => {
  const params = data.url.searchParams;

  const res = await getArticles({
    pagination: {
      page: 1,
      pageSize: 20,
    },
    publicationState: params.get("publicationState") as PublicationState,
    filters: {
      pin: {
        $eq: true,
      },
    },
  });

  return new Response(JSON.stringify(res));
};
