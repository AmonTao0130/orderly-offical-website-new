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
        props.isLarge ? "w-[402px] h-[104px]" : "w-[320px] h-[82px]",
        props.className
      )}
    >
      <div
        className={cn(
          "font-normal",
          /** 375 */
          "text-sm leading-[14px] whitespace-nowrap",
          /** 768 */
          "md:text-base md:leading-[16px]",
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
            ? "text-[80px] leading-[80px] font-display font-bold mt-[12px]"
            : "text-[48px] leading-[48px] font-display font-semibold mt-[12px]"
        )}
      >
        {props.number}
      </div>
    </div>
  );
};

export default NumberLabel;
