import React from "react";
import type { PropsWithClassName } from "@/types";
import { cn, formatDate } from "@/utils";
import Button from "@/components/Button";
import type { Article } from "@/strapi/type";
import { getArticleCoverImage } from "@/utils/strapi";

type BlogItemProps = PropsWithClassName & {
  article: Article;
};

const BlogItem: React.FC<BlogItemProps> = (props) => {
  const { attributes } = props.article || {};
  return (
    <div
      className={cn(
        "mx-[10px] rounded-[32px]",
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
          "w-full object-cover",
          /** 375 */
          "h-[162px] rounded-t-[16px]",
          /** 768 */
          "md:rounded-t-[32px]",
          /** 1440 */
          "xl:h-[225px]"
        )}
        alt={attributes?.cover?.data?.attributes?.alternativeText}
        src={getArticleCoverImage(props.article)}
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
          {formatDate(attributes.displayTime)}
        </div>
        <div className="h-[152px]">
          <div className="text-xl text-primary leading-[24px] mt-[8px] font-extrabold font-title max-h-[72px] text-ellipsis line-clamp-3">
            {attributes.title}
          </div>
          <div className="text-base eading-[24px] font-medium text-primary-80 mt-[8px] max-h-[72px] text-ellipsis line-clamp-3">
            {attributes.description}
          </div>
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
