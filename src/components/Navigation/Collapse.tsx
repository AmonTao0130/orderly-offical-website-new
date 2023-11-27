import React, { useState } from "react";
import ExpandIcon from "@/icons/ExpandIconIcon";
import NewLabel from "@/components/common/NewLabel";
import { cn } from "@/utils/index";
import data from "./data";
import ArrowRightTopIcon from "@/icons/ArrowRightTopIcon";
import CarnivalIcon from "@/icons/CarnivalIcon";

interface CollapseProps {
  className?: string;
}

const Collapse: React.FC<CollapseProps> = (props) => {
  const [expandKey, setExpandKey] = useState("");
  return (
    <div className={cn("select-none", props.className)}>
      {data.map((item, index) => {
        const isExpand = expandKey === item.title;
        return (
          <div
            key={item.title}
            className={cn(
              "text-primary-80 text-sm py-[24px] cursor-pointer border-t-[1px] border-t-solid border-t-primary-8",
              data.length === index + 1 &&
                "border-b-[1px] border-b-solid border-b-primary-8"
            )}
            onClick={() => {
              setExpandKey(isExpand ? "" : item.title);
            }}
          >
            <div
              className={cn(
                "flex justify-between items-center px-[24px]",
                isExpand && "text-white"
              )}
            >
              <div className="flex items-center">
                {item.title}
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
            {isExpand && (
              <div className="flex flex-col pl-[20px]">
                {item.children.map((child) => {
                  return (
                    <a
                      key={child.url || child.title}
                      href={child.url}
                      target="_blank"
                      className="flex items-center px-[16px] py-[12px] first:pt-[24px] last:pb-[8px]"
                    >
                      {child.title}
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
