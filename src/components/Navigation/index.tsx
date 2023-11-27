import React from "react";
import SmallNavigation from "./Navigation.sm";
import LargeNavigation from "./Navigation.lg";
import { useSize } from "@/hooks/useSize";
import { Screen } from "@utils/constant";

interface NavigationProps {
  width?: number;
}

const Navigation: React.FC<NavigationProps> = (props) => {
  const { width } = useSize();

  const w = props.width || width;

  if (w >= Screen.xl) {
    return <LargeNavigation />;
  }

  if (w >= Screen.sm) {
    return <SmallNavigation />;
  }

  return null;
};

export default Navigation;
