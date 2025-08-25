import React from "react";
import Content from "@/components/Content";
import Button from "@/components/Button";
import { cn } from "@/utils";
import type { PropsWithClassName } from "@/types";
import { Hyperlink } from "@/utils/constant";

import PanteraSvg from "./backers/Pantera.svg";
import DragonflyCapitalSvg from "./backers/DragonflyCapital.svg";
import SequoiaCapitalSvg from "./backers/SequoiaCapital.svg";
import GSRSvg from "./backers/GSR.svg";
import RaydiumSvg from "./backers/Raydium.svg";
import CryptocomCapitalSvg from "./backers/CryptocomCapital.svg";
import IOSGSvg from "./backers/IOSG.svg";
import WOOSvg from "./backers/WOO.svg";
import DIVenturesSvg from "./backers/DIVentures.svg";
import SevenXSvg from "./backers/SevenX.svg";
import AGBuildSvg from "./backers/AGBuild.svg";
import JumpSvg from "./backers/Jump.svg";
import KronosSvg from "./backers/Kronos.svg";
import GateVenturesSvg from "./backers/GateVentures.svg";
import NewmanSvg from "./backers/Newman.svg";
import AmberSvg from "./backers/Amber.svg";
import MetawebSvg from "./backers/Metaweb.svg";
import SubzeroSvg from "./backers/Subzero.svg";
import LaserDigitalSvg from "./backers/LaserDigital.svg";
import CoinDCXSvg from "./backers/CoinDCX.svg";
import CoboVenturesSvg from "./backers/CoboVentures.svg";
import MiranaSvg from "./backers/Mirana.svg";
import PuzzleVenturesSvg from "./backers/PuzzleVentures.svg";
import C2VenturesSvg from "./backers/C2Ventures.svg";
import LedgerPrimeSvg from "./backers/LedgerPrime.svg";
import RageTradeSvg from "./backers/RageTrade.svg";
import WOOFiProSvg from "./backers/WOOFiPro.svg";
import UnidexSvg from "./backers/Unidex.svg";
import LogXSvg from "./backers/LogX.svg";
import EmpyrealSvg from "./backers/Empyreal.svg";
import BTSESvg from "./backers/BTSE.svg";
import ArbitrumSvg from "./backers/Arbitrum.svg";
import OptimismSvg from "./backers/Optimism.svg";
import LayerZeroSvg from "./backers/LayerZero.svg";
import EthereumSvg from "./backers/Ethereum.svg";
import PolygonSvg from "./backers/Polygon.svg";
import ElixirSvg from "./backers/Elixir.svg";

const backers = [
  { name: "Pantera", src: PanteraSvg.src },
  { name: "DragonflyCapital", src: DragonflyCapitalSvg.src },
  { name: "SequoiaCapital", src: SequoiaCapitalSvg.src },
  { name: "GSR", src: GSRSvg.src },
  { name: "Raydium", src: RaydiumSvg.src },
  { name: "CryptocomCapital", src: CryptocomCapitalSvg.src },
  { name: "IOSG", src: IOSGSvg.src },
  { name: "WOO", src: WOOSvg.src },
  { name: "DIVentures", src: DIVenturesSvg.src },
  { name: "SevenX", src: SevenXSvg.src },
  { name: "AGBuild", src: AGBuildSvg.src },
  { name: "Jump", src: JumpSvg.src },
  { name: "Kronos", src: KronosSvg.src },
  { name: "GateVentures", src: GateVenturesSvg.src },
  { name: "Newman", src: NewmanSvg.src },
  { name: "Amber", src: AmberSvg.src },
  { name: "Metaweb", src: MetawebSvg.src },
  { name: "C2Ventures", src: C2VenturesSvg.src },
  { name: "Subzero", src: SubzeroSvg.src },
  { name: "LedgerPrime", src: LedgerPrimeSvg.src },
  { name: "LaserDigital", src: LaserDigitalSvg.src },
  { name: "CoinDCX", src: CoinDCXSvg.src },
  { name: "CoboVentures", src: CoboVenturesSvg.src },
  { name: "Mirana", src: MiranaSvg.src },
  { name: "PuzzleVentures", src: PuzzleVenturesSvg.src },
  { name: "RageTrade", src: RageTradeSvg.src },
  { name: "WOOFiPro", src: WOOFiProSvg.src },
  { name: "Unidex", src: UnidexSvg.src },
  { name: "LogX", src: LogXSvg.src },
  { name: "Empyreal", src: EmpyrealSvg.src },
  { name: "BTSE", src: BTSESvg.src },
  { name: "Arbitrum", src: ArbitrumSvg.src },
  { name: "Optimism", src: OptimismSvg.src },
  { name: "LayerZero", src: LayerZeroSvg.src },
  { name: "Ethereum", src: EthereumSvg.src },
  { name: "Polygon", src: PolygonSvg.src },
  { name: "Elixir", src: ElixirSvg.src },
];

const ExploreEcosystem: React.FC<PropsWithClassName> = (props) => {
  return (
    <Content className={props.className}>
      <div
        className={cn(
          "flex flex-col items-center text-center",
        )}
      >
        <div
          className={cn(
            "font-display text-primary",
            /** 375 */
            "text-2xl leading-[28.8px]",
            /** 768 */
            "md:text-4xl md:leading-[48px]",
            /** 1024 */
            "lg:text-5xl lg:leading-[72px]"
          )}
        >
          Explore Orderly's vibrant ecosystem
        </div>
        <div
          className={cn(
            "text-primary-80 font-regular",
            /** 375 */
            "text-sm leading-[21px] mt-[12px]",
            /** 768 */
            "md:text-base md:leading-[24px] md:mt-[8px]"
          )}
        >
          An expansive ecosystem, featuring CEXs, DEXs, aggregators, wallets, and more, all powered by Orderly's permissionless liquidity layer.
        </div>
        
        <div 
          className={cn(
            "flex flex-wrap justify-start gap-x-6",
            /** 375 */
            "mt-[32px]",
            /** 768 */
            "md:mt-[40px]",
            /** 1024 */
            "lg:mt-[48px]"
          )}
        >
          {backers.map((backer) => {
            return (
              <img
                key={backer.name}
                className={cn(
                  "h-[80px] object-contain",
                  /** 375 */
                  "w-[113px]",
                  /** 768 */
                  "md:w-[172px]",
                  /** 1024 */
                  "lg:w-[150px]",
                  /** 1440 */
                  "xl:w-[193px]"
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
    </Content>
  );
};

export default ExploreEcosystem;
