import React from "react";
import type { PropsWithClassName } from "@/types";
import { cn, formatDate } from "@/utils";
import type { Article } from "@/strapi/type";
import { getArticleCoverAlt, getArticleCoverImage } from "@/utils/strapi";

type BannerItemProps = PropsWithClassName & {
  article: Article;
};

const BannerItem: React.FC<BannerItemProps> = (props) => {
  const { attributes } = props.article || {};
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row",
        "gap-y-[20px] md:gap-y-0",
        "md:gap-x-[20px] lg:gap-x-[28px] xl:gap-x-[40px]",
        "w-full cursor-pointer",
        props.className
      )}
      onClick={() => {
        window.open(`/blog/${attributes.slug}`);
      }}
    >
      <img
        className={cn(
          "w-full md:w-[50%] object-cover",
          /** 375 */
          "h-[200px] rounded-[19px]",
          /** 768 */
          "md:h-[240px] md:rounded-[32px]",
          /** 1024 */
          "lg:h-[280px]",
          /** 1440 */
          "xl:h-[330px]"
        )}
        alt={getArticleCoverAlt(props.article)}
        src={getArticleCoverImage(props.article)}
      />
      <div className="w-full md:w-[50%]">
        <div
          className={cn(
            "text-sm leading-[21px] text-primary-80 font-semibold",
            "md:text-base md:leading-[24px] md:mt-0"
          )}
        >
          {formatDate(attributes.postedTime || attributes.publishedAt)}
        </div>
        <div>
          <div
            className={cn(
              "text-2xl lg:text-[28px] xl:text-[36px]",
              "text-primary font-extrabold mt-[8px]",
              "text-ellipsis line-clamp-4"
            )}
          >
            {attributes.title}
          </div>
          <div
            className={cn(
              "text-base leading-[24px] text-primary-80 mt-[8px]",
              "xl:text-xl xl:leading-[30px]",
              "text-ellipsis line-clamp-3"
            )}
          >
            {attributes.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerItem;
