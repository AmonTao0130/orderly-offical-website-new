import React from "react";
import BlockTitle from "@/components/BlockTitle";
import { useCasesExpandKey } from "@/store";
import { useStore } from "@nanostores/react";
import Content from "@/components/Content";
import { cn } from "@/utils";
import Button from "@/components/Button";
import UseCasesBg from "./usecases-bg.png";
import type { PropsWithClassName } from "@/types";

const data = [
  {
    title: "Brokers",
    content:
      "Create your own Spot or Perps DEX effortlessly on NEAR, and Perps DEX on EVM. Benefit from our professional trading infrastructure and deep liquidity.",
  },
  {
    title: "Aggregators",
    content:
      "Tap into the strength of a shared orderbook and deep liquidity. Directly connect to the entirety of Orderly's ecosystem liquidity by creating your own front-end.",
  },
  {
    title: "Wallets & Custodians",
    content:
      "Integrate with Orderly for optimal swap rates. Create a custom widget and bring our ecosystem to your users.",
  },
  {
    title: "HFT",
    content:
      "HFT Use our API and enjoy a CEX-level trading experience thanks to our low-latency orderbook.",
  },
  {
    title: "Trading Bots",
    content:
      "Connect to our orderbook to offer the industry's finest Spot & Perps rates. Benefit from SL/limit orders, gas-free transactions, and fully customizable fees.",
  },
  {
    title: "Hedging",
    content:
      "Safeguard your positions on other exchanges by using our orderbook for effective hedging strategies.",
  },
  {
    title: "Games / dApps",
    content:
      "Enhance your in-app experience and token utility with our in-game Swaps using the built-in widget. Retain users by eliminating third-party redirects",
  },
];

const titles = data.map((item) => item.title);
const contents = data.map((item) => item.content);

const UseCases: React.FC<PropsWithClassName> = (props) => {
  const expandKey = useStore(useCasesExpandKey) || 0;

  return (
    <Content className={props.className}>
      <BlockTitle>Use Cases</BlockTitle>
      <div
        className={cn(
          "flex justify-center",
          /** 375 */
          "mt-[12px]",
          /** 768 */
          "mt-[24px]"
        )}
      >
        {/* TODO: */}
        {titles.map((title, index) => {
          const expanded = expandKey === index;
          return (
            <div
              key={title}
              className={cn(
                "flex justify-center items-center h-[52px] rounded-full mx-[2px] whitespace-nowrap",
                expanded ? "text-[#000]" : "text-primary-54",
                expanded ? "bg-[rgba(209,150,255,1)]" : "bg-[#272627]",
                /** 375 */
                "text-xs leading-[12px] px-[12px]",
                /** 768 */
                "md:text-sm md:leading-[14px] md:px-[24px]"
              )}
              onClick={() => {
                useCasesExpandKey.set(index);
              }}
            >
              {title}
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
          "md:p-[60px] md:mt-[32px]"
        )}
      >
        <img
          className={cn(
            "absolute right-0 bottom-0 w-[400px] rounded-[24px] mix-blend-screen",
            /** 375 */
            "w-[220px]",
            /** 768 */
            "md:w-[300px]",
            /** 1024 */
            "lg:w-[500px]"
          )}
          src={UseCasesBg.src}
        />
        {/* <div className="absolute top-0 left-0 z-10 w-full h-full rounded-[24px]"></div> */}
        <div
          className={cn(
            "text-primay",
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
            /** 375 */
            "mt-[16px]",
            /** 768 */
            "md:mt-[40px]"
          )}
        >
          Start building now
        </Button>
      </div>
    </Content>
  );
};

export default UseCases;
