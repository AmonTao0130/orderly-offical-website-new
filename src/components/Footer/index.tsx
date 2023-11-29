import React from "react";
import SmallFooter from "./Footer.sm";
import MiddleFooter from "./Footer.md";
import LargeFooter from "./Footer.lg";
import type { PropsWithClassName } from "@/types";

const Footer: React.FC<PropsWithClassName> = (props) => {
  return (
    <div className={props.className}>
      <SmallFooter className="md:hidden" />
      <MiddleFooter className="hidden xl:hidden md:block " />
      <LargeFooter className="hidden xl:block" />
    </div>
  );
};

export default Footer;
