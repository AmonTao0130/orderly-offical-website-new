import type { Article } from "./type";

export function getPageData(list: any[], pageSize: number, pageIndex: number) {
  const pageData: any[] = [];
  let rows: any[] = [];
  for (let i = 0; i < list.length; i++) {
    rows.push(list[i]);
    if ((i + 1) % pageSize === 0 || i === list.length - 1) {
      pageData.push(rows);
      rows = [];
    }
  }
  return pageData;
}

export function getRangePage(
  curPageTotal: number = 0,
  pageSize: number,
  pageIndex: number
) {
  if (pageIndex == 1 && curPageTotal === 1) {
    return "1";
  }

  if (pageIndex == 1) {
    return `1-${curPageTotal}`;
  }

  const start = pageSize * (pageIndex - 1) + 1;

  return `${start}-${start + curPageTotal - 1}`;
}

/** 获取文章的显示时间 */
export function getDisplayTime(article: Article) {
  const { attributes } = article || {};
  const { createdAt, publishedAt, postedTime } = attributes || {};
  const displayTime = postedTime || publishedAt || createdAt;
  return new Date(displayTime);
}

export function wrapWithDisplayTime(article: Article) {
  if (!article) {
    return null;
  }

  const { attributes } = article;
  return {
    ...article,
    attributes: {
      ...attributes,
      displayTime: getDisplayTime(article),
    },
  };
}

export function sortByDisplayTime(articles: Article[]) {
  const list = articles.map((article) => {
    const { attributes } = article || {};
    return {
      ...article,
      attributes: {
        ...attributes,
        displayTime: getDisplayTime(article),
      },
    };
  });

  list.sort((a, b) => {
    return a.attributes?.displayTime < b.attributes?.displayTime ? 1 : -1;
  });

  return list;
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

/** 获取封面图片描述文本 */
export function getArticleCoverAlt(article?: Article) {
  return (
    article?.attributes?.cover?.data?.attributes?.alternativeText ||
    article?.attributes?.title
  );
}
