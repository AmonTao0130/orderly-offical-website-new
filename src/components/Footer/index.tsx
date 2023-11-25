import React from "react";
import Bottom from "./Bottom";
import Top from "./Top";
import SystemStatus from "./SystemStatus";
import Collapse from "./Collapse";

interface FooterProps {}
const Footer: React.FC<FooterProps> = (props) => {
  return (
    <div className="w-[375px]">
      <Top />
      <Collapse />
      <Bottom />
    </div>
  );
};

export default Footer;
