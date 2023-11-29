import { cn } from "@/utils";
import React, { type PropsWithChildren } from "react";

const BlockTitle: React.FC<PropsWithChildren> = (props) => {
  return (
    <div
      className={cn(
        "text-center",
        /** 375 */
        "text-2xl leading-[24px]",
        /** 768 */
        "md:text-4xl md:leading-[40px]",
        /** 1024 */
        "lg:text-5xl lg:leading-[56px]"
      )}
    >
      {props.children}
    </div>
  );
};

export default BlockTitle;
