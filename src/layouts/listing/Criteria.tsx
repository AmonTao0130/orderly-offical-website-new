import React from "react";
import Title from "./Title";
import { cn } from "@/utils";
import Block from "./Block";
import criteria1 from "./img/criteria1.png";
import criteria2 from "./img/criteria2.png";
import criteria3 from "./img/criteria3.png";

interface CriteriaProps {}
const Criteria: React.FC<CriteriaProps> = (props) => {
  const imgCls = cn(
    "w-[80px] h-[80px]",
    "md:w-[120px] md:h-[120px]",
    "lg:w-[140px] lg:h-[140px]"
  );

  const titleCls = "isting-text-gradient mt-[24px] text-[22px] lg:text-[28px]";

  const subTitleCls = cn(
    "text-primary-80  mt-[4px]",
    "text-[16px] leading-[24px]",
    "lg:text-[20px] lg:leading-[30px]"
  );

  const contentCls = cn("text-primary-54 text-[14px] leading-[21px]");

  const dotCls = cn(
    "relative pl-[20px] mt-[4px]",
    "before:content-['']",
    "before:w-[3px] before:h-[3px] before:rounded-full before:bg-primary-54",
    "before:absolute before:top-[10px] before:left-[7px]"
  );

  return (
    <div
      id="listing-criteria"
      className={cn("mt-[14px] md:mt-[58px] lg:mt-[85px] xl:mt-[25px]")}
    >
      <Title>Listing criteria</Title>

      <div className="flex flex-col md:flex-row gap-[20px] items-stretch">
        <div className="flex flex-col gap-y-[20px] flex-1">
          <Block className="p-[32px] h-full">
            <img className={imgCls} src={criteria1.src} alt="criteria1" />
            <div className={titleCls}>3+ price Oracles available</div>
            <div className={cn(subTitleCls, "mt-[8px]")}>
              Compatible oracles
            </div>
            <div className={cn(contentCls, "mt-[4px]")}>
              Binance, OKX, Bybit, Bitget, BingX, Gate.io, Kucoin, HTX, MEXC,
              WOO X
            </div>
          </Block>

          <Block className="p-[32px] h-full">
            <img className={imgCls} src={criteria2.src} alt="criteria1" />
            <div className={titleCls}>$20M or above FDV</div>
          </Block>
        </div>

        <div className="flex flex-1">
          <Block className="p-[32px]">
            <img className={imgCls} src={criteria3.src} alt="criteria1" />
            <div className={titleCls}>Market maker and liquidity</div>
            <div className={cn(subTitleCls, "mt-[20px]")}>
              Market maker and liquidity
            </div>
            <div className={cn(contentCls, dotCls)}>
              Need to bring your own market maker to provide liquidity for your
              your perp market on Orderly
            </div>
            <div className={cn(contentCls, dotCls)}>
              Share the list of your token market makers for Orderly integration
              status verification
            </div>

            <div className={cn(subTitleCls, "mt-[20px]")}>
              Liquidity requirement
            </div>
            <div className={cn(contentCls, dotCls)}>
              <span className="text-primary-80">Depth</span>: minimum 20K in -2%
              depth, minimum 20K in +2% depth
            </div>
            <div className={cn(contentCls, dotCls)}>
              <span className="text-primary-80">Levels</span>: minimum 15 levels
              (legs) in -2% depth, minimum 15 levels (legs) in +2% depth
            </div>
            <div className={cn(contentCls, dotCls)}>
              <span className="text-primary-80">Spread</span>: ≤50 bps
            </div>
            <div className={cn(contentCls, dotCls)}>
              <span className="text-primary-80">Up time</span>: ≥90%
            </div>
          </Block>
        </div>
      </div>
    </div>
  );
};

export default Criteria;
