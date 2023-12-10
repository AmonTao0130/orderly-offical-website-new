import React from "react";
import HeaderLeft from "../imgs/gradient/HeaderLeft.svg";
import HeaderRight from "../imgs/gradient/HeaderRight.svg";
import { cn } from "@/utils";

const HeaderGradient: React.FC = (props) => {
  return (
    <>
      <img
        className={cn(
          "absolute",
          /** 375 */
          "w-[659px] h-[697px] left-[-150px] top-[0px]",
          /** 768 */
          "md:w-[659px] md:h-[697px] md:left-[-250px] md:top-[0px]",
          /** 1024 */
          "lg:w-[659px] lg:h-[697px] lg:left-[-200px] lg:top-[0px]",
          /** 1440 */
          "xl:w-[659px] xl:h-[697px] xl:left-[-100px] xl:top-[0px]",
          /** 1920 */
          "2xl:w-[659px] 2xl:h-[697px] 2xl:left-[-50px] 2xl:top-[0px]"
        )}
        src={HeaderLeft.src}
      />
      <img
        className={cn(
          "absolute",
          /** 375 */
          "w-[659px] h-[697px] right-[-150px] top-[0px]",
          /** 768 */
          "md:w-[659px] md:h-[697px] md:right-[-250px] md:top-[0px]",
          /** 1024 */
          "lg:w-[659px] lg:h-[697px] lg:right-[-200px] lg:top-[0px]",
          /** 1440 */
          "xl:w-[659px] xl:h-[697px] xl:right-[-100px] xl:top-[0px]",
          /** 1920 */
          "2xl:w-[659px] 2xl:h-[697px] 2xl:right-[-50px] 2xl:top-[0px]"
        )}
        src={HeaderRight.src}
      />
    </>
  );
};

export default HeaderGradient;
