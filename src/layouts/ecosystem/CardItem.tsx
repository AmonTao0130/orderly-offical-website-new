import React from "react";
import { cn } from "@/utils";
import Button from "@/components/Button";
import type { TCardData } from "./cardData";

interface CardItemProps {
  data: TCardData;
}
// blur-[75px]
const CardItem: React.FC<CardItemProps & CardItemProps> = (props) => {
  const { data } = props;
  return (
    <div
      className={cn(
        "relative p-[32px] bg-[rgba(0,0,0,0.3)] overflow-hidden",
        "border-[1px] border-solid border-primary-20 rounded-[32px]",
        /** 375 */
        "w-full m-[20px]",
        /** 768 */
        "md:w-[calc((100%_-_120px)_/_2)]",
        /** 1024 */
        "lg:w-[calc((100%_-_120px)_/_3)]"
      )}
    >
      <img
        className="absolute top-0 left-0 w-full h-full blur-[75px] opacity-[0.3]"
        src={data.icon}
        alt={`${data.title.replace(" ", "-")}-gradient-background`}
      />
      <div className="relative w-full">
        <div className="flex justify-between">
          <img
            className={cn(
              /** 375 */
              "w-[60px] h-[60px]",
              /** 768 */
              "w-[80px] h-[80px]",
              /** 1024 */
              "lg:w-[100px] lg:h-[100px]"
            )}
            src={data.icon}
            alt={data.title}
          />
          <div
            className={cn(
              "text-sm leading-[16.8px] text-primary",
              "border-[1px] border-solid border-primary-36 rounded-full",
              "h-[33px] px-[12px]",
              "flex justify-center items-center"
            )}
          >
            {data.category}
          </div>
        </div>
        <h2
          className={cn(
            " text-primary font-display font-semibold",
            /** 375 */
            "text-2xl leading-[24.48px] mt-[16px]",
            /** 768 */
            "md:mt-[28px]",
            /** 1024 */
            "lg:text-[28px] lgleading-[32.64px]"
          )}
        >
          {data.title}
        </h2>

        <div
          className={cn(
            " text-primary-80 font-medium pt-[28px]",
            "border-t-[1px] border-t-solid border-t-primary-36",
            /** 375 */
            "h-[120px] text-sm leading-[21px] mt-[16px]",
            /** 768 */
            "md:mt-[28px] md:text-base md:leading-[24px] md:h-[168px]",
            /** 1024 */
            "lg:h-[192px]",
            /** 1440 */
            "xl:h-[120px]"
          )}
        >
          {data.description}
        </div>

        <Button
          className={cn(
            /** 375 */
            "mt-[16px]",
            /** 768 */
            "md:mt-[28px]"
          )}
          type="outlined"
          onClick={() => {
            window.open(data.url);
          }}
        >
          Visit
        </Button>
      </div>
    </div>
  );
};

export default CardItem;
