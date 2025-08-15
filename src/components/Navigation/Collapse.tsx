import React, { useState } from "react";
import ExpandIcon from "@/icons/ExpandIconIcon";
import NewLabel from "@/components/common/NewLabel";
import { cn } from "@/utils/index";
import data from "./data";
import ArrowRightTopIcon from "@/icons/ArrowRightTopIcon";
import CarnivalIcon from "@/icons/CarnivalIcon";
import type { PropsWithClassName } from "@/types";

/** TODO：展开折叠的时候，有可能会误解到下的菜单打开新的页面 */
const Collapse: React.FC<PropsWithClassName> = (props) => {
  const [expandKey, setExpandKey] = useState("");
  return (
    <div
      className={cn(
        "flex flex-col select-none px-[20px] md:px-[40px]",
        props.className
      )}
    >
      {data.map((item, index) => {
        const isExpand = expandKey === item.title;
        return (
          <div
            key={item.title}
            className={cn(
              "text-primary-80 text-sm md:text-base py-[24px] cursor-pointer border-t-[1px] border-t-solid border-t-primary-8",
              data.length === index + 1 &&
                "border-b-[1px] border-b-solid border-b-primary-8"
            )}
          >
            <div
              className={cn(
                "flex justify-between items-center px-[24px]",
                isExpand && "text-white"
              )}
              onClick={() => {
                setExpandKey(isExpand ? "" : item.title);
              }}
            >
              <div className="flex items-center">
                {item.component || item.title}
                {!item.children?.length && (
                  <CarnivalIcon className="ml-[4px]" />
                )}
              </div>
              {item.children?.length && (
                <ExpandIcon
                  className={cn(
                    "transition duration-300",
                    isExpand ? "rotate-180" : "rotate-0"
                  )}
                />
              )}
            </div>
            {isExpand && Array.isArray(item.children) && (
              <div className="flex flex-col pl-[20px]">
                {item.children.map((child) => {
                  return (
                    <a
                      key={child.url || child.title}
                      href={child.url}
                      target={child.target}
                      className="flex items-center px-[16px] py-[12px] first:pt-[24px] last:pb-[8px]"
                    >
                      {child.component || child.title}
                      {child.isNew && <NewLabel className="ml-[4px]" />}
                      {child.showArrow && (
                        <ArrowRightTopIcon size={14} className="ml-[4px]" />
                      )}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Collapse);
