import React from "react";
import LogoIcon from "@/icons/LogoIcon";
import CollapseIcon from "@/icons/CollapseIcon";
import CloseLargeIcon from "@/icons/CloseLargeIcon";
import LogoTextIcon from "@/icons/LogoTextIcon";
import { cn } from "@/utils";
import type { PropsWithClassName } from "@/types";
import LaunchApp from "./LaunchApp";

interface HeaderProps {
  expanded: boolean;
  toggleExpanded: () => void;
}
const Header: React.FC<HeaderProps & PropsWithClassName> = (props) => {
  return (
    <div className={cn("py-[20px] px-[20px] md:px-[40px]", props.className)}>
      <div className="flex justify-between items-center md:max-w-[688px] m-auto">
        {/* 375时显示 logo */}
        <a href="/" className="md:hidden">
          <LogoIcon size={32} />
        </a>
        {/* 768时显示文字图标 */}
        <a href="/" className="hidden md:inline-block">
          <LogoTextIcon />
        </a>

        <div className="flex items-center">
          {/* <LaunchApp className="mr-[16px]" /> */}
          <div onClick={props.toggleExpanded}>
            {props.expanded ? (
              <CloseLargeIcon />
            ) : (
              <CollapseIcon className="text-white" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
