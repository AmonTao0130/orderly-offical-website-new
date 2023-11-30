import React, { useState } from "react";
import Header from "./Header";
import Collapse from "./Collapse";
import { cn } from "@/utils";
import { useStore } from "@nanostores/react";
import { bannerHeight, navigationExpanded } from "@/store";
import type { PropsWithClassName } from "@/types";

const SmallNavigation: React.FC<PropsWithClassName> = (props) => {
  const $bannerHeight = useStore(bannerHeight);
  const expanded = useStore(navigationExpanded);
  const [modalHeight, setModalHeight] = useState<number>();

  const toggleExpanded = () => {
    navigationExpanded.set(!expanded);
    setModalHeight(window.innerHeight - $bannerHeight);
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
    <div className={cn(props.className)}>
      <Header
        expanded={expanded}
        toggleExpanded={toggleExpanded}
        className={cn(expanded && "backdrop-blur-[10px]")}
      />
      {expanded && (
        <div
          style={{ height: modalHeight }}
          className="absolute w-full backdrop-blur-[10px] z-[1]"
        >
          <Collapse className="mt-[57px]" />
        </div>
      )}
    </div>
  );
};

export default SmallNavigation;
