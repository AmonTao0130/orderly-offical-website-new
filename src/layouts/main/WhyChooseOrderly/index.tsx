import React, { useState } from "react";
import Button from "../../../components/Button/index.tsx";
import Content from "../../../components/Content/index.tsx";
import maximize from "./icons/maximize.svg";
import multichain from "./icons/multichain.svg";
import liquidity from "./icons/liquidity.svg";
import performance from "./icons/performance.svg";
import decentralize from "./icons/decentralize.svg";
import security from "./icons/security.svg";
import { cn } from "../../../utils/index.ts";
import { useStore } from "@nanostores/react";
import { whyChooseOrderlyExpandKey } from "@/store";

const data = [
  {
    icon: maximize.src,
    title: "Maximize your dApp’s potential",
    content:
      "Reduce go-to-market time to just a few days. Gain back weeks of time. Concentrate on addressing larger challenges.",
  },
  {
    icon: multichain.src,
    title: "Multichain trading, reimagined",
    content:
      "Omnichain orderbook. Unified liquidity across blockchains. No need for bridges.",
  },
  {
    icon: liquidity.src,
    title: "End the hunt for liquidity",
    content:
      "Deep liquidity driven by top market makers. Offering steady spreads, ample depth, and reliable uptime for users.",
  },
  {
    icon: performance.src,
    title: "CEX-level performance",
    content:
      "<200ms latency suitable for HFT. On-chain Orders, Self-Custody &Transparency maintained.",
  },
  {
    icon: decentralize.src,
    title: "Complete decentralization",
    content: "Permissionless, Transparent, and Community-driven.",
  },
  {
    icon: security.src,
    title: "Total security",
    content:
      "Put security on auto-pilot as you inherit Orderly’s security. No more wrapped assets, no more bridges.",
  },
];

interface WhyChooseOrderlyProps {}
const WhyChooseOrderly: React.FC<WhyChooseOrderlyProps> = (props) => {
  const expandKey = useStore(whyChooseOrderlyExpandKey) || data[0]?.title;

  return (
    <Content className="mt-[285px]">
      <div className={"lg:flex lg:justify-between"}>
        <div className="lg:max-w-[430px] xl:max-w-[677px] flex justify-between flex-col w-[677px]">
          <div
            className={cn(
              /** 375 */
              "text-2xl leading-[28.8px]",
              /** 768 */
              "md:text-4xl md:leading-[48px]",
              /** 1024 */
              "lg:text-5xl lg:leading-[72px]"
            )}
          >
            Discover why builders <br className="lg:hidden" /> choose Orderly
          </div>
          <div className="mt-[16px] md:mt-[18px] lg:mt-0">
            <Button type="outlined" showArrow>
              Explore docs
            </Button>
            <Button className="ml-[8px] md:ml-[12px]" type="outlined" showArrow>
              View audit reports
            </Button>
          </div>
        </div>
        <div className="lg:w-[465px] mt-[32px] md:mt-[42px] lg:mt-0">
          {data.map((item, index) => {
            const expanded = expandKey === item.title;

            return (
              <div
                className={cn(
                  "text-primary-100",
                  /** 375 */
                  "py-[24px]",
                  /** 768 */
                  "md:py-[32px] md:first:pt-[16px] md:last:pb-0",
                  index + 1 !== data.length &&
                    "border-b-[1px] border-b-solid border-b-primary-12"
                )}
                key={item.title}
                onClick={() => {
                  whyChooseOrderlyExpandKey.set(item.title);
                }}
              >
                <div className="flex items-center ">
                  <img className="mr-[8px]" src={item.icon} />
                  {/* 字体渐变颜色使用tailwind写会显示错误，暂时使用 style 代替 */}
                  <span
                    style={
                      expanded
                        ? {
                            background:
                              "linear-gradient(84.32deg, #FFFFFF -1.85%, #D196FF 105.08%)",
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            WebkitBackgroundClip: "text",
                          }
                        : undefined
                    }
                    // style="background: linear-gradient(84.32deg, #FFFFFF -1.85%, #D196FF 105.08%);
                    //   -webkit-background-clip: text;
                    //    -webkit-text-fill-color: transparent;
                    //    background-clip: text;
                    //    text-fill-color: transparent;"
                    className={cn(
                      /** 375 */
                      "text-lg leading-[18px]",
                      /** 768 */
                      "md:text-2xl md:leading-[24px]"
                      // "[background:linear-gradient(84.32deg,#FFFFFF_-1.85%,#D196FF_105.08%)] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent]"
                    )}
                  >
                    {item.title}
                  </span>
                </div>
                {expanded && (
                  <div
                    className={cn(
                      "font-medium min-h-[48px] mt-[12px]",
                      /** 375 */
                      "text-sm leading-[21px] pr-[20px] lg:pr-0",
                      /** 768 */
                      "md:text-base md:leading-[24px]"
                    )}
                  >
                    {item.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Content>
  );
};

export default WhyChooseOrderly;
