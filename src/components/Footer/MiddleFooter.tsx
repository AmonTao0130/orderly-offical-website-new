import React from "react";
import Bottom from "./Bottom";
import Top from "./Top";
import Content from "./Content";

interface MiddleFooterProps {}
const MiddleFooter: React.FC<MiddleFooterProps> = (props) => {
  return (
    <div className="w-[1024px] px-[40px] pt-[40px] lg:px-[60px] lg:pt-[60px] border-t-[1px] border-t-solid border-t-primary-20">
      <Top />
      <Content className="mt-[60px]" />
      <Bottom className="mt-[48px] lg:mt-[68px]" />
    </div>
  );
};

export default MiddleFooter;
