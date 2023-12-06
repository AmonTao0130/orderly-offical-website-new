import React, { useEffect, useMemo, useState } from "react";
import type { PropsWithClassName } from "@/types";
import BlogItem, { type TBlogIem } from "./BlogItem";
import { cn } from "@/utils";
import fetchApi from "@/strapi";
import { type Article, type TPagination } from "@/strapi/type";
import { getArticles, getArticlesData } from "@/strapi/services";
import { useStore } from "@nanostores/react";
import { blogExpandKey } from "@/store";
import Pagination, { type PaginationProps } from "./Pagination";
import { useSize } from "@/hooks/useSize";
import { getPageData } from "@/utils/strapi";

// const item = {
//   title:
//     "Introducing Orderly App Chain — Powering Orderly Omnichain Settlement Layer",
//   description:
//     "Excepteur sint occaecat cupidatat non proident, unt in culpa qui officia deserunt mollit anim ide...",
//   img: Bg.src,
//   time: "Aug 25, 2023",
//   url: "",
// };

// const data: TBlogIem[] = [];
// for (let i = 0; i < 10; i++) {
//   data.push(item);
// }

interface BlogListProps {
  data: Article[];
}

const BlogList: React.FC<BlogListProps & PropsWithClassName> = (props) => {
  const [articles, setArticles] = useState<Article[]>(props.data);
  const [pageIndex, setPageIndex] = useState(1);
  // const [pagination, setPagination] = useState<Pagination>();
  const expandKey = useStore(blogExpandKey) || "All";
  // const { width } = useSize();

  useEffect(() => {
    const filteredArticles =
      expandKey === "All"
        ? props.data
        : props.data.filter(
            (article) =>
              article.attributes.category.data.attributes.slug === expandKey
          );
    setArticles(filteredArticles);
  }, [props.data, expandKey]);

  const { pageIndexData, pagination } = useMemo(() => {
    const pageSize = 6;
    const pageData = getPageData(articles, pageSize, pageIndex);
    const pageCount = pageData.length;
    const pageIndexData = pageData[pageIndex - 1];
    return {
      pageIndexData,
      pagination: {
        pageIndex,
        pageSize,
        rangePage:
          pageIndexData.length === 1 ? "1" : `1-${pageIndexData.length}`,
        pageCount,
        total: articles.length,
        hasPrevious: pageIndex > 1,
        hasNext: pageIndex < pageCount,
        onPrevious: () => {
          setPageIndex(pageIndex - 1);
        },
        onNext: () => {
          setPageIndex(pageIndex + 1);
        },
      } as PaginationProps,
    };
  }, [articles, pageIndex]);

  // const getData = async () => {
  //   const res = await getArticles();
  // };

  // useEffect(() => {
  //   getData();
  // }, [expandKey]);

  return (
    <div>
      <div className={cn("flex flex-wrap mx-[-10px]", props.className)}>
        {pageIndexData.map((item, index) => {
          return <BlogItem key={item.id} {...item} />;
        })}
      </div>

      <Pagination {...pagination} />
    </div>
  );
};

export default BlogList;
