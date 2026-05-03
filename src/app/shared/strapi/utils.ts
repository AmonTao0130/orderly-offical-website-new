import type { Article } from "./type";

/** 获取文章的显示时间 */
export function getDisplayTime(article: Article) {
  const { attributes } = article || {};
  const { createdAt, publishedAt, postedTime } = attributes || {};
  const displayTime = postedTime || publishedAt || createdAt;
  return new Date(displayTime);
}

/** 获取封面图片 */
export function getArticleCoverImage(article?: Article) {
  const attributes = article?.attributes?.cover?.data?.attributes;
  return (
    attributes?.formats?.small?.url ||
    attributes?.formats?.medium?.url ||
    attributes?.formats?.thumbnail?.url ||
    attributes?.url
  );
}
