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
        "relative p-[32px] rounded-[32px] border-[1px] border-solid border-primary-20",
        /** 375 */
        "m-[20px]",
        /** 768 */
        "md:w-[calc((100%_-_120px)_/_2)]",
        /** 1024 */
        "lg:w-[calc((100%_-_120px)_/_3)]  "
      )}
    >
      {/* <img
        className="absolute top-0 left-0 w-full h-full blur-[75px]"
        src={data.icon}
      /> */}
      <div className=" relative ">
        <div className="flex justify-between">
          <img className="w-[100px] h-[100px]" src={data.icon} />
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
        <div className="text-[32px] leading-[32.64px] text-primary font-title font-extrabold mt-[28px]">
          {data.title}
        </div>

        <div
          className={cn(
            "text-base leading-[24px] h-[96px] text-primary-80 font-medium pt-[28px] mt-[28px]",
            "border-t-[1px] border-t-solid border-t-primary-36"
          )}
        >
          {data.description}
        </div>

        <Button
          className="mt-[28px]"
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
