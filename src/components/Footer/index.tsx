import React from "react";
import Bottom from "./Bottom";
import Top from "./Top";
import Collapse from "./Collapse";
import Content from "./Content";

interface FooterProps {}
const Footer: React.FC<FooterProps> = (props) => {
  return (
    <div>
      <div className="w-[375px]">
        <Top />
        <Collapse />
        <Bottom />
      </div>

      <div className="w-[1024px]">
        <Top />
        <Content />
        <Bottom />
      </div>
    </div>
  );
};

export default Footer;
