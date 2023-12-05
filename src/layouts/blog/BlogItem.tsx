import React from "react";
import type { PropsWithClassName } from "@/types";
import { cn } from "@/utils";
import Button from "@/components/Button";
import type { Article } from "@/strapi/type";

export type TBlogIem = {
  title: string;
  description: string;
  img: string;
  createdAt: string;
  url: string;
  slug: string;
};

const BlogItem: React.FC<Article & PropsWithClassName> = (props) => {
  const { attributes } = props;
  return (
    <div
      className={cn(
        " mx-[10px] rounded-[32px]",
        /** 375 */
        "w-full mt-[20px]",
        /** 768 */
        "md:w-[calc((100%_-_40px)_/_2)] md:mt-[40px]",
        /** 1024 */
        "lg:w-[calc((100%_-_60px)_/_3)]",
        /** 1440 */
        "xl:",
        /** 1440 */
        "2xl:"
      )}
    >
      <img
        className={cn(
          "w-full h-[162px] object-cover",
          /** 375 */
          "rounded-t-[16px]",
          /** 768 */
          "md:rounded-t-[32px]"
        )}
        src={attributes.cover.data.attributes.formats.small.url}
      />
      <div
        className={cn(
          "p-[32px]",
          "border-[1px] border-t-0 border-solid border-primary-20 border-t-none",
          /** 375 */
          "rounded-b-[16px]",
          /** 768 */
          "md:rounded-b-[32px]"
        )}
      >
        <div className="text-base leading-[24px] text-primary-80">
          {attributes.createdAt}
        </div>
        {/* TODO: 添加Articulat CF字体文件 */}
        <div className="text-xl text-primary leading-[24px] mt-[8px] font-extrabold font-['Articulat_CF'] min-h-[96px]">
          {attributes.title}
        </div>
        <div className="text-base eading-[24px] font-medium text-primary-80 mt-[8px] min-h-[72px]">
          {attributes.description}
        </div>
        <Button
          className="mt-[24px]"
          type="outlined"
          onClick={() => {
            window.open(`/blog/${attributes.slug}`);
          }}
        >
          View more
        </Button>
      </div>
    </div>
  );
};

export default BlogItem;
