import LogoIcon from "@/icons/LogoIcon";
import React from "react";
import SystemStatus from "./SystemStatus";
import { cn } from "@/utils/index";
import type { PropsWithClassName } from "@/types";

const Top: React.FC<PropsWithClassName> = (props) => {
  return (
    <div className={cn("flex justify-between items-center", props.className)}>
      <LogoIcon className="text-white" />
      <SystemStatus isMaintenance={false} />
    </div>
  );
};

export default Top;
