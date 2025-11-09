import React, { useMemo } from "react";
import type { PropsWithClassName } from "@/types";
import BlogItem from "./BlogItem";
import { cn } from "@/utils";
import { type Article } from "@/strapi/type";
import Pagination from "../../components/Pagination";
import { getRangePage } from "@/utils/strapi";
import { useStore } from "@nanostores/react";
import { blogExpandKey } from "@/store";
import { useArticles } from "@/layouts/hooks/useArticles";

interface BlogListProps {
  articles: Article[];
  total: number;
}

const BlogList: React.FC<BlogListProps & PropsWithClassName> = (props) => {
  const expandKey = useStore(blogExpandKey) || "All";
  const category = expandKey === "All" ? "" : expandKey;

  const {
    data: articles,
    pagination,
    isLoading,
    setPage,
  } = useArticles({
    displaySize: 6,
    category,
    articles: props.articles,
    total: props.total,
  });

  const { page, pageSize, pageCount, total } = pagination;

  const pageParams = useMemo(() => {
    return {
      rangePage: getRangePage(articles?.length, pageSize, page),
      hasPrevious: page > 1,
      hasNext: page < pageCount,
      onPrevious: () => {
        setPage(page - 1);
      },
      onNext: () => {
        setPage(page + 1);
      },
    };
  }, [articles, page, pageSize, pageCount, setPage]);

  // 不需要 loading，因为编译的时候就会有数据
  // if (isLoading) {
  //   return (
  //     <div className={cn("flex justify-center items-center", "h-[550px]")}>
  //       <img
  //         src="/pageloading.gif"
  //         className="w-[80px] h-[80px] md:w-[120px] md:h-[120px]"
  //       />
  //     </div>
  //   );
  // }

  return (
    <>
      <div className={cn("flex flex-wrap mx-[-10px]", props.className)}>
        {articles?.map((item: any) => {
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
