import React from "react";
import type { PropsWithClassName } from "@/types";
import Bg from "./imgs/header-bg.png";
import { cn } from "@/utils";

const HeaderBg: React.FC<PropsWithClassName> = (props) => {
  return (
    <img
      className={cn(
        "absolute w-full mix-blend-screen object-cover",
        /** 375 */
        "h-[360px]",
        /** 768 */
        "md:h-[400px]"
      )}
      alt="orderly-network-blog-header-background"
      src={Bg.src}
    />
  );
};

export default HeaderBg;
