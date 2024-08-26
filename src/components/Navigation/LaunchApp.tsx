import React from "react";
import { cn, isDev } from "@/utils";
import type { PropsWithClassName } from "@/types";

const LaunchApp: React.FC<PropsWithClassName> = (props) => {
  return (
    <button
      className={cn(
        "text-sm leading-[14px] lg:text-base lg:leading-[16px] font-semibold z-10",
        "h-[40px] px-[20px] text-primary-100 rounded-full ml-[16px] select-none",
        "bg-[linear-gradient(270.23deg,#48BDFF_0.04%,_#786CFF_47.76%,#BD00FF_99.64%)]",
        "hover:bg-[linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(270.23deg,#48BDFF_0.04%,_#786CFF_47.76%,#BD00FF_99.64%)]",
        props.className
      )}
      onClick={() => {
        const url = isDev(window.location.hostname)
          ? "https://dev-app.orderly.network/staking"
          : "https://app.orderly.network/staking";
        window.open(url, "_self");
      }}
    >
      Launch App
    </button>
  );
};

export default LaunchApp;
