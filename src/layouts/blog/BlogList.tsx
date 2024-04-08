import React, { useEffect, useMemo, useState } from "react";
import type { PropsWithClassName } from "@/types";
import BlogItem from "./BlogItem";
import { cn } from "@/utils";
import { type Article } from "@/strapi/type";
import { useStore } from "@nanostores/react";
import { blogExpandKey } from "@/store";
import Pagination, { type PaginationProps } from "../../components/Pagination";
import { getPageData, getRangePage } from "@/utils/strapi";

interface BlogListProps {
  data: Article[];
}

const BlogList: React.FC<BlogListProps & PropsWithClassName> = (props) => {
  const [articles, setArticles] = useState<Article[]>(props.data);
  const [pageIndex, setPageIndex] = useState(1);
  const expandKey = useStore(blogExpandKey) || "All";

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
        rangePage: getRangePage(pageIndexData?.length, pageSize, pageIndex),
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

  return (
    <div>
      <div className={cn("flex flex-wrap mx-[-10px]", props.className)}>
        {pageIndexData?.map((item, index) => {
          return <BlogItem key={item.id} article={item} />;
        })}
      </div>

      <Pagination {...pagination} />
    </div>
  );
};

export default BlogList;
