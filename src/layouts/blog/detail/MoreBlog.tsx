import React, { useEffect, useMemo, useState } from "react";
import type { PropsWithClassName } from "@/types";
import Content from "@/components/Content";
import { cn } from "@/utils";
import Button from "@/components/Button";
import type { Article } from "@/strapi/type";
import BlogItem from "../BlogItem";
import { useSize } from "@/hooks/useSize";

interface MoreBlogProps {
  data: Article[];
}

const MoreBlog: React.FC<MoreBlogProps & PropsWithClassName> = (props) => {
  const { width } = useSize();

  const data = useMemo(() => {
    if (width > 1024) {
      return props.data?.slice(0, 3);
    }

    if (width > 768) {
      return props.data?.slice(0, 2);
    }

    return props.data;
  }, [props.data, width]);

  return (
    <>
      <div className="text-center my-[40px] md:hidden">
        <Button
          type="outlined"
          onClick={() => {
            window.open("/blog");
          }}
        >
          View all blog posts
        </Button>
      </div>

      <div
        className={cn(
          "hidden md:block",
          "border-t-[1px] border-t-solid border-t-primary-20",
          props.className
        )}
      >
        <Content className="my-[60px]">
          <div className="flex justify-between items-center">
            <div
              className={cn(
                "font-bold text-primary-100",
                /** 768px */
                "md:text-2xl md:leading-[43.2px]",
                /** 1024 */
                "lg:text-[32px] lg:leading-[57.6px]"
              )}
            >
              More blog posts
            </div>
            <Button
              type="outlined"
              onClick={() => {
                window.open("/blog");
              }}
            >
              View all blog posts
            </Button>
          </div>
          <div className="flex flex-wrap">
            {data.map((item, index) => {
              return <BlogItem key={item.id} {...item} />;
            })}
          </div>
        </Content>
      </div>
    </>
  );
};

export default MoreBlog;
