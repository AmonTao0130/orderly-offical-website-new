import React from "react";
import type { PropsWithClassName } from "@/types";
import { cn, getDisplayTime } from "@/utils";
import Button from "@/components/Button";
import type { Article } from "@/strapi/type";
import { getArticleCoverAlt, getArticleCoverImage } from "@/utils/strapi";

type BlogItemProps = PropsWithClassName & {
  article: Article;
};

const BlogItem: React.FC<BlogItemProps> = (props) => {
  const { attributes } = props.article || {};

  const isDraft = !attributes.publishedAt;

  const draftTag = isDraft && (
    <span className="text-blue-500 bg-blue-500/10 px-2 py-[2px] rounded-md border border-blue-500/20 ml-2">
      Draft
    </span>
  );

  return (
    <div
      // 直接写tailwind样式没有生效 改为写在 tailwind utilities里了
      // style={{
      //   background:
      //     "radial-gradient(114.23% 114.23% at 50% 108.86%, #903EF8 0%, rgba(0, 0, 0, 0.00) 100%), #0A0A0A",
      // }}
      className={cn(
        "group",
        "mx-[10px] rounded-[32px]",
        /** 375 */
        "w-full mt-[20px]",
        /** 768 */
        "md:w-[calc((100%_-_40px)_/_2)] md:mt-[40px]",
        /** 1024 */
        "lg:w-[calc((100%_-_60px)_/_3)]"
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
          "group-hover:blog-item-hover"
        )}
      >
        <div className="text-base leading-[24px] text-primary-80">
          {getDisplayTime(attributes)}
          {draftTag}
        </div>
        <div className="h-[152px]">
          <div className="text-xl text-primary leading-[24px] mt-[8px] font-semibold font-display max-h-[72px] text-ellipsis line-clamp-3">
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
            // let url = `/blog/${attributes.slug}`;
            // if (isDraft) {
            //   url = `/blog/preview?slug=${attributes.slug}`;
            // }
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
