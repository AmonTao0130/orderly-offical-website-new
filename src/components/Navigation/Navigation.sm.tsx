import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    setModalHeight(window.innerHeight - $bannerHeight);
  }, [$bannerHeight]);

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
      style={{ width: window.innerWidth, height: modalHeight }}
      className={cn(
        "relative bg-[rgba(0,0,0,0.6)] backdrop-blur-[10px] overflow-hidden",
        props.className
      )}
    >
      <Header expanded={open} toggleExpanded={toggleExpanded} />

      <div className="w-full">
        <Collapse className="mt-[57px]" />
      </div>
    </div>
  );
};

export default SmallNavigation;
