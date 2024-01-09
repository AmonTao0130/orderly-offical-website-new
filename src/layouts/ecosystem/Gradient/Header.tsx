import React from "react";
import HeaderLeft from "./imgs/HeaderLeft.svg";
import HeaderRight from "./imgs/HeaderRight.svg";
import { cn } from "@/utils";

const HeaderGradient: React.FC = (props) => {
  return (
    <>
      <img
        className={cn(
          "absolute",
          /** 375 */
          "w-[644px] h-[586px] left-[-50px] top-[50px]",
          /** 768 */
          "md:w-[644px] md:h-[586px] md:left-[-100px] md:top-[150px]",
          /** 1024 */
          "lg:w-[644px] lg:h-[586px] lg:left-[-100px] lg:top-[300px]",
          /** 1440 */
          "xl:w-[644px] xl:h-[586px] xl:left-[-100px] xl:top-[300px]"
        )}
        src={HeaderLeft.src}
        alt="orderly-network-ecosystem-header-left"
      />
      <img
        className={cn(
          "absolute",
          /** 375 */
          "w-[644px] h-[586px] right-[-0px] top-[0px]",
          /** 768 */
          "md:w-[644px] md:h-[586px] md:right-[-50px] md:top-[0px]",
          /** 1024 */
          "lg:w-[644px] lg:h-[586px] lg:right-[-50px] lg:top-[0px]",
          /** 1440 */
          "xl:w-[644px] xl:h-[586px] xl:right-[0px] xl:top-[0px]"
        )}
        src={HeaderRight.src}
        alt="orderly-network-ecosystem-header-right"
      />
    </>
  );
};

export default HeaderGradient;
