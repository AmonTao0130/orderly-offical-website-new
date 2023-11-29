import React from "react";
import LogoIcon from "@/icons/LogoIcon";
import CollapseIcon from "@/icons/CollapseIcon";
import CloseLargeIcon from "@/icons/CloseLargeIcon";
import LogoTextIcon from "@/icons/LogoTextIcon";
import { cn } from "@/utils";

interface HeaderProps {
  className?: string;
  expanded: boolean;
  toggleExpanded: () => void;
}
const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div className={cn("py-[20px] px-[20px] md:px-[40px]", props.className)}>
      <div className="flex justify-between items-center md:max-w-[688px] m-auto">
        {/* 375时显示 logo */}
        <LogoIcon size={32} className="md:hidden" />
        {/* 768时显示文字 */}
        <LogoTextIcon className="hidden md:inline-block" />
        <div onClick={props.toggleExpanded}>
          {props.expanded ? (
            <CloseLargeIcon />
          ) : (
            <CollapseIcon className="text-white" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
