import React from "react";
import Bottom from "./Bottom";
import Top from "./Top";
import Menu from "./Menu";
import { cn } from "@/utils";

interface LargeFooterProps {
  className?: string;
}

const LargeFooter: React.FC<LargeFooterProps> = (props) => {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col  pt-[60px] mx-auto border-t-[1px] border-t-solid border-t-primary-20",
        props.className
      )}
    >
      <div className="flex justify-between max-w-[1280px] w-full mx-auto">
        <Top className="flex-col items-start py-[10px]" />
        <Menu className="w-[950px]" />
      </div>

      <Bottom className="max-w-[1280px] w-full mt-[68px] mx-auto" />
    </div>
  );
};

export default LargeFooter;
