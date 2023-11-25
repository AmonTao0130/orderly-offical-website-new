import React, { useState } from "react";
import { data } from "./data";
import ArrowDownIcon from "@icons/ArrowDownIcon";
import { cn } from "@utils/index";
import NewIcon from "@icons/NewIcon";

interface CollapseProps {
  className?: string;
}

/** 手机端底部导航  */
const Collapse: React.FC<CollapseProps> = (props) => {
  const [expandKey, setExpandKey] = useState("");
  console.log("expandKey", expandKey);
  return (
    <div className={cn("select-none", props.className)}>
      {data.map((item, index) => {
        const isExpand = expandKey === item.title;
        return (
          <div
            key={item.title}
            className={cn(
              "text-primary-80 text-sm py-[16px] cursor-pointer border-t-[1px] border-t-solid border-t-primary-8"
            )}
          >
            <div
              className={cn(
                "flex justify-between items-center",
                isExpand && "text-white"
              )}
              onClick={() => {
                setExpandKey(isExpand ? "" : item.title);
              }}
            >
              {item.title}
              <ArrowDownIcon
                className={cn(
                  "transition",
                  isExpand ? "rotate-180" : "rotate-0"
                )}
              />
            </div>
            {isExpand && (
              <div className="flex flex-col pl-[20px]">
                {item.children.map((child) => {
                  return (
                    <a
                      key={child.url}
                      href={child.url}
                      target="_blank"
                      className="flex items-center py-[12px] first:pt-[24px] last:pb-[8px]"
                    >
                      {child.title}
                      {child.isNew && <NewIcon className="pl-[4px]" />}
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
