import type { Categorg } from "@/strapi/type";

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
