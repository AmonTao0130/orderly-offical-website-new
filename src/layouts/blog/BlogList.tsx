import React from "react";
import type { PropsWithClassName } from "@/types";
import Content from "@/components/Content";
import BlogItem, { type TBlogIem } from "./BlogItem";
import Pagination from "./Pagination";
import Bg from "./imgs/header-bg.png";
import { cn } from "@/utils";

const item = {
  title:
    "Introducing Orderly App Chain — Powering Orderly Omnichain Settlement Layer",
  description:
    "Excepteur sint occaecat cupidatat non proident, unt in culpa qui officia deserunt mollit anim ide...",
  img: Bg.src,
  time: "Aug 25, 2023",
  url: "",
};

const data: TBlogIem[] = [];
for (let i = 0; i < 10; i++) {
  data.push(item);
}

const BlogList: React.FC<PropsWithClassName> = (props) => {
  return (
    <Content>
      <div className={cn("flex flex-wrap mx-[-10px]")}>
        {data.map((item, index) => {
          return <BlogItem key={index} {...item} />;
        })}
      </div>

      <Pagination />
    </Content>
  );
};

export default BlogList;
