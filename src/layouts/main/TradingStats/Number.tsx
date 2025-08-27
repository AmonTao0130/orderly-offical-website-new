import React from "react";
import { cn } from "@/utils";
import type { PropsWithClassName } from "@/types";

interface NumberLabelProps {
  label: string;
  number: string;
  isLarge?: boolean;
}

// TODO: 375尺寸下字体调整为白色
const numberStyle = {
  background:
    "linear-gradient(360deg, #9975FF -30.75%, rgba(155, 249, 255, 0) 103.38%), linear-gradient(0deg, #FFFFFF, #FFFFFF)",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  WebkitBackgroundClip: "text",
  fontVariantLigatures: "none",
};

const NumberLabel: React.FC<NumberLabelProps & PropsWithClassName> = (props) => {
  return (
    <div
      className={cn(
        props.isLarge 
          ? cn(
              /** 375 */
              "w-full h-[47px] text-center",
              /** 768 */
              "md:w-[528px] md:h-[74px] md:text-center",
              /** 1024 */
              "lg:w-[276px] lg:h-[82px] lg:text-left",
              /** 1440 */
              "xl:w-[402px] xl:h-[104px] xl:text-left"
            )
          : cn(
              /** 375 */
              "w-[130px] h-[42px] text-left",
              /** 768 */
              "md:w-[165px] md:h-[62px] md:text-left",
              /** 1024 */
              "lg:w-[210px] lg:h-[76px] lg:text-left",
              /** 1440 */
              "xl:w-[320px] xl:h-[82px] xl:text-left"
            ),
        props.className
      )}
    >
      <div
        className={cn(
          "font-normal",
          /** 375 */
          "text-[14px] leading-[14px] whitespace-nowrap",
          /** 768 */
          "md:text-[20px] md:leading-[20px] ",
          /** 1024 */
          "lg:text-xl lg:leading-[20px]"
        )}
      >
        {props.label}
      </div>
      <div
        style={numberStyle}
        className={cn(
          "select-none",
          props.isLarge
            ? cn(
                /** 375 */
                "text-[32px] leading-[32px] font-display font-bold mt-[3px]",
                /** 768 */
                "md:text-[48px] md:leading-[48px] md:mt-[12px]",
                /** 1024 */
                "lg:text-[48px] lg:leading-[48px]",
                /** 1440 */
                "xl:text-[80px] xl:leading-[80px]"
              )
            : cn(
                /** 375 */
                "text-[24px] leading-[24px] font-display font-semibold mt-[3px]",
                /** 768 */
                "md:text-[32px] md:leading-[32px] md:mt-[12px]",
                /** 1024 */
                "lg:text-[40px] lg:leading-[40px]",
                /** 1440 */
                "xl:text-[48px] xl:leading-[48px]"
              )
        )}
      >
        {props.number}
      </div>
    </div>
  );
};

export default NumberLabel;
