import React from "react";
import Header from "./Header";
import Collapse from "./Collapse";
import { cn } from "@/utils";
import { useStore } from "@nanostores/react";
import { bannerHeight, navigationExpanded } from "@/store";
import type { PropsWithClassName } from "@/types";

const SmallNavigation: React.FC<PropsWithClassName> = (props) => {
  const height = useStore(bannerHeight);
  const expanded = useStore(navigationExpanded);

  const toggleExpanded = () => {
    navigationExpanded.set(!expanded);
  };

  if (!expanded) {
    return (
      <Header
        expanded={expanded}
        toggleExpanded={toggleExpanded}
        className={props.className}
      />
    );
  }

  return (
    <div
      style={{ top: height }}
      className={cn(
        "absolute w-full h-full z-[1] backdrop-blur-[10px]",
        props.className
      )}
    >
      <Header expanded={expanded} toggleExpanded={toggleExpanded} />
      {expanded && <Collapse className="mt-[57px]" />}
    </div>
  );
};

export default SmallNavigation;
