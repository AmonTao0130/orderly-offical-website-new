import React from "react";
import SmallNavigation from "./Navigation.sm";
import LargeNavigation from "./Navigation.lg";
import type { PropsWithClassName } from "@/types";

const Navigation: React.FC<PropsWithClassName> = (props) => {
  return (
    <div className={props.className}>
      <SmallNavigation className="lg:hidden" />
      <LargeNavigation className="hidden lg:block" />
    </div>
  );
};

export default Navigation;
