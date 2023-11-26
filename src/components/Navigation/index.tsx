import React from "react";
import Menu from "./Menu";
import LogoTextIcon from "@icons/LogoTextIcon";
import { cn } from "@utils/index";

interface NavigationProps {
  className?: string;
}
const Navigation: React.FC<NavigationProps> = (props) => {
  return (
    <div
      className={cn(
        "px-[60px] xl:px-[80px] py-[25px] [background:linear-gradient(180deg,#261249_0%,rgba(38,18,73,0)_100%)]",
        props.className
      )}
    >
      <div className="flex justify-between items-center max-w-[1440px] m-auto">
        <LogoTextIcon />
        <Menu />
      </div>
    </div>
  );
};

export default Navigation;
