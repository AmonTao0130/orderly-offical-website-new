import fetchApi from "@/strapi";
import type {
  Article,
  Categorg,
  Meta,
  Pagination,
  PublicationState,
  ResponstList,
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
  author: {
    populate: "*",
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
    mock: true,
  });
}

export type GetArticlesOptions = {
  isDetail?: boolean;
  pagination?: Pagination;
  publicationState?: PublicationState;
  category?: string;
};

export async function getArticles(Options?: GetArticlesOptions) {
  const {
    isDetail,
    pagination,
    publicationState = "live",
    category,
  } = Options || {};

  const populate: any = {
    ...commonArticlePopulate,
  };

  const filters = {} as any;

  if (isDetail) {
    populate.blocks = {
      populate: "*",
    };
  }

  if (category) {
    filters.category = {
      slug: {
        $eq: category,
      },
    };
  }

  return await fetchApi<ResponstList<Article[]>>({
    endpoint: "articles",
    // wrappedByKey: "data",
    query: {
      // populate: "*",
      // populate: ["cover", "category", "blocks"],
      populate,
      sort: "postedTime:desc",
      publicationState,
      pagination: {
        pageSize: 6,
        ...pagination,
      },
      filters,
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
