import React from "react";
import data from "./data";
import ArrowDownIcon from "@icons/ArrowDownIcon";
import CarnivalIcon from "@icons/CarnivalIcon";
import NewIcon from "@icons/NewIcon";
import ArrowRightTopIcon from "@icons/ArrowRightTopIcon";

interface MenuProps {}
const Menu: React.FC<MenuProps> = (props) => {
  return (
    // 这里使用mr-[-100px]抵销下面pr-[100px]的偏移量
    <div className="flex mr-[-100px]">
      {data.map((item) => {
        return (
          // hover 子项的菜单不会超出父容器的宽度，这里通过pr-[100px]使每个元素的宽度增加 100px
          <div className="relative pr-[100px] ml-[-68px] xl:ml-[-52px] cursor-pointer select-none text-primary-80">
            <div className="group">
              <div className="flex items-center group-hover:text-primary-100 text-lg">
                {item.title}
                {item.children?.length && (
                  <ArrowDownIcon className="ml-[2px] transition duration-300  group-hover:rotate-180" />
                )}
                {!item.children?.length && (
                  <CarnivalIcon className="ml-[4px]" />
                )}
              </div>

              <div className="hidden hover:block group-hover:block absolute top-[20px] left-[-20px] z-[1]">
                <div className="mt-[16px] rounded-[12px] [background:linear-gradient(180deg,rgba(38,18,73,0.3)_0%,rgba(111,69,184,0.3)_100%)]">
                  {item.children?.map((child) => {
                    return (
                      <a
                        key={child.url}
                        href={child.url}
                        target="_blank"
                        className="flex items-center text-base hover:text-primary-100 px-[20px] my-[12px] first:pt-[10px] last:pb-[10px]"
                      >
                        {child.title}
                        {child.isNew && <NewIcon className="ml-[4px]" />}
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
