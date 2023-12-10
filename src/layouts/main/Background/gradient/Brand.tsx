import React from "react";
import Brand from "../imgs/gradient/Brand.svg";
import { cn } from "@/utils";

const BrandGradient: React.FC = (props) => {
  return (
    <>
      <img
        className={cn(
          "absolute",
          /** 375 */
          "w-[487px] h-[362px] right-[-100px] top-[-100px]",
          /** 768 */
          "md:w-[487px] md:h-[362px] md:right-[-100px] md:top-[-100px]",
          /** 1024 */
          "lg:w-[650px] lg:h-[483px] lg:right-[-100px] lg:top-[-200px]",
          /** 1440 */
          "xl:w-[813px] xl:h-[604px] xl:right-[-100px] xl:top-[-250px]",
          /** 1920 */
          "2xl:w-[813px] 2xl:h-[604px] 2xl:right-[-100px] 2xl:top-[-250px]"
        )}
        src={Brand.src}
      />
    </>
  );
};

export default BrandGradient;
