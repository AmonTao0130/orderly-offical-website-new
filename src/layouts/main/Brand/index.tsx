import React from "react";
import Content from "@/components/Content";
import { cn } from "@/utils";
import type { PropsWithClassName } from "@/types";
import Arbitrum from "./icons/Arbitrum.png";
import Optimism from "./icons/Optimism.png";
import LayerZero from "./icons/LayerZero.png";
import Ethereum from "./icons/Ethereum.png";
import Solana from "./icons/Solana.png";
import Polygon from "./icons/Polygon.png";
import Elixir from "./icons/Elixir.png";
import Kyrr from "./icons/kyrr.png";
// import RageTrade from "./icons/RageTrade.png";
import WOOFiPro from "./icons/WOOFiPro.png";
import Base from "./icons/Base.png";
// import Unidex from "./icons/Unidex.png";
import Logx from "./icons/Logx.png";
// import Empyreal from "./icons/Empyreal.png";
// import Btse from "./icons/Btse.png";
import QuickSwap from "./icons/QuickSwap.png";
import Sei from "./icons/Sei.png";

const icons = [
  { name: "Arbitrum", src: Arbitrum.src },
  { name: "Optimism", src: Optimism.src },
  { name: "LayerZero", src: LayerZero.src },
  { name: "Ethereum", src: Ethereum.src },
  { name: "Solana", src: Solana.src },
  { name: "Polygon", src: Polygon.src },
  { name: "WOOFiPro", src: WOOFiPro.src },
  { name: "Elixir", src: Elixir.src },
  { name: "QuickSwap", src: QuickSwap.src },
  { name: "Logx", src: Logx.src },
  { name: "Kyrr", src: Kyrr.src },
  { name: "Base", src: Base.src },
];

const Brand: React.FC<PropsWithClassName> = (props) => {
  return (
    <Content className={props.className}>
      <div className="flex flex-wrap justify-center">
        {icons.map((icon) => {
          return (
            <img
              key={icon.name}
              className={cn(
                /** 375 */
                "w-[113px] mt-[16px]",
                /** 768 */
                "md:w-[172px]",
                /** 1024 */
                "lg:w-[150px] lg:mt-[20px]",
                /** 1024 */
                "xl:w-[213px] xl:mt-[19px]"
              )}
              src={icon.src}
              alt={icon.name}
            />
          );
        })}
      </div>
    </Content>
  );
};

export default Brand;
