import React from "react";
import type { PropsWithClassName } from "@/types";
import { cn, formatDate } from "@/utils";
import Content from "@/components/Content";
import type { Article } from "@/strapi/type";
import { format } from "date-fns";

interface HeaderProps {
  article: Article;
}

const Header: React.FC<HeaderProps & PropsWithClassName> = (props) => {
  if (!props.article) {
    return null;
  }

  const { attributes } = props.article || {};

  return (
    <div
      style={{
        background:
          "radial-gradient(53.11% 53.11% at 50% 100%, rgba(84, 0, 190, 0.8) 0%, rgba(77, 8, 165, 0) 100%), #0A0A0A",
      }}
    >
      <Content
        className={cn(
          "flex flex-col",
          /** 375 */
          "pt-[34px] pb-[34.56px]",
          /** 768 */
          "md:pt-[34px] md:pb-[37px]",
          /** 1024 */
          "lg:flex-row lg:justify-between lg:items-center lg:pt-[60px] lg:pb-[88px]",
          /** 1440 */
          "xl:flex-row xl:justify-between xl:pb-[91.25px]"
        )}
      >
        <div
          className={cn(
            /** 375 */
            "",
            /** 768 */
            "md:",
            /** 1024 */
            "lg:w-[422px]",
            /** 1440 */
            "xl:w-[620px]"
          )}
        >
          <div className={cn("flex items-center")}>
            <div
              className={cn(
                /** 375 */
                "text-base leading-[24px] text-primary-80",
                /** 768 */
                "md:text-xl md:leading-[30px]"
              )}
            >
              {formatDate(attributes.publishedAt)}
            </div>
            <div
              className={cn(
                "flex justify-center items-center h-[30px] px-[12px] ml-[12px]",
                "text-xs leading-[18px] text-primary-100",
                "border-[1px] border-solid border-primary-50 rounded-full"
              )}
            >
              {attributes.category?.data?.attributes?.name}
            </div>
          </div>
          <div
            className={cn(
              /** 375 */
              "text-2xl leading-[28.8px] text-primary font-bold font-title mt-[20px]",
              /** 768 */
              "md:text-[32px] md:leading-[38.4px]",
              /** 1024 */
              "lg:text-4xl lg:leading-[48px]",
              /** 1440 */
              "xl:text-[48px] xl:leading-[57.6px]"
            )}
          >
            {attributes.title}
          </div>
          <div
            className={cn(
              /** 375 */
              "text-base leading-[24px] text-primary-80 mt-[20px]",
              /** 768 */
              "md:text-xl leading-[30px]"
            )}
          >
            by Orderly Network
          </div>
        </div>

        <img
          className={cn(
            /** 375 */
            "w-full rounded-[12.97px] mt-[30px]",
            /** 768 */
            "md:w-[688px] md:h-[387px] md:rounded-[26.63px] md:mt-[34px]",
            /** 1024 */
            "lg:w-[442px] lg:h-[248.62px] lg:rounded-[17.11px] lg:mt-0",
            /** 1440 */
            "xl:w-[620px] xl:h-[348.75px] xl:rounded-[24px]"
          )}
          alt={attributes.cover?.data?.attributes?.alternativeText}
          src={attributes.cover?.data?.attributes?.formats?.small?.url}
        />
      </Content>
    </div>
  );
};

export default Header;
