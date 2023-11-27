import React from "react";
import LogoIcon from "@/icons/LogoIcon";
import CollapseIcon from "@/icons/CollapseIcon";
import CloseLargeIcon from "@/icons/CloseLargeIcon";
import LogoTextIcon from "@/icons/LogoTextIcon";

interface HeaderProps {
  expanded: boolean;
  toggleExpanded: () => void;
}
const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div className="flex justify-between items-center py-[20px]">
      {/* 375时显示 logo */}
      <LogoIcon size={32} className="md:hidden" />
      {/* 768时显示文字 */}
      <LogoTextIcon className="invisible md:visible" />
      <div onClick={props.toggleExpanded}>
        {props.expanded ? (
          <CloseLargeIcon />
        ) : (
          <CollapseIcon className="text-white" />
        )}
      </div>
    </div>
  );
};

export default Header;
