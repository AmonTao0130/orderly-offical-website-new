import fetchApi from "@/strapi";
import type { Article, Categorg, Meta, TFile } from "@/strapi/type";

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
      // populate: "*",
      populate: ["cover", "category", "blocks"],
      pagination: {
        pageSize: 1000,
      },
    },
  });
}

export async function getArticlesData() {
  return await fetchApi<{
    data: Article[];
    meta: Meta;
  }>({
    endpoint: "articles",
    wrappedByKey: "data",
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
    query: {
      "populate[0]": "cover",
      "filters[slug][$eq]": slug,
    },
  });
}

export async function getUploadFiles() {
  return await fetchApi<TFile[]>({
    endpoint: "upload/files",
  });
}
