import React from "react";
import Button from "@/components/Button";
import { cn } from "@/utils";
import type { PropsWithClassName } from "@/types";
import { Hyperlink } from "@/utils/constant";

import RaydiumSvg from "./backers/Raydium.svg";
import WOOSvg from "./backers/WOO.svg";
import KronosSvg from "./backers/Kronos.svg";
import WOOFiProSvg from "./backers/WOOFiPro.svg";
import EmpyrealSvg from "./backers/Empyreal.svg";
import BTSESvg from "./backers/BTSE.svg";
import ArbitrumSvg from "./backers/Arbitrum.svg";
import OptimismSvg from "./backers/Optimism.svg";
import LayerZeroSvg from "./backers/LayerZero.svg";
import EthereumSvg from "./backers/Ethereum.svg";
import PolygonSvg from "./backers/Polygon.svg";
import AegisSvg from "./backers/Aegis.svg";

const backers = [
  { name: "Raydium", src: RaydiumSvg.src },
  { name: "WOO", src: WOOSvg.src },
  { name: "Kronos", src: KronosSvg.src },
  { name: "WOOFiPro", src: WOOFiProSvg.src },
  { name: "Empyreal", src: EmpyrealSvg.src },
  { name: "BTSE", src: BTSESvg.src },
  { name: "Arbitrum", src: ArbitrumSvg.src },
  { name: "Optimism", src: OptimismSvg.src },
  { name: "LayerZero", src: LayerZeroSvg.src },
  { name: "Ethereum", src: EthereumSvg.src },
  { name: "Polygon", src: PolygonSvg.src },
  { name: "Aegis", src: AegisSvg.src },
];

const ExploreEcosystem: React.FC<PropsWithClassName> = (props) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center",
        /** 375 */
        "px-5 sm:text-start",
        /** 768 */
        "md:px-10 md:text-start",
        /** 1024 */
        "lg:px-15 lg:text-start",
        /** 1440 */
        "xl:px-20 xl:text-center xl:items-center",
        props.className
      )}
    >
      <div
        className={cn(
          "font-display text-primary",
          /** 375 */
          "text-2xl leading-[32px] sm:text-start",
          /** 768 */
          "md:text-4xl md:leading-[40px] md:text-start",
          /** 1024 */
          "lg:text-5xl lg:leading-[56px] lg:text-start"
        )}
      >
        Explore Orderly's vibrant ecosystem
      </div>
      <div
        className={cn(
          "font-regular  mt-[12px]",
          /** 375 */
          "text-sm leading-[21px] text-start",
          /** 768 */
          "md:text-base md:leading-[24px] md:text-start",
          /** 1024 */
          "lg:text-start",
          /** 1440 */
          "xl:text-center"
        )}
      >
        An expansive ecosystem, featuring CEXs, DEXs, aggregators, wallets, and more, all powered by Orderly's permissionless liquidity layer.
      </div>
      
      <div 
        className={cn(
          "grid gap-x-6 gap-y-6 w-full",
          /** 375 */
          "grid-cols-2 mt-[32px]",
          /** 768 */
          "md:grid-cols-4 md:mt-[40px]",
          /** 1024 */
          "lg:grid-cols-5 lg:mt-[48px]",
          /** 1440 */
          "xl:grid-cols-6",
        )}
      >
        {backers.map((backer) => {
          return (
            <img
              key={backer.name}
              className={cn(
                "h-[80px] object-contain flex items-center justify-center w-full",
              )}
              src={backer.src}
              alt={backer.name}
            />
          );
        })}
      </div>

      <Button
        type="outlined"
        className={cn(
          "self-center relative z-10",
          /** 375 */
          "mt-[32px]",
          /** 768 */
          "md:mt-[40px]",
          /** 1024 */
          "lg:text-sm lg:px-[20px] lg:h-[40px] lg:mt-[48px]",
          /** 1440 */
          "xl:text-base xl:px-[24px] xl:h-[52px]"
        )}
        href={Hyperlink.Main.ViewMore}
      >
        View more
      </Button>
    </div>
  );
};

export default ExploreEcosystem;
