import React from "react";
import type { PropsWithClassName } from "@/types";
import { cn } from "@/utils";

const HeaderText: React.FC<PropsWithClassName> = (props) => {
  return (
    <div className="text-center">
      <h1
        className={cn(
          "text-primary font-display",
          /** 375 */
          "text-[32px] leading-[38.4px] mt-[88px]",
          /** 768 */
          "md:text-4xl md:leading-[48px] md:mt-[73px]",
          /** 1024 */
          "lg:text-6xl lg:leading-[76.8px] lg:mt-[129px]"
        )}
      >
        Explore Orderly’s <br /> Unified Ecosystem
      </h1>
      <div
        className={cn(
          /** 375 */
          "text-sm leading-[21px] text-primary-80 mt-[8px]",
          /** 768 */
          "md:text-base md:leading-[28.8px] md:mt-[12px]",
          /** 1024 */
          "lg:text-xl lg:leading-[36px]"
        )}
      >
        An expansive ecosystem, featuring CEXs,
        <br className="md:hidden" /> DEXs, aggregators, wallets,
        <br className="hidden md:inline lg:hidden" /> and more, <br className="hidden lg:inline" />
        all powered by <br className="md:hidden" />
        Orderly’s permissionless liquidity layer.
      </div>
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
    </div>
  );
};

export default HeaderText;
