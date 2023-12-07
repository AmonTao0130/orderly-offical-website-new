import React from "react";
import type { PropsWithClassName } from "@/types";
import { cn } from "@/utils";

const HeaderText: React.FC<PropsWithClassName> = (props) => {
  return (
    <div
      className={cn(
        /** 375 */
        "",
        /** 768 */
        "md",
        /** 1024 */
        "lg",
        /** 1440 */
        "xl"
      )}
    ></div>
  );
};

export default HeaderText;
