import React from "react";
import Menu from "./Menu";
import LogoTextIcon from "@/icons/LogoTextIcon";
import { cn } from "@/utils/index";
import type { PropsWithClassName } from "@/types";
import LaunchApp from "./LaunchApp";

const LargeNavigation: React.FC<PropsWithClassName> = (props) => {
  return (
    <div
      className={cn(
        "px-[60px] xl:px-[80px] [background:linear-gradient(180deg,#261249_0%,rgba(38,18,73,0)_100%)]",
        props.className
      )}
    >
      <div className="flex justify-between items-center h-[100px] lg:max-w-[904px] xl:max-w-[1280px] m-auto">
        <a href="/">
          <LogoTextIcon />
        </a>
        <div className="flex items-center">
          <Menu />
          {/* <LaunchApp className="ml-[32px]" /> */}
        </div>
      </div>
    </div>
  );
};

export default LargeNavigation;
