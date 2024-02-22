import React from "react";
import { cn } from "@/utils";
import type { PropsWithClassName } from "@/types";

interface NumberLabelProps {
  label: string;
  number: string;
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

const NumberLabel: React.FC<NumberLabelProps & PropsWithClassName> = (
  props
) => {
  return (
    <div className={props.className}>
      <div
        className={cn(
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
          /** 375 */
          "text-[32px] leading-[32px] font-semibold mt-[12px]",
          /** 768 */
          "md:text-6xl md:leading-[64px] md:font-bold md:mt-[12px]",
          /** 1024 */
          "lg:text-7xl lg:leading-[98px] lg:mt-0",
          /** 1440 */
          "xl:text-8xl xl:leading-[108px]"
        )}
      >
        {props.number}
      </div>
    </div>
  );
};

export default NumberLabel;
