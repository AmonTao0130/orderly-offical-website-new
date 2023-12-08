import React from "react";
import Menu from "./Menu";
import LogoTextIcon from "@/icons/LogoTextIcon";
import { cn } from "@/utils/index";
import type { PropsWithClassName } from "@/types";

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
        <Menu />
      </div>
    </div>
  );
};

export default LargeNavigation;
