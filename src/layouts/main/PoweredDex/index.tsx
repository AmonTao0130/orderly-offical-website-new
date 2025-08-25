import React from "react";
import BlockTitle from "@/components/BlockTitle";
import Content from "@/components/Content";
import { cn } from "@/utils";
import type { PropsWithClassName } from "@/types";
import DexCard from "./DexCard";

// Import DEX icons
import ADEN from "./icons/ADEN.svg";
import JOJO from "./icons/JOJO.svg";
import Kyrrio from "./icons/Kyrrio.svg";
import Raydium from "./icons/Raydium.svg";
import Saros from "./icons/Saros.svg";
import Whatexchange from "./icons/Whatexchange.svg";
import WOOFiPro from "./icons/WOOFiPro.svg";

const dexData = [
  { name: "Aden", src: ADEN.src, url: "https://aden.io/perp/PERP_BTC_USDC" },
  { name: "WOOFi Pro", src: WOOFiPro.src, url: "https://woofi.com" },
  { name: "Raydium", src: Raydium.src, url: "https://perps.raydium.io/perp/PERP_RAY_USDC" },
  { name: "What.Exchange", src: Whatexchange.src, url: "https://trade.what.exchange/perp/PERP_ETH_USDC" },
  { name: "Kyrrio", src: Kyrrio.src, url: "https://dex.kyrr.io/perp/PERP_BTC_USDC" },
  { name: "Saros", src: Saros.src, url: "https://perps.saros.xyz/trade/PERP_SOL_USDC" },
  { name: "Jojo", src: JOJO.src, url: "https://app.jojo.exchange/trade/base/BTC-USDC" },
];

const PoweredDex: React.FC<PropsWithClassName> = (props) => {
  return (
    <Content className={props.className}>
      <div 
        className={cn(
          "flex flex-col items-center",
          /** Figma specs: height 504px, padding 80px */
          "min-h-[504px] py-[80px]",
          /** Responsive adjustments for smaller screens */
          /** 375 */
          "py-[40px]",
          /** 768 */
          "md:py-[60px]",
          /** 1024 */
          "lg:py-[70px]",
          /** 1440 */
          "xl:py-[80px] xl:min-h-[504px]"
        )}
      >
        <BlockTitle>Trade on Orderly powered DEX</BlockTitle>
        
        <div 
          className={cn(
            "flex flex-wrap justify-center items-center w-full",
            /** Figma specs: 40px gap between items */
            /** 375 */
            "mt-[40px] gap-[20px]",
            /** 768 */
            "md:mt-[50px] md:gap-[30px]",
            /** 1024 */
            "lg:mt-[60px] lg:gap-[35px]",
            /** 1440 - Updated to 24px gap to fit 4 cards of 300px width */
            "xl:gap-[24px] xl:mt-[60px]"
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
