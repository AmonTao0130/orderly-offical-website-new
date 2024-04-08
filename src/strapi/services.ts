import fetchApi from "@/strapi";
import type {
  Article,
  Categorg,
  Meta,
  Pagination,
  PublicationState,
  TFile,
} from "@/strapi/type";

const commonArticlePopulate = {
  cover: {
    // populate: "*",
    // 文章的封面只需要 alternativeText 和 formats 字段值即可
    fields: ["name", "alternativeText", "url", "formats"],
  },
  category: {
    // populate: "*",
    // 文章的分类只需要 name 和 slug 字段值即可
    fields: ["name", "slug"], // description、createdAt、updatedAt、articles
  },
  //   blocks: {
  //     populate: "*",
  //   },
};

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
  publicationState?: PublicationState;
}) {
  const populate: any = {
    ...commonArticlePopulate,
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
      populate,
      sort: "publishedAt:desc",
      publicationState: params?.publicationState || "live",
      pagination: {
        pageSize: 1000,
        ...params?.pagination,
      },
    },
  });
}

export async function getArticleBySlug(
  slug: string = "",
  params?: {
    publicationState?: PublicationState;
  }
) {
  const populate: any = {
    ...commonArticlePopulate,
    blocks: {
      populate: "*",
    },
  };

  const res: any = await fetchApi({
    endpoint: "articles",
    query: {
      populate,
      publicationState: params?.publicationState || "live",
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
  });

  return res?.data?.[0] as Article;
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

export async function getUploadFiles() {
  return await fetchApi<TFile[]>({
    endpoint: "upload/files",
  });
}
