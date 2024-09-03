import React, { useEffect, useMemo, useState } from "react";
import type { PropsWithClassName } from "@/types";
import BlogItem from "./BlogItem";
import { cn, fetcher } from "@/utils";
import {
  type Article,
  type PublicationState,
  type TPagination,
} from "@/strapi/type";
import Pagination from "../../components/Pagination";
import { getRangePage } from "@/utils/strapi";
import useSWR from "swr";
import { useStore } from "@nanostores/react";
import { blogExpandKey } from "@/store";

interface BlogListProps {
  publicationState: PublicationState;
}

const BlogList: React.FC<BlogListProps & PropsWithClassName> = (props) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [pagination, setPagination] = useState({} as TPagination);

  const [pageIndex, setPageIndex] = useState(1);
  const expandKey = useStore(blogExpandKey) || "All";
  const category = expandKey === "All" ? "" : expandKey;

  const { data, isLoading } = useSWR(
    `/api/articles?page=${pageIndex}&category=${category}&publicationState=${props.publicationState}`,
    fetcher
  );

  useEffect(() => {
    if (!data) {
      return;
    }
    setArticles(data.data);
    setPagination(data.meta?.pagination);
  }, [data]);

  useEffect(() => {
    setPageIndex(1);
  }, [expandKey]);

  const { page, pageSize, pageCount, total } = pagination || {};

  const pageParams = useMemo(() => {
    return {
      rangePage: getRangePage(articles?.length, pageSize, page),
      hasPrevious: page > 1,
      hasNext: page < pageCount,
      onPrevious: () => {
        setPageIndex(pageIndex - 1);
      },
      onNext: () => {
        setPageIndex(pageIndex + 1);
      },
    };
  }, [articles, page, pageSize, pageCount]);

  if (isLoading) {
    return (
      <div className="flex justify-center my-[100px]">
        <img
          src="/pageloading.gif"
          className="w-[80px] h-[80px] md:w-[120px] md:h-[120px]"
        />
      </div>
    );
  }
  return (
    <>
      <div className={cn("flex flex-wrap mx-[-10px]", props.className)}>
        {articles?.map((item) => {
          return <BlogItem key={item.id} article={item} />;
        })}
      </div>

      <Pagination
        pageIndex={page}
        pageSize={pageSize}
        pageCount={pageCount}
        total={total}
        {...pageParams}
      />
    </>
  );
};

export default BlogList;
