import React from "react";
import SmallFooter from "./Footer.sm";
import MiddleFooter from "./Footer.md";
import LargeFooter from "./Footer.lg";
import { useSize } from "@/hooks/useSize";
import { Screen } from "@/utils/constant";

interface FooterProps {
  width?: number;
}

const Footer: React.FC<FooterProps> = (props) => {
  const { width } = useSize();

  const w = props.width || width;

  if (w >= Screen.xl) {
    return <LargeFooter />;
  }

  if (w >= Screen.md) {
    return <MiddleFooter />;
  }

  if (w >= Screen.sm) {
    return <SmallFooter />;
  }

  return null;
};

export default Footer;
