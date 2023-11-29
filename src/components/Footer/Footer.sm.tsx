import React from "react";
import Bottom from "./Bottom";
import Top from "./Top";
import Collapse from "./Collapse";
import { cn } from "@/utils";
import type { PropsWithClassName } from "@/types";

const SmallFooter: React.FC<PropsWithClassName> = (props) => {
  return (
    <div
      className={cn(
        "px-[20px] pt-[20px] border-t-[1px] border-t-solid border-t-primary-20",
        props.className
      )}
    >
      <Top />
      <Collapse className="mt-[20px]" />
      <Bottom />
    </div>
  );
};

export default SmallFooter;
