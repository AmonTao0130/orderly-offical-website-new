import React from "react";
import type { PropsWithClassName } from "@/types";
import { cn } from "@/utils";
import left from "./imgs/eco-left.png";
import right from "./imgs/eco-right.png";

const HeaderBg: React.FC<PropsWithClassName> = (props) => {
  return (
    <div
      // style={{
      //   background:
      //     "linear-gradient(180deg, #D9D9D9 91.11%, rgba(217, 217, 217, 0) 101.4%)",
      // }}
      className={cn(
        "absolute top-0 left-0 w-full h-full mix-blend-screen",
        /** 375 */
        "",
        /** 768 */
        "md:",
        /** 1024 */
        "lg:",
        /** 1440 */
        "xl:",
        /** 1440 */
        "2xl:"
      )}
    >
      <img
        className={cn(
          "absolute top-[-50px] left-0 overflow-hidden",
          /** 375 */
          "h-[270px]",
          /** 768 */
          "md:h-[361px]",
          /** 1024 */
          "lg:h-[448px]",
          /** 1440 */
          "xl:h-[561px]"
        )}
        src={left.src}
        alt="orderly-network-ecosystem-header-left-background"
      />
      <img
        className={cn(
          "absolute bottom-0 right-0",
          /** 375 */
          "h-[227px]",
          /** 768 */
          "md:h-[303px]",
          /** 1024 */
          "lg:h-[377px]",
          /** 1440 */
          "xl:h-[471px]"
        )}
        src={right.src}
        alt="orderly-network-ecosystem-header-right-background"
      />
      <div
        className={cn(
          "hidden bg-[#2B0089] blur-[200px] rotate-[14.57deg] overflow-hidden",
          "absolute top-[60px] left-[-570px]",
          /** 375 */
          "w-[388px] h-[353px]",
          /** 768 */
          "md:",
          /** 1024 */
          "w-[645px] h-[586px]",
          /** 1440 */
          "xl:h-[471px]",
          /** 1440 */
          "2xl:"
        )}
      ></div>
      <div
        className={cn(
          "hidden bg-[#2B0089] blur-[200px] rotate-[14.57deg] overflow-hidden",
          "absolute top-[-57px] right-[-430px]",
          /** 375 */
          "w-[476px] h-[432px]",
          /** 768 */
          "md:",
          /** 1024 */
          "w-[645px] h-[586px]",
          /** 1440 */
          "xl:h-[471px]",
          /** 1440 */
          "2xl:"
        )}
      ></div>
    </div>
  );
  // TODO:添加两边的渐变效果

  // <div
  //   className={cn(
  //     "bg-[rgba(90,37,176,0.9)] blur-[150px] rotate-[6.72deg]",
  //     "absolute top-0 right-[-700px]",
  //     /** 375 */
  //     "",
  //     /** 768 */
  //     "md:",
  //     /** 1024 */
  //     "lg:",
  //     /** 1440 */
  //     "xl:w-[939px] lg:h-full",
  //     /** 1440 */
  //     "2xl:"
  //   )}
  // ></div>
};

export default HeaderBg;
