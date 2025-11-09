import fetchApi from "@/strapi";
import {
  PublicationStateEnum,
  type Article,
  type Categorg,
  type Meta,
  type Pagination,
  type PublicationState,
  type ResponstList,
  type TFile,
} from "@/strapi/type";
import { getDataFromCache, TTL_MAP } from "./memoryCache";

// strapi api 一次最多只能请求 100 条
export const STRAPI_MAX_PAGE_SIZE = 100;

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
  // author: {
  //   fields: ["name", "slug"],
  // },
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
  filters?: Record<string, any>;
};

export async function getArticles(options?: GetArticlesOptions) {
  const {
    isDetail,
    pagination,
    publicationState = PublicationStateEnum.LIVE,
    category,
  } = options || {};

  const populate: any = {
    ...commonArticlePopulate,
  };

  const filters = {} as any;

  if (isDetail) {
    populate.blocks = {
      populate: "*",
    };
    populate.author = {
      fields: ["name", "slug"],
    };
  }

  if (category) {
    filters.category = {
      slug: {
        $eq: category,
      },
    };
  }

  const sort =
    publicationState === PublicationStateEnum.LIVE
      ? "postedTime:desc"
      : [{ postedTime: "desc" }, { updatedAt: "desc" }];

  return await fetchApi<ResponstList<Article[]>>({
    endpoint: "articles",
    // wrappedByKey: "data",
    query: {
      // populate: "*",
      // populate: ["cover", "category", "blocks"],
      populate,
      sort,
      publicationState,
      pagination: {
        // 一次最多请求 100 条
        pageSize: 100,
        ...pagination,
      },
      filters: options?.filters || filters,
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
      publicationState: params?.publicationState || PublicationStateEnum.LIVE,
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

// 获取已置顶的文章
export async function getPinArticles(
  publicationState = PublicationStateEnum.LIVE
) {
  const res = await getArticles({
    pagination: {
      page: 1,
      pageSize: 20,
    },
    publicationState,
    filters: {
      pin: {
        $eq: true,
      },
    },
  });

  return res?.data || [];
}

// 获取所有页码的文章数据
export async function getAllPageArticles(options?: GetArticlesOptions) {
  const firstPageData = await getArticles({
    pagination: { page: 1, pageSize: STRAPI_MAX_PAGE_SIZE },
    publicationState: PublicationStateEnum.LIVE,
    ...options,
  });

  let articles = firstPageData?.data || [];

  const pageCount = firstPageData?.meta?.pagination?.pageCount || 1;

  for (let page = 2; page <= pageCount; page++) {
    const nextPageData = await getArticles({
      pagination: { page, pageSize: STRAPI_MAX_PAGE_SIZE },
      publicationState: PublicationStateEnum.LIVE,
      ...options,
    });
    articles = [...articles, ...nextPageData?.data];
  }

  return articles;
}

export function getAllPageArticleDetails(options?: GetArticlesOptions) {
  return getAllPageArticles({
    isDetail: true,
    ...options,
  });
}

export async function getFirstPageArticlesFromCache(
  publicationState: PublicationState = PublicationStateEnum.LIVE
) {
  const cacheKey = `/articles?page=1&publicationState=${publicationState}`;

  const { data, hit } = await getDataFromCache(cacheKey, () =>
    getArticles({
      pagination: {
        page: 1,
        pageSize: STRAPI_MAX_PAGE_SIZE,
      },
      publicationState,
    })
  );

  return data as ResponstList<Article[]>;
}

export async function checkSlugIsExist(
  slug: string,
  publicationState: PublicationState = PublicationStateEnum.LIVE
) {
  const firstPageArticles = await getFirstPageArticlesFromCache(
    publicationState
  );

  return firstPageArticles?.data?.some(
    (article) => article.attributes.slug === slug
  );
}

export async function getArticleBySlugFromCache(
  slug: string,
  publicationState: PublicationState = PublicationStateEnum.LIVE,
  ttlMs?: number
) {
  if (!slug) {
    return { article: null, hit: false };
  }

  const cacheKey = `/article/${slug}?publicationState=${publicationState}`;
  const { data: article, hit } = await getDataFromCache(
    cacheKey,
    () => getArticleBySlug(slug, { publicationState }),
    ttlMs
  );
  return { article, hit };
}

// 获取最新发布的 3 篇文章
export async function getLatestArticlesFromCache(
  publicationState: PublicationState = PublicationStateEnum.LIVE
) {
  const cacheKey = `/latestArticles?publicationState=${publicationState}`;

  const { data, hit } = await getDataFromCache(
    cacheKey,
    () =>
      getArticles({
        pagination: { pageSize: 3 },
        publicationState,
      }),
    TTL_MAP.HOUR // 最新发布的 3 篇文章，缓存更新频率不需要太高
  );

  return data?.data || [];
}

export async function getCategoriesFromCache() {
  const cacheKey = `/categories`;
  const { data, hit } = await getDataFromCache(
    cacheKey,
    () => getCategories(),
    TTL_MAP.MONTH // 分类数据一般不会变，有变更的时候重新发版即可，这里设置 1 个月缓存时间
  );
  return data || [];
}

export async function checkCategoryIsExist(category?: string | null) {
  if (!category) {
    return false;
  }
  const categories = await getCategoriesFromCache();
  const isExist = categories.some((item) => item.attributes.slug === category);

  return isExist;
}
