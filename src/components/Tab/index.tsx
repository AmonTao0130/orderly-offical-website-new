import React from "react";
import type { PropsWithClassName } from "@/types";
import { cn } from "@/utils";

export type TabData = {
  title: string;
  key: string;
};

interface TabProps {
  data: TabData[];
  expandKey?: string | number;
  onExpand?: (item: any, index: number) => void;
}

const Tab: React.FC<TabProps & PropsWithClassName> = (props) => {
  return (
    <div
      id="tabItem"
      className={cn(
        "flex overflow-x-auto invisible-scrollbar cursor-pointer select-none",
        props.className
      )}
    >
      {props.data.map((item, index) => {
        const expanded = props.expandKey === item.key;
        return (
          <div
            key={item.key}
            className={cn(
              "flex items-center font-semibold rounded-full whitespace-nowrap",
              expanded ? "text-[#000]" : "text-primary-54",
              expanded ? "bg-[rgba(209,150,255,1)]" : "bg-primary-8",
              /** 375 */
              "h-[32px] text-[13px] leading-[13px] px-[12px] mx-[2px]",
              "md:h-[52px] md:text-base md:leading-[16px] md:px-[24px]"
            )}
            onClick={() => {
              props.onExpand?.(item.key, index);
            }}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
};

export default Tab;
