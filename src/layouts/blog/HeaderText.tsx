import React from "react";
import type { PropsWithClassName } from "@/types";
import Content from "@/components/Content";
import { cn } from "@/utils";

const HeaderText: React.FC<PropsWithClassName> = (props) => {
  return (
    <Content>
      <div className="text-center">
        <h1
          className={cn(
            /** 375 */
            "font-display font-semibold text-[32px] leading-[32.64px] mt-[88px]",
            /** 768 */
            "md:text-[40px] md:leading-[40.8px] md:mt-[99px]",
            /** 1024 */
            "lg:text-6xl lg:leading-[65.28px] lg:mt-[71px]",
            /** 1440 */
            "xl:",
            /** 1440 */
            "2xl:"
          )}
        >
          Orderly Network Blog
        </h1>
        <div
          className={cn(
            /** 375 */
            "text-sm leading-[21px] mt-[8px]",
            /** 768 */
            "md:text-base md:leading-[24px]",
            /** 1024 */
            "lg:text-xl lg:leading-[30px]",
            /** 1440 */
            "xl:",
            /** 1440 */
            "2xl:"
          )}
        ></div>
        Learn about Orderly’s technology, research,
        <br className="hidden md:inline lg:hidden" /> and
        <br className="md:hidden" /> latest developments.
      </div>
    </Content>
  );
};

export default HeaderText;
