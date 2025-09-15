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
import Coin98 from "./icons/Coin98.svg";
import PerpsDAO from "./icons/PerpsDAO.svg";
import VOOI from "./icons/VOOI.svg";
import Quickswap from "./icons/Quickswap.svg";

const dexData = [
  { name: "Aden", src: ADEN.src, url: "https://aden.io/perp/PERP_BTC_USDC" },
  { name: "WOOFi Pro", src: WOOFiPro.src, url: "https://woofi.com" },
  { name: "Raydium", src: Raydium.src, url: "https://perps.raydium.io/perp/PERP_RAY_USDC" },
  { name: "Quickswap", src: Quickswap.src, url: "https://dapp.quickswap.exchange/falkor" },
  { name: "What.Exchange", src: Whatexchange.src, url: "https://trade.what.exchange/perp/PERP_ETH_USDC" },
  { name: "VOOI", src: VOOI.src, url: "https://pro.vooi.io/" },
  { name: "Kyrrio", src: Kyrrio.src, url: "https://dex.kyrr.io/perp/PERP_BTC_USDC" },
  { name: "PerpsDAO", src: PerpsDAO.src, url: " https://trade.perpsdao.xyz/en/perp/PERP_ETH_USDC" },
  { name: "Coin98", src: Coin98.src, url: "https://coin98.com/" },
  // { name: "Saros", src: Saros.src, url: "https://perps.saros.xyz/trade/PERP_SOL_USDC" },
  // { name: "Jojo", src: JOJO.src, url: "https://app.jojo.exchange/trade/base/BTC-USDC" },
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
