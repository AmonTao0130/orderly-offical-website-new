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

export function sortByPublishedTime(articles: Article[]) {
  const list = articles.map((article) => {
    const { attributes } = article;
    const publishedTime = BlogPublishedTime[attributes?.slug];
    return {
      ...article,
      attributes: {
        ...attributes,
        publishedAt: publishedTime
          ? new Date(publishedTime)
          : new Date(attributes?.publishedAt),
      },
    };
  });

  list.sort(function (a, b) {
    return a.attributes?.publishedAt < b.attributes?.publishedAt ? 1 : -1;
  });

  return list;
}
