import React, { useState } from "react";
import ExpandIcon from "@/icons/ExpandIconIcon";
import NewLabel from "@/components/common/NewLabel";
import { cn } from "@/utils/index";
import data from "./data";
import type { PropsWithClassName } from "@/types";

/** 手机端底部导航  */
const Collapse: React.FC<PropsWithClassName> = (props) => {
  const [expandKey, setExpandKey] = useState("");
  return (
    <div className={cn("select-none", props.className)}>
      {data.map((item) => {
        const isExpand = expandKey === item.title;
        return (
          <div
            key={item.title}
            className={cn(
              "text-primary-80 text-sm py-[24px] cursor-pointer border-t-[1px] border-t-solid border-t-primary-8"
            )}
            onClick={() => {
              setExpandKey(isExpand ? "" : item.title);
            }}
          >
            <div
              className={cn(
                "flex justify-between items-center",
                isExpand && "text-white"
              )}
            >
              {item.title}
              <ExpandIcon
                className={cn(
                  "transition duration-300",
                  isExpand ? "rotate-180" : "rotate-0"
                )}
              />
            </div>
            {isExpand && (
              <div className="flex flex-col pl-[20px]">
                {item.children.map((child) => {
                  return (
                    <a
                      key={child.url || child.title}
                      href={child.url}
                      target="_blank"
                      className="flex items-center py-[12px] first:pt-[24px] last:pb-[8px]"
                    >
                      {child.title}
                      {child.isNew && <NewLabel className="ml-[4px]" />}
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
