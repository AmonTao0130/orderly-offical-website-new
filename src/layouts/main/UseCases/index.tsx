import React from "react";
import BlockTitle from "@/components/BlockTitle";
import { useCasesExpandKey } from "@/store";
import { useStore } from "@nanostores/react";
import Content from "@/components/Content";
import { cn } from "@/utils";
import Button from "@/components/Button";
import Brokers from "./imgs/Brokers.png";
import Aggregators from "./imgs/Aggregators.png";
import WalletsCustodians from "./imgs/WalletsCustodians.png";
import HFT from "./imgs/HFT.png";
import TradingBots from "./imgs/TradingBots.png";
import Hedging from "./imgs/Hedging.png";
import GamesdApps from "./imgs/GamesdApps.png";
import type { PropsWithClassName } from "@/types";
import { Hyperlink } from "@/utils/constant";

const data = [
  {
    title: "DEX Builders",
    content:
      "Create your own Spot or Perps DEX effortlessly on NEAR, and Perps DEX on EVM. Benefit from our professional trading infrastructure and deep liquidity.",
    img: Brokers.src,
  },
  {
    title: "Aggregators",
    content:
      "Tap into the strength of a shared orderbook and deep liquidity. Directly connect to the entirety of Orderly's ecosystem liquidity by creating your own front-end.",
    img: Aggregators.src,
  },
  {
    title: "Wallets & Custodians",
    content:
      "Integrate with Orderly for optimal swap rates. Create a custom widget and bring our ecosystem to your users.",
    img: WalletsCustodians.src,
  },
  {
    title: "High-Frequency Trading",
    abbr: "HFT",
    content:
      "Use our API and enjoy a CEX-level trading experience thanks to our low-latency orderbook.",
    img: HFT.src,
  },
  {
    title: "Trading Bots",
    content:
      "Connect to our orderbook to offer the industry's finest Spot & Perps rates. Benefit from SL/limit orders, gas-free transactions, and fully customizable fees.",
    img: TradingBots.src,
  },
  {
    title: "Hedging",
    content:
      "Safeguard your positions on other exchanges by using our orderbook for effective hedging strategies.",
    img: Hedging.src,
  },
  {
    title: "Games / dApps",
    content:
      "Enhance your in-app experience and token utility with our in-game Swaps using the built-in widget. Retain users by eliminating third-party redirects",
    img: GamesdApps.src,
  },
];

const titles = data.map((item) => item.title);
const contents = data.map((item) => item.content);
const imgs = data.map((item) => item.img);

const UseCases: React.FC<PropsWithClassName> = (props) => {
  const expandKey = useStore(useCasesExpandKey) || 0;

  return (
    <Content className={props.className}>
      <BlockTitle>Use Cases</BlockTitle>
      <div
        className={cn(
          "flex overflow-hidden overflow-x-auto invisible-scrollbar cursor-pointer select-none",
          /** 375 */
          "mt-[12px] ",
          /** 768 */
          "md:mt-[24px]",
          /** 1024 */
          "lg:justify-center"
        )}
      >
        {titles.map((title, index) => {
          const expanded = expandKey === index;
          return (
            <div
              key={title}
              className={cn(
                "flex justify-center items-center h-[52px] mx-[2px] rounded-full whitespace-nowrap ",
                // index === 0 && "ml-[8px]",
                // title.length === index + 1 && "mr-0",
                expanded ? "text-[#000]" : "text-primary-54",
                expanded ? "bg-[rgba(209,150,255,1)]" : "bg-[#272627]",
                /** 375 */
                "text-xs leading-[12px] px-[12px]",
                /** 768, 这里px本来是 24，调为 23，不然宽度会不够 */
                "md:text-sm md:leading-[14px] md:px-[23px]"
              )}
              onClick={() => {
                useCasesExpandKey.set(index);
              }}
            >
              {data[index].abbr || title}
            </div>
          );
        })}
      </div>
      <div
        style={{
          background:
            "radial-gradient(114.23% 114.23% at 50% 108.86%, #903EF8 0%, rgba(0, 0, 0, 0.00) 100%), #000",
        }}
        className={cn(
          "rounded-[24px] relative",
          "[box-shadow:0px_12px_20px_0px_rgba(0,0,0,0.25)]",
          "border-[1px] border-solid border-[#CE7DFF]",
          /** 375 */
          "p-[32px] mt-[20px]",
          /** 768 */
          "md:h-[341px] md:p-[60px] md:mt-[32px]",
          /** 1024 */
          "lg:h-[363px]",
          /** 1440 */
          "xl:h-[400px]"
        )}
      >
        <img
          className={cn(
            "absolute right-0 bottom-0 rounded-[24px] mix-blend-screen h-full",
            /** 375 */
            "h-[200px]",
            /** 1024 */
            "lg:h-[300px]",
            /** 1440 */
            "xl:h-[400px]"
          )}
          src={imgs[expandKey]}
          alt={titles[expandKey]}
        />
        {/* <div className="absolute top-0 left-0 z-10 w-full h-full rounded-[24px]"></div> */}
        <div
          className={cn(
            "font-title font-semibold text-primay",
            /** 375 */
            "text-2xl leading-[28.8px]",
            /** 768 */
            "md:text-[32px] md:leading-[38.4px]",
            /** 1024 */
            "lg:text-4xl lg:leading-[48px]"
          )}
        >
          {titles[expandKey]}
        </div>
        <div
          className={cn(
            "text-primary-80 mt-[16px]",
            /** 375 */
            "text-[13px] leading-[23.4px] min-h-[70.2px] w-[271px]",
            /** 768 */
            "md:text-base md:leading-[28.8px] min-h-[86.4px] md:w-[510px]"
          )}
        >
          {contents[expandKey]}
        </div>
        <Button
          className={cn(
            "relative",
            /** 375 */
            "mt-[16px]",
            /** 768 */
            "md:mt-[40px]"
          )}
          href={Hyperlink.Main.StartBuildingNow}
        >
          Start building now
        </Button>
      </div>
    </Content>
  );
};

export default UseCases;
