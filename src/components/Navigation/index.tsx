import React from "react";
import SmallNavigation from "./Navigation.sm";
import LargeNavigation from "./Navigation.lg";

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = (props) => {
  return (
    <div className={props.className}>
      <SmallNavigation className="lg:hidden" />
      <LargeNavigation className="hidden lg:block" />
    </div>
  );
};

export default Navigation;
