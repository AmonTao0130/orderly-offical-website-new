import {
  PublicationStateEnum,
  type Article,
  type Meta,
  type Pagination,
  type PublicationState,
  type ResponstList,
} from "./type";
import {
  getLocalArticleBySlug,
  getLocalArticles,
  getLocalCategories,
  getLocalUploadFiles,
} from "./local";

// strapi api 一次最多只能请求 100 条
export const STRAPI_MAX_PAGE_SIZE = 100;

export async function getCategories() {
  return getLocalCategories();
}

export type GetArticlesOptions = {
  isDetail?: boolean;
  pagination?: Pagination;
  publicationState?: PublicationState;
  category?: string;
  filters?: Record<string, any>;
};

export async function getArticles(options?: GetArticlesOptions) {
  return getLocalArticles({
    pagination: {
      pageSize: STRAPI_MAX_PAGE_SIZE,
      ...options?.pagination,
    },
    publicationState: options?.publicationState || PublicationStateEnum.LIVE,
    category: options?.category,
    filters: options?.filters,
  });
}

export async function getArticleBySlug(
  slug: string = "",
  params?: {
    publicationState?: PublicationState;
  }
) {
  return getLocalArticleBySlug(
    slug,
    params?.publicationState || PublicationStateEnum.LIVE
  ) as Article;
}

export async function getArticlesData() {
  return getLocalArticles() as {
    data: Article[];
    meta: Meta;
  };
}

export async function getUploadFiles() {
  return getLocalUploadFiles();
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

  // filter out articles with no slug
  return articles.filter((article) => !!article.attributes.slug);
}

export function getAllPageArticleDetails(options?: GetArticlesOptions) {
  return getAllPageArticles({
    isDetail: true,
    ...options,
  });
}

export async function getFirstPageArticles(
  publicationState: PublicationState = PublicationStateEnum.LIVE
) {
  return getArticles({
    pagination: {
      page: 1,
      pageSize: STRAPI_MAX_PAGE_SIZE,
    },
    publicationState,
  }) as Promise<ResponstList<Article[]>>;
}

export async function checkSlugIsExist(
  slug: string,
  publicationState: PublicationState = PublicationStateEnum.LIVE
) {
  const firstPageArticles = await getFirstPageArticles(publicationState);

  return firstPageArticles?.data?.some(
    (article) => article.attributes.slug === slug
  );
}

export async function getArticleBySlugData(
  slug: string,
  publicationState: PublicationState = PublicationStateEnum.LIVE
) {
  if (!slug) {
    return null;
  }

  return getArticleBySlug(slug, { publicationState });
}

// 获取最新发布的 3 篇文章
export async function getLatestArticles(
  publicationState: PublicationState = PublicationStateEnum.LIVE
) {
  const data = await getArticles({
    pagination: { pageSize: 3 },
    publicationState,
  });

  return data?.data || [];
}

export async function getBlogCategories() {
  return getCategories();
}

export async function checkCategoryIsExist(category?: string | null) {
  if (!category) {
    return false;
  }
  const categories = await getBlogCategories();
  const isExist = categories.some((item) => item.attributes.slug === category);

  return isExist;
}
