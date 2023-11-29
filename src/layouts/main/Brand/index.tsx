import React from "react";
import Content from "@/components/Content";

import Arbitrum from "./icons/Arbitrum.png";
import Optimism from "./icons/Optimism.png";
import LayerZero from "./icons/LayerZero.png";
import Near from "./icons/Near.png";
import Polygon from "./icons/Polygon.png";
import Elixir from "./icons/Elixir.png";

import RageTrade from "./icons/RageTrade.png";
import WOOFiPro from "./icons/WOOFiPro.png";
import Unidex from "./icons/Unidex.png";
import Logx from "./icons/Logx.png";
import Empyreal from "./icons/Empyreal.png";
import Btse from "./icons/Btse.png";
import { cn } from "@/utils";
import type { PropsWithClassName } from "@/types";

const icons = [
  Arbitrum,
  Optimism,
  LayerZero,
  Near,
  Polygon,
  Elixir,
  RageTrade,
  WOOFiPro,
  Unidex,
  Logx,
  Empyreal,
  Btse,
];

const Brand: React.FC<PropsWithClassName> = (props) => {
  return (
    <Content className={props.className}>
      <div className="flex flex-wrap justify-center">
        {icons.map((icon) => {
          return (
            <img
              key={icon.src}
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
            />
          );
        })}
      </div>
    </Content>
  );
};

export default Brand;
