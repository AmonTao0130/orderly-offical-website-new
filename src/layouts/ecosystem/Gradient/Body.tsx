import React from "react";
import Body from "./imgs/Body.svg";
import Body375 from "./imgs/Body375.svg";
import { cn } from "@/utils";

const BodyGradient: React.FC = (props) => {
  return (
    <>
      <img
        className={cn(
          "absolute",
          /** 375 */
          "hidden",
          /** 768 */
          "md:block md:w-[823px] md:left-[-100px] md:top-[-500px]",
          /** 1024 */
          "lg:w-[823px] lg:left-[-100px] lg:top-[-500px]",
          /** 1440 */
          "xl:w-[823px] xl:left-[-100px] xl:top-[-500px]",
          /** 1920 */
          "2xl:w-[823px] 2xl:left-[-100px] 2xl:top-[-500px]"
        )}
        src={Body.src}
      />

      <img
        className={cn(
          "absolute",
          /** 375 */
          "w-[523px] lef-[0px] top-[-300px]",
          /** 768 */
          "md:hidden"
        )}
        src={Body375.src}
      />
    </>
  );
};

export default BodyGradient;
