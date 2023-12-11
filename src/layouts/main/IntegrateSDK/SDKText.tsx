import React from "react";
import type { PropsWithClassName } from "@/types";
import { cn } from "@/utils";

interface SDKTextProps {
  order: "first" | "second";
  id?: string;
  title: React.ReactElement;
  content: React.ReactElement;
}

const SDKText: React.FC<SDKTextProps & PropsWithClassName> = (props) => {
  return (
    <div id={props.id} className={cn("mx-auto", props.className)}>
      <div
        className={cn(
          /** 375 */
          "text-primary text-xl leading-[24px] mt-[61px]",
          /** 768 */
          "md:mt-[15px]",
          /** 1024 */
          "lg:text-[26px] lg:leading-[34px] lg:mt-[27px]",
          /** 1440 */
          "xl:text-4xl xl:leading-[56px] xl:mt-[40px]"
        )}
      >
        {props.title}
      </div>
      <div
        className={cn(
          "text-primary-80 mt-[12px]",
          /** 375 */
          "text-sm leading-[21px]",
          /** 768 */
          "md:w-[300px] md:text-base md:leading-[24px]",
          /** 1024 */
          "lg:w-[365px] lg:text-xl lg:leading-[30px]",
          /** 1440 */
          "xl:w-[534px]"
        )}
      >
        {props.content}
      </div>
    </div>
  );
};

export default SDKText;
