import React, { type PropsWithChildren } from "react";
import { cn } from "@/utils";

type BlockProps = PropsWithChildren<{ className?: string }>;

const Block: React.FC<BlockProps> = (props) => {
  return (
    <div
      className={cn(
        "rounded-[20px]",
        "border border-primary-20",
        "[background:linear-gradient(341.71deg,rgba(255,255,255,0.08)_3.76%,rgba(255,255,255,0)_53.22%)]",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default Block;
