import React, { useState } from "react";
import Header from "./Header";
import Collapse from "./Collapse";
import { cn } from "@/utils";
import { useStore } from "@nanostores/react";
import { bannerHeight, navigationOpen } from "@/store";
import type { PropsWithClassName } from "@/types";

const SmallNavigation: React.FC<PropsWithClassName> = (props) => {
  const $bannerHeight = useStore(bannerHeight);
  const open = useStore(navigationOpen);
  const [modalHeight, setModalHeight] = useState<number>();

  const toggleExpanded = () => {
    navigationOpen.set(!open);
    setModalHeight(window.innerHeight - $bannerHeight);
  };

  if (!open) {
    return (
      <Header
        expanded={open}
        toggleExpanded={toggleExpanded}
        className={props.className}
      />
    );
  }

  return (
    <div
      className={cn(props.className)}
      onTouchMove={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Header
        expanded={open}
        toggleExpanded={toggleExpanded}
        className={cn(open && "backdrop-blur-[10px]")}
      />
      {open && (
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
