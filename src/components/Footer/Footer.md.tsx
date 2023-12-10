import React from "react";
import Bottom from "./Bottom";
import Top from "./Top";
import Menu from "./Menu";
import { cn } from "@/utils";
import type { PropsWithClassName } from "@/types";

const MiddleFooter: React.FC<PropsWithClassName> = (props) => {
  return (
    <div
      className={cn(
        "pt-[40px] lg:pt-[60px] border-t-[1px] border-t-solid border-t-primary-20",
        props.className
      )}
    >
      <div className="md:max-w-[688px] lg:max-w-[904px] m-auto">
        <Top />
        <Menu className="mt-[60px]" />
      </div>

      <div className="mt-[48px] lg:mt-[68px] border-t-[1px] border-t-solid border-t-primary-20">
        <Bottom className="md:max-w-[688px] lg:max-w-[904px] m-auto" />
      </div>
    </div>
  );
};

export default MiddleFooter;
