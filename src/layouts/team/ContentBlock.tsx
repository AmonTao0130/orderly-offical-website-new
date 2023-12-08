import React, { type PropsWithChildren } from "react";
import { cn } from "@/utils";
import type { PropsWithClassName } from "@/types";

const ContentBlock: React.FC<PropsWithChildren & PropsWithClassName> = (
  props
) => {
  return (
    <div
      className={cn(
        "text-primary-80 font-normal",
        /** 375 */
        "text-base leading-[28.8px] ",
        /** 1024 */
        "lg:text-xl lg:leading-[36px]",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default ContentBlock;
