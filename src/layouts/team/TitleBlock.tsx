import React, { type PropsWithChildren } from "react";
import { cn } from "@/utils";
import type { PropsWithClassName } from "@/types";

const TitleBlock: React.FC<PropsWithChildren & PropsWithClassName> = (props) => {
  return (
    <h2
      className={cn(
        "font-display font-semibold text-primary text-center",
        /** 375 */
        "text-2xl leading-[28.8px]",
        /** 768 */
        "md:text-[32px] leading-[38.4px]",
        /** 1024 */
        "lg:text-4xl lg:leading-[57.6px]",
        props.className
      )}
    >
      {props.children}
    </h2>
  );
};

export default TitleBlock;
