import type { Article, Categorg } from "@/strapi/type";
import { BlogPublishedTime } from "./constant";

export function getTabData(categories: Categorg[]) {
  const list = categories
    .map((category) => {
      const { name, slug } = category.attributes;
      return {
        title: name,
        key: slug,
      };
    })
    .filter((item) => !!item.key);

  return [{ title: "All", key: "All" }, ...list];
}

export function getPageData(list: any[], pageSize: number, pageIndex: number) {
  const pageData = [];
  let rows = [];
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
  const { publishedAt, postedTime } = attributes || {};
  const hardcodePublishedTime = BlogPublishedTime[attributes?.slug];
  const displayTime = postedTime || hardcodePublishedTime || publishedAt;
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

export function sortByPublishedTime(articles: Article[]) {
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

  list.sort(function (a, b) {
    return a.attributes?.displayTime < b.attributes?.displayTime ? 1 : -1;
  });

  return list;
}

/** 检测哪些slug的发布日期没有被hardcode */
export function checkSlugNotHardcoded(articles: Article[]) {
  return articles
    .map((article) => {
      const slug = article.attributes.slug;
      return BlogPublishedTime[slug] ? false : slug;
    })
    .filter((item) => !!item);
}

/** 获取封面图片 */
export function getArticleCoverImage(article?: Article) {
  return article?.attributes?.cover?.data?.attributes?.formats?.small?.url;
}

/** 获取封面图片描述文本 */
export function getArticleCoverAlt(article?: Article) {
  return (
    article?.attributes?.cover?.data?.attributes?.alternativeText ||
    article?.attributes?.title
  );
}
