import React from "react";
import type { PropsWithClassName } from "@/types";
import { cn } from "@/utils";
import cardLeft from "./imgs/card-left.svg";
import cardRight from "./imgs/card-right.svg";

const CardBg: React.FC<PropsWithClassName> = (props) => {
  return (
    <>
      <img
        className={cn(
          "absolute top-0 left-0",
          /** 375 */
          "",
          /** 768 */
          "md",
          /** 1024 */
          // "lg:w-[823.79px] lg:ml-[-503.79px]",
          /** 1440 */
          "xl"
        )}
        src={cardLeft.src}
      />
      <img
        className={cn(
          "absolute bottom-0 right-0",
          /** 375 */
          "",
          /** 768 */
          "md",
          /** 1024 */
          "lg",
          /** 1440 */
          "xl"
        )}
        src={cardRight.src}
      />
    </>
  );
};

export default CardBg;
