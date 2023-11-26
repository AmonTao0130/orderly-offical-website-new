import React from "react";
import Bottom from "./Bottom";
import Top from "./Top";
import Content from "./Content";

interface LargeFooterProps {}
const LargeFooter: React.FC<LargeFooterProps> = (props) => {
  return (
    <div className="pt-[60px] mx-auto border-t-[1px] border-t-solid border-t-primary-20">
      <div className="flex">
        <Top className="flex-col items-start " />
        <Content className="w-[950px] ml-[131px]" />
      </div>

      <Bottom className="w-[1280px] mt-[68px]" />
    </div>
  );
};

export default LargeFooter;
