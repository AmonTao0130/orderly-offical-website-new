import React from "react";
import type { PropsWithClassName } from "@/types";
import { cn } from "@/utils";
import Bg from "./imgs/header-bg.png";
import Content from "@/components/Content";

const Header: React.FC<PropsWithClassName> = (props) => {
  return (
    <div className="relative">
      <img
        className={cn(
          "absolute w-full bottom-0 left-0 mix-blend-screen object-cover",
          /** 375 */
          "h-[157px]",
          /** 768 */
          "md:h-[249px]",
          /** 1024 */
          "lg:h-[291px]",
          /** 1440 */
          "xl:h-[395px]",
          /** 1920 */
          "2xl:h-[446px]"
        )}
        src={Bg.src}
        alt="orderly-network-team-header-background"
      />
      <Content
        className={cn(
          "flex flex-col items-center",
          "text-primary text-center",
          /** 375 */
          "pb-[125px]",
          /** 768 */
          "md:pb-[233px]",
          /** 1024 */
          "lg:pb-[315px]",
          /** 1440 */
          "xl:pb-[353px]",
          /** 1920 */
          "2xl:pb-[379px]"
        )}
      >
        <div
          className={cn(
            /** 375 */
            "text-base leading-[19.2px] font-display tracking-[0.2em] mt-[46px]",
            /** 768 */
            "md:text-xl md:leading-[24px] md:mt-[73px]",
            /** 1024 */
            "lg:mt-[126px]",
            /** 1440 */
            "xl"
          )}
        >
          OUR MISSION
        </div>
        <h1
          className={cn(
            /** 375 */
            "w-[310px] text-[32px] leading-[38.4px] font-display font-semibold mt-[8px]",
            /** 768 */
            "md:w-[546px] md:text-4xl md:leading-[48px] md:mt-[12px]",
            /** 1024 */
            "lg:w-[860px] lg:text-[48px] lg:leading-[57.6px] lg:mt-[8px]",
            /** 1440 */
            "xl:w-[1000px] xl:text-5xl xl:leading-[67.2px]"
          )}
        >
          Institutional-Grade Infrastructure with Shared Liquidity for CeFi & DeFi
        </h1>
        <div
          className={cn(
            /** 375 */
            "w-[332px] text-sm leading-[25.2px] mt-[8px]",
            /** 768 */
            "md:w-[610px] md:text-base md:leading-[28.8px] md:mt-[12px]",
            /** 1024 */
            "lg:w-[825px] lg:text-xl lg:leading-[36px] lg:mt-[12px]"
          )}
        >
          We empower Web3 teams with comprehensive dApp tools and liquidity needed to rapidly deploy sophisticated
          omnichain trading apps. Our infrastructure provides a unified trading order book connected to every leading
          blockchain.
        </div>
      </Content>
    </div>
  );
};

export default Header;
