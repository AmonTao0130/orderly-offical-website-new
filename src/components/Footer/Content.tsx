import React from "react";
import data from "./data";

interface ContentProps {}
const Content: React.FC<ContentProps> = (props) => {
  return (
    <div className="flex justify-between">
      {data.map((item) => {
        return (
          <div key={item.title} className="text-sm">
            {item.title}
            <div className="flex flex-col pt-[12px]">
              {item.children.map((child) => {
                return (
                  <a
                    key={child.url}
                    href={child.url}
                    className=" text-primary-54 hover:text-primary-100 py-[12px]"
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

export default Content;
