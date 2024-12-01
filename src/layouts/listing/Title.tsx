import { cn } from "@/utils";
import React, { type PropsWithChildren } from "react";

const Title: React.FC<PropsWithChildren<{}>> = (props) => {
  return (
    <div
      className={cn(
        "text-center",
        "text-[20px] md:text-[32px] lg:text-[44px]",
        "mb-[20px] md:mb-[40px]"
      )}
    >
      {props.children}
    </div>
  );
};

export default Title;
