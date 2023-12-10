import React from "react";
import WhyChooseOrderly from "../imgs/gradient/WhyChooseOrderly.svg";
import { cn } from "@/utils";

const WhyChooseOrderlyGradient: React.FC = (props) => {
  return (
    <>
      <img
        className={cn(
          "absolute",
          /** 375 */
          "w-[400px] left-[-180px] top-[-200px]",
          /** 768 */
          "md:w-[500px] md:left-[-150px] md:top-[-250px]",
          /** 1024 */
          "lg:w-[700px] lg:left-[-100px] lg:top-[-200px]",
          /** 1440 */
          "xl:w-[833px] xl:left-[-0px] xl:top-[-250px]",
          /** 1920 */
          "2xl:w-[833px] 2xl:left-[-0px] 2xl:top-[-250px]"
        )}
        src={WhyChooseOrderly.src}
      />
    </>
  );
};

export default WhyChooseOrderlyGradient;
