import React from "react";
import Bottom from "./Bottom";
import Top from "./Top";
import SystemStatus from "./SystemStatus";

interface FooterProps {}
const Footer: React.FC<FooterProps> = (props) => {
  return (
    <>
      <Top />
      <Bottom />
    </>
  );
};

export default Footer;
