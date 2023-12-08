import React from "react";
import type { PropsWithClassName } from "@/types";
import { cn } from "@/utils";
import Pantera from "./investors/Pantera.png";
import DragonflyCapital from "./investors/DragonflyCapital.png";
import SequoiaCapital from "./investors/SequoiaCapital.png";
import Kronos from "./investors/Kronos.png";
import Raydium from "./investors/Raydium.png";
import GSR from "./investors/GSR.png";
import CryptocomCapital from "./investors/CryptocomCapital.png";
import Amber from "./investors/Amber.png";
import AGBuild from "./investors/AGBuild.png";
import jump from "./investors/jump.png";
import CoboVentures from "./investors/CoboVentures.png";
import GateVentures from "./investors/GateVentures.png";
import Primitive from "./investors/Primitive.png";
import Mirana from "./investors/Mirana.png";
import SevenX from "./investors/SevenX.png";
import PuzzleVentures from "./investors/PuzzleVentures.png";
import Metaweb from "./investors/Metaweb.png";
import IOSG from "./investors/IOSG.png";
import WOO from "./investors/WOO.png";
import Subzero from "./investors/Subzero.png";
import DIVentures from "./investors/DIVentures.png";
import Newman from "./investors/Newman.png";
import LaserDigital from "./investors/LaserDigital.png";
import CoinDCX from "./investors/CoinDCX.png";
import TitleBlock from "./TitleBlock";
import Content from "@/components/Content";

const data = [
  Pantera,
  GSR,
  LaserDigital,
  DragonflyCapital,
  jump,
  CryptocomCapital,
  SequoiaCapital,
  Primitive,
  Metaweb,
  SevenX,
  CoinDCX,
  Kronos,
  Raydium,
  Amber,
  AGBuild,
  CoboVentures,
  GateVentures,
  Mirana,
  PuzzleVentures,
  IOSG,
  WOO,
  Subzero,
  DIVentures,
  Newman,
];

const Investors: React.FC<PropsWithClassName> = (props) => {
  return (
    <Content
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
    >
      <TitleBlock
        className={cn(
          /** 375 */
          "mt-[166px]",
          /** 768 */
          "md:mt-[249px]",
          /** 1024 */
          "lg:mt-[314px]"
        )}
      >
        Backed by <br className="md:hidden" /> incredible investors
      </TitleBlock>
      <div
        className={cn(
          "flex flex-wrap justify-between mx-auto",
          /** 375 */
          "w-full mt-[22px]",
          /** 768 */
          "md:w-[688px] md:mt-[11px]",
          /** 1024 */
          "lg:w-[904px] lg:mt-[30px]",
          /** 1440 */
          "xl:w-[1060px] xl:mt-[35px]"
        )}
      >
        {data.map((item) => {
          return (
            <img
              className={cn(
                "text-primary-80 object-contain",
                "group flex flex-wrap flex-col items-center",
                /** 375 */
                "w-[calc((100%_-_20px)_/_3)] h-[38.95px] mt-[10px]",
                /** 768 */
                "md:w-[calc((100%_-_20px)_/_3)] md:h-[80px] md:mt-[20px]",
                /** 1024 */
                "lg:w-[calc((100%_-_20px)_/_5)] lg:h-[102.34px] lg:mt-[30px]",
                /** 1440 */
                "xl:w-[calc((100%_-_160px)_/_5)] xl:h-[120px] xl:mt-[36px]"
              )}
              src={item.src}
            />
          );
        })}
      </div>
    </Content>
  );
};

export default Investors;
