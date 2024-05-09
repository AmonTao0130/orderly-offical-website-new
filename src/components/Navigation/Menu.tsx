import React from "react";
import data from "./data";
import ArrowDownIcon from "@/icons/ArrowDownIcon";
import CarnivalIcon from "@/icons/CarnivalIcon";
import NewLabel from "@/components/common/NewLabel";
import ArrowRightTopIcon from "@/icons/ArrowRightTopIcon";
import { cn } from "@/utils";

interface MenuProps {}
const Menu: React.FC<MenuProps> = (props) => {
  return (
    // 这里使用mr-[-100px]抵销下面pr-[100px]的偏移量
    <div className="flex mr-[-100px]">
      {data.map((item) => {
        return (
          // hover 子项的菜单不会超出父容器的宽度，这里通过pr-[100px]使每个元素的宽度增加 100px
          <div
            key={item.title}
            className="relative pr-[100px] ml-[-68px] xl:ml-[-52px] cursor-pointer select-none text-primary-80"
          >
            <div className="group">
              <div className="flex items-center group-hover:text-primary-100 text-lg">
                {item.showHot && <CarnivalIcon className="mr-[4px]" />}
                {item.title}
                {item.children?.length && (
                  <ArrowDownIcon className="ml-[2px] transition duration-300  group-hover:rotate-180" />
                )}
              </div>

              <div
                className={cn(
                  "absolute top-[20px] z-[1] overflow-hidden",
                  "transition-[max-height] duration-300",
                  "max-h-0 group-hover:max-h-[178px]",
                  item.showHot ? "left-[-4px]" : "left-[-20px] "
                )}
              >
                <div className="mt-[16px] rounded-[12px] [background:linear-gradient(180deg,rgba(38,18,73,0.3)_0%,rgba(111,69,184,0.3)_100%)] border-[1px] border-solid border-[rgba(206,125,255,0.5)] backdrop-blur-[15px]">
                  {item.children.map((child) => {
                    return (
                      <a
                        key={child.url || child.title}
                        href={child.url}
                        target={child.target}
                        className="flex items-center text-base hover:text-primary-100 px-[20px] my-[24px] first:mt-[20px] last:mb-[20px]"
                      >
                        {/* {child.title} */}
                        <div
                          className={cn(
                            item.title === "Ecosystem" && "pr-[40px]"
                          )}
                        >
                          {child.title}
                        </div>
                        {child.isNew && <NewLabel className="ml-[4px]" />}
                        {child.showArrow && (
                          <ArrowRightTopIcon size={14} className="ml-[4px]" />
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
