import React from "react";
import data from "./data";
import { cn } from "@/utils/index";
import type { PropsWithClassName } from "@/types";

const Menu: React.FC<PropsWithClassName> = (props) => {
  return (
    <div className={cn("flex justify-between", props.className)}>
      {data.map((item) => {
        return (
          <div key={item.title} className="text-sm">
            {item.title}
            <div className="flex flex-col mt-[8px]">
              {item.children.map((child) => {
                return (
                  <a
                    key={child.url || child.title}
                    href={child.url}
                    target={child.target}
                    className="text-primary-54 hover:text-primary-100 my-[8px]"
                  >
                    {child.title}
                  </a>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
