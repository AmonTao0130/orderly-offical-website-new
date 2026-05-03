import {
  PublicationStateEnum,
  type Pagination,
  type PublicationState,
} from "./type";
import {
  getLocalArticles,
  getLocalCategories,
} from "./local";

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
    pagination: options?.pagination,
    publicationState: options?.publicationState || PublicationStateEnum.LIVE,
    category: options?.category,
    filters: options?.filters,
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

// 获取所有文章数据（本地数据一次拿全，无需分页）
export async function getAllPageArticles(options?: GetArticlesOptions) {
  const res = await getArticles({
    ...options,
    publicationState: options?.publicationState || PublicationStateEnum.LIVE,
  });

  return (res?.data || []).filter((article) => !!article.attributes.slug);
}

export function getAllPageArticleDetails(options?: GetArticlesOptions) {
  return getAllPageArticles({
    isDetail: true,
    ...options,
  });
}
