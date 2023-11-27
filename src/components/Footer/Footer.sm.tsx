import React from "react";
import Bottom from "./Bottom";
import Top from "./Top";
import Collapse from "./Collapse";

interface SmallFooterProps {}
const SmallFooter: React.FC<SmallFooterProps> = (props) => {
  return (
    <div className="px-[20px] pt-[20px] border-t-[1px] border-t-solid border-t-primary-20">
      <Top />
      <Collapse className="mt-[20px]" />
      <Bottom />
    </div>
  );
};

export default SmallFooter;
