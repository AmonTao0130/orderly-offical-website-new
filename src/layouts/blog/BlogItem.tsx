import React from "react";
import type { PropsWithClassName } from "@/types";
import { cn, formatDate } from "@/utils";
import Button from "@/components/Button";
import type { Article } from "@/strapi/type";
import { getArticleCoverAlt, getArticleCoverImage } from "@/utils/strapi";

type BlogItemProps = PropsWithClassName & {
  article: Article;
};

const BlogItem: React.FC<BlogItemProps> = (props) => {
  const { attributes } = props.article || {};
  return (
    <div
      // 直接写tailwind样式没有生效 改为写在 tailwind utilities里了
      // style={{
      //   background:
      //     "radial-gradient(114.23% 114.23% at 50% 108.86%, #903EF8 0%, rgba(0, 0, 0, 0.00) 100%), #0A0A0A",
      // }}
      className={cn(
        "mx-[10px] rounded-[32px] cursor-pointer",
        /** 375 */
        "w-full mt-[20px]",
        /** 768 */
        "md:w-[calc((100%_-_40px)_/_2)] md:mt-[40px]",
        /** 1024 */
        "lg:w-[calc((100%_-_60px)_/_3)]",
        "hover:blog-item-hover"
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
        alt={getArticleCoverAlt(props.article)}
        src={getArticleCoverImage(props.article)}
      />
      <div
        style={{}}
        className={cn(
          "p-[32px]",
          "border-[1px] border-t-0 border-solid border-primary-20 border-t-none",
          /** 375 */
          "rounded-b-[16px]",
          /** 768 */
          "md:rounded-b-[32px]",
          "!bg-red"
          // "hover:!bg-[linear-gradient(0deg,#0A0A0A,#0A0A0A),radial-gradient(114.23%_114.23%_at_50%_108.86%,#903EF8_0%)]"
        )}
      >
        <div className="text-base leading-[24px] text-primary-80">
          {formatDate(attributes.postedTime || attributes.publishedAt)}
        </div>
        <div className="h-[152px]">
          <div className="text-xl text-primary leading-[24px] mt-[8px] font-extrabold font-title max-h-[72px] text-ellipsis line-clamp-3">
            {attributes.title}
          </div>
          <div className="text-base leading-[24px] font-medium text-primary-80 mt-[8px] max-h-[72px] text-ellipsis line-clamp-3">
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
