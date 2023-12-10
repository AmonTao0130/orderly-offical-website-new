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
        "pt-[20px] border-t-[1px] border-t-solid border-t-primary-20",
        props.className
      )}
    >
      <div className="px-[20px]">
        <Top />
        <Collapse className="mt-[20px]" />
      </div>

      <div className="border-t-[1px] border-t-solid border-t-primary-20">
        <Bottom className="px-[20px]" />
      </div>
    </div>
  );
};

export default SmallFooter;
