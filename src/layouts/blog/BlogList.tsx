import React, { useEffect, useState } from "react";
import type { PropsWithClassName } from "@/types";
import BlogItem, { type TBlogIem } from "./BlogItem";
import SmallPagination from "./Pagination.sm";
import MiddlePagination from "./Pagination.md";
import Bg from "./imgs/header-bg.png";
import { cn } from "@/utils";
import fetchApi from "@/strapi";
import { type Article, type Pagination } from "@/strapi/type";
import { getArticlesData } from "@/strapi/services";
import { useStore } from "@nanostores/react";
import { blogExpandKey } from "@/store";

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

const BlogList: React.FC<PropsWithClassName> = (props) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [pagination, setPagination] = useState<Pagination>();
  const expandKey = useStore(blogExpandKey) || "All";

  const getData = async () => {
    const res = await getArticlesData();
    setArticles(res.data);
    setPagination(res.meta.pagination);
  };

  useEffect(() => {
    getData();
  }, [expandKey]);

  return (
    <div>
      <div className={cn("flex flex-wrap mx-[-10px]", props.className)}>
        {articles.map((item, index) => {
          return <BlogItem key={index} {...item} />;
        })}
      </div>

      <SmallPagination className="md:hidden mt-[20px]" />
      <MiddlePagination className="hidden md:flex mt-[40px]" />
    </div>
  );
};

export default BlogList;
