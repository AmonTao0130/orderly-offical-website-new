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
          "md:block md:w-[989px] md:left-[-200px] md:top-[150px]",
          /** 1024 */
          "lg:w-[989px] lg:left-[-400px] lg:top-[50px]",
          /** 1440 */
          "xl:w-[989px] xl:left-[-300px] xl:top-[50px]",
          /** 1920 */
          "2xl:w-[989px] 2xl:left-[0px] 2xl:top-[0px]"
        )}
        src={Body.src}
      />

      <img
        className={cn(
          "absolute",
          /** 375 */
          "w-[375px] lef-[0px] top-[150px]",
          /** 768 */
          "md:hidden"
        )}
        src={Body375.src}
      />
    </>
  );
};

export default BodyGradient;
