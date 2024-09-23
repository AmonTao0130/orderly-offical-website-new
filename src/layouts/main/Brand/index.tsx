import React from "react";
import Content from "@/components/Content";

import Arbitrum from "./icons/Arbitrum.png";
import Optimism from "./icons/Optimism.png";
import LayerZero from "./icons/LayerZero.png";
import Ethereum from "./icons/Ethereum.png";
import Polygon from "./icons/Polygon.png";
import Elixir from "./icons/Elixir.png";

import RageTrade from "./icons/RageTrade.png";
import WOOFiPro from "./icons/WOOFiPro.png";
import Base from "./icons/Base.png";
// import Unidex from "./icons/Unidex.png";
import Logx from "./icons/Logx.png";
import Empyreal from "./icons/Empyreal.png";
import Btse from "./icons/Btse.png";
import { cn } from "@/utils";
import type { PropsWithClassName } from "@/types";

const icons = [
  { name: "Arbitrum", src: Arbitrum.src },
  { name: "Optimism", src: Optimism.src },
  { name: "LayerZero", src: LayerZero.src },
  { name: "Ethereum", src: Ethereum.src },
  { name: "Polygon", src: Polygon.src },
  { name: "Base", src: Base.src },
  { name: "RageTrade", src: RageTrade.src },
  { name: "WOOFiPro", src: WOOFiPro.src },
  // { name: "Unidex", src: Unidex.src },
  { name: "Elixir", src: Elixir.src },
  { name: "Logx", src: Logx.src },
  { name: "Empyreal", src: Empyreal.src },
  { name: "Btse", src: Btse.src },
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
