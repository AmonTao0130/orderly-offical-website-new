import React from "react";
import Brand from "../imgs/gradient/Brand.svg";
import { cn } from "@/utils";

const EcosystemGradient: React.FC = (props) => {
  return (
    <>
      <img
        className={cn(
          "absolute z-[-1]",
          /** 375 */
          "w-[584px] h-[434px] right-[-78px] top-[-90px]",
          /** 768 */
          "md:w-[584px] md:h-[434px] md:right-[-78px] md:top-[-90px]",
          /** 1024 */
          "lg:w-[780px] lg:h-[580px] lg:right-[-104px] lg:top-[-90px]",
          /** 1440 */
          "xl:w-[976px] xl:h-[725px] xl:right-[-130px] xl:top-[-90px]",
          /** 1920 */
          "2xl:w-[976px] 2xl:h-[725px] 2xl:right-[-130px] 2xl:top-[-90px]"
        )}
        src={Brand.src}
        alt="orderly-network-main-brand-background"
      />
    </>
  );
};

export default EcosystemGradient;