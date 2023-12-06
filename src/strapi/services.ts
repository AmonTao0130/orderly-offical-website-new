import fetchApi from "@/strapi";
import type { Article, Categorg, Meta } from "@/strapi/type";

export async function getCategories() {
  return await fetchApi<Categorg[]>({
    endpoint: "categories",
    wrappedByKey: "data",
    query: { sort: "id" },
  });
}

export async function getArticles() {
  return await fetchApi<Article[]>({
    endpoint: "articles",
    wrappedByKey: "data",
    query: {
      "populate[0]": "cover",
      "populate[1]": "category",
      // populate: "*",
    },
  });
}

export async function getArticlesData() {
  return await fetchApi<{
    data: Article[];
    meta: Meta;
  }>({
    endpoint: "articles",
    wrappedByKey: "",
    query: {
      populate: "*",
      // "populate[0]": "cover",
      // "populate[1]": "category",
    },
  });
}

export async function getArticleBySlug(slug: string = "") {
  return await fetchApi<Article[]>({
    endpoint: "articles",
    wrappedByKey: "data",
    wrappedByList: true,
    query: {
      "populate[0]": "cover",
      "filters[slug][$eq]": slug,
    },
  });
}
