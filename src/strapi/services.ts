import fetchApi from "@/strapi";
import type { Article, Categorg, Meta, Pagination, TFile } from "@/strapi/type";

export async function getCategories() {
  return await fetchApi<Categorg[]>({
    endpoint: "categories",
    wrappedByKey: "data",
    query: { sort: "id" },
  });
}

export async function getArticles(params?: {
  isDetail?: boolean;
  pagination?: Pagination;
}) {
  const populate: any = {
    cover: {
      populate: "*",
    },
    category: {
      populate: "*",
    },
  };

  if (params?.isDetail) {
    populate.blocks = {
      populate: "*",
    };
  }

  return await fetchApi<Article[]>({
    endpoint: "articles",
    wrappedByKey: "data",
    query: {
      // populate: "*",
      // populate: ["cover", "category", "blocks"],
      // populate: {
      //   cover: {
      //     populate: "*",
      //   },
      //   category: {
      //     populate: "*",
      //   },
      //   blocks: {
      //     populate: "*",
      //   },
      // },
      populate,
      sort: "publishedAt:desc",
      pagination: {
        pageSize: 1000,
        ...params?.pagination,
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
  const populate: any = {
    cover: {
      populate: "*",
    },
    category: {
      populate: "*",
    },
    blocks: {
      populate: "*",
    },
  };

  const res: any = await fetchApi({
    endpoint: "articles",
    query: {
      populate,
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
  });

  return res?.data?.[0] as Article;
}

export async function getUploadFiles() {
  return await fetchApi<TFile[]>({
    endpoint: "upload/files",
  });
}
