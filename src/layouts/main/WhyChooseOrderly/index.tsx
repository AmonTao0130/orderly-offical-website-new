import React, { useEffect } from "react";
import Button from "@/components/Button/index.tsx";
import Content from "@/components/Content/index.tsx";
import maximize from "./icons/maximize.svg";
import multichain from "./icons/multichain.svg";
import liquidity from "./icons/liquidity.svg";
import performance from "./icons/performance.svg";
import decentralize from "./icons/decentralize.svg";
import security from "./icons/security.svg";
import zellic from "./icons/zellic.png";
import { cn } from "@/utils/index.ts";
import { useStore } from "@nanostores/react";
import { whyChooseOrderlyExpandKey } from "@/store";
import type { PropsWithClassName } from "@/types";
import { Hyperlink } from "@/utils/constant";

const data = [
  {
    icon: security.src,
    title: "Total Security",
    content:
      "Put security on auto-pilot as you inherit Orderly’s secure trading infrastructure, affirmed by renowned auditing firms.",
  },
  {
    icon: performance.src,
    title: "CEX-Level Performance",
    content:
      "<200ms latency for high-frequency trading —with the  benefits of DeFi - self-custody, on-chain orders, and full transparency.",
  },
  {
    icon: liquidity.src,
    title: "End the Hunt for Liquidity",
    content:
      "Deep liquidity driven by top market makers. Offering steady spreads, ample depth, and reliable uptime for users.",
  },
  {
    icon: decentralize.src,
    title: "Complete Decentralization",
    content:
      "Community-driven collaborative ecosystem underpinned by permissionless innovation and full transparency.",
  },
  {
    icon: multichain.src,
    title: "Reimagine Omnichain Trading",
    content:
      "Omnichain orderbook. Unified liquidity across blockchains. No need for bridges.",
  },
  {
    icon: maximize.src,
    title: "Maximize Your DApp’s Potential",
    content:
      "Reduce go-to-market time to just a few days. Gain back weeks of time. Concentrate on addressing larger challenges.",
  },
];

const WhyChooseOrderly: React.FC<PropsWithClassName> = (props) => {
  const expandKey = useStore(whyChooseOrderlyExpandKey) || data[0]?.title;

  const zellicLogo = (
    <div className="text-center">
      <div
        className={cn(
          "fontbold text-primary-80 leading-[0.1]",
          /** 375 */
          "text-xs leading-[12px]",
          /** 768 */
          "xl:text-sm xl:leading-[14px]"
          /** 1440 */
        )}
      >
        Audited by
      </div>
      <img
        src={zellic.src}
        className={cn(
          /** 375 */
          "w-[63px] mt-[6px]",
          /** 768 */
          "md:w-[72px] md:mt-[8px]",
          /** 1440 */
          "xl:w-[86.4px]"
        )}
      />
    </div>
  );

  return (
    <Content id="WhyChooseOrderly" className={cn("relative", props.className)}>
      <div className="lg:flex lg:justify-between">
        <div
          className={cn(
            "flex justify-between flex-col",
            /** 375 */
            "max-w-[677px]",
            /** 1024 */
            "lg:max-w-[430px]",
            /** 1440 */
            "xl:max-w-[677px]"
          )}
        >
          <div
            id="WhyChooseOrderlyTitle"
            className={cn(
              "flex justify-between items-center",
              /** 375 */
              "text-[22px] leading-[28.8px] font-title",
              /** 768 */
              "md:text-4xl md:leading-[48px]",
              /** 1024 */
              "lg:text-5xl lg:leading-[72px]"
            )}
          >
            <h2>
              Discover why builders <br className="lg:hidden" /> choose Orderly
              Network
            </h2>

            <div
              className={cn(
                /** 768 */
                "md:hidden"
              )}
            >
              {zellicLogo}
            </div>
          </div>
          <div
            id="WhyChooseOrderlyButton"
            className="flex items-center mt-[16px] md:mt-[18px] lg:mt-0"
          >
            <Button
              className={cn(
                /** 1024 */
                "lg:text-sm lg:px-[20px] lg:h-[40px]",
                /** 1440 */
                "xl:text-base xl:px-[24px] xl:h-[52px]"
              )}
              type="outlined"
              showArrow
              href={Hyperlink.Main.ExploreDocs}
            >
              Explore docs
            </Button>
            <Button
              className={cn(
                "ml-[8px] md:ml-[12px]",
                /** 1024 */
                "lg:text-sm lg:px-[20px] lg:h-[40px]",
                /** 1440 */
                "xl:text-base xl:px-[24px] xl:h-[52px]"
              )}
              type="outlined"
              showArrow
              href={Hyperlink.Main.ViewAuditReports}
            >
              View audit reports
            </Button>
            <div
              className={cn(
                /** 375 */
                "ml-[12px] hidden",
                /** 768 */
                "md:block",
                /** 1440 */
                "xl:ml-[16px]"
              )}
            >
              {zellicLogo}
            </div>
          </div>
        </div>
        <div
          id="WhyChooseOrderlyContent"
          className="lg:w-[430px] mt-[32px] md:mt-[42px] lg:mt-0 cursor-pointer"
        >
          {data.map((item, index) => {
            const expanded = expandKey === item.title;

            return (
              <div
                className={cn(
                  "font-title text-primary-100",
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
                  <h3
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
                      "select-none",
                      /** 375 */
                      "text-lg leading-[18px]",
                      /** 768 */
                      "md:text-2xl md:leading-[28px]"
                      // "[background:linear-gradient(84.32deg,#FFFFFF_-1.85%,#D196FF_105.08%)] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent]"
                    )}
                  >
                    {item.title}
                  </h3>
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
