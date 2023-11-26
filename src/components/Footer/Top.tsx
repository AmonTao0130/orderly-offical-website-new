import LogoIcon from "@icons/LogoIcon";
import React from "react";
import SystemStatus from "./SystemStatus";
import { cn } from "@utils/index";

interface TopProps {
  className?: string;
}

const Top: React.FC<TopProps> = (props) => {
  return (
    <div className={cn("flex justify-between items-center", props.className)}>
      <LogoIcon className="text-white" />
      <SystemStatus isMaintenance={false} />
    </div>
  );
};

export default Top;
