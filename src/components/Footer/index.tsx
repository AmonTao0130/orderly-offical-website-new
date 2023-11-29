import React from "react";
import SmallFooter from "./Footer.sm";
import MiddleFooter from "./Footer.md";
import LargeFooter from "./Footer.lg";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <div className={props.className}>
      <SmallFooter className="md:hidden" />
      <MiddleFooter className="hidden xl:hidden md:block " />
      <LargeFooter className="hidden xl:block" />
    </div>
  );
};

export default Footer;
