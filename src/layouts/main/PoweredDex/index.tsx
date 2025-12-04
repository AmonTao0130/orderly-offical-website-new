import React from "react";
import BlockTitle from "@/components/BlockTitle";
import Content from "@/components/Content";
import { cn } from "@/utils";
import type { PropsWithClassName } from "@/types";
import DexCard from "./DexCard";

// Import DEX icons
import ADEN from "./icons/ADEN.svg";
import Raydium from "./icons/Raydium.svg";
import Whatexchange from "./icons/Whatexchange.svg";
import WOOFiPro from "./icons/WOOFiPro.svg";
import VOOI from "./icons/VOOI.svg";
import Quickswap from "./icons/Quickswap.svg";
import Kodiak from "./icons/Kodiak.svg";
import Aegis from "./icons/Aegis.png";

const dexData = [
  { name: "Aden", src: ADEN.src, url: "https://perp.aden.io/" },
  { name: "WOOFi Pro", src: WOOFiPro.src, url: "https://woofi.com" },
  { name: "Raydium", src: Raydium.src, url: "https://perps.raydium.io/perp/PERP_RAY_USDC" },
  { name: "Quickswap", src: Quickswap.src, url: "https://dapp.quickswap.exchange/falkor" },
  { name: "What.Exchange", src: Whatexchange.src, url: "https://trade.what.exchange/perp/PERP_ETH_USDC" },
  { name: "VOOI", src: VOOI.src, url: "https://pro.vooi.io/" },
  { name: "Kodiak", src: Kodiak.src, url: "https://perps.kodiak.finance/" },
  { name: "AEGIS DEX", src: Aegis.src, url: "https://app.aegisdex.io/perp/PERP_ETH_USDC" },
];

const PoweredDex: React.FC<PropsWithClassName> = (props) => {
  return (
    <Content className={props.className}>
      <div 
        className={cn(
          "flex flex-col items-center",
          /** 375 */
          "py-[24px]",
          /** 768 */
          "md:py-[60px]",
          /** 1024 */
          "lg:py-[70px]",
          /** 1440 */
          "xl:py-[80px]"
        )}
      >
        <BlockTitle>Trade Orderly</BlockTitle>
        
        <div 
          className={cn(
            "flex flex-wrap justify-center items-center w-full",
            /** 375 */
            "mt-[24px] gap-[16px]",
            /** 768 */
            "md:mt-[50px] md:gap-[24px]",
            /** 1024 */
            "lg:mt-[60px] lg:gap-[24px]",
            /** 1440 */
            "xl:mt-[60px] xl:gap-[24px]"
          )}
        >
          {dexData.map((dex) => (
            <DexCard
              key={dex.name}
              name={dex.name}
              src={dex.src}
              url={dex.url}
            />
          ))}
        </div>
      </div>
    </Content>
  );
};

export default PoweredDex;
