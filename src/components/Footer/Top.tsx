import LogoIcon from "@icons/LogoIcon";
import React from "react";
import SystemStatus from "./SystemStatus";

interface TopProps {}
const Top: React.FC<TopProps> = (props) => {
  return (
    <div className="flex justify-between items-center">
      <LogoIcon className="text-white" />
      <SystemStatus isMaintenance={false} />
    </div>
  );
};

export default Top;
