import React from "react";
import BlockTitle from "@/components/BlockTitle";
import Content from "@/components/Content";
import { cn } from "@/utils";
import bg from "./imgs/bg.png";
import orderbook1 from "./imgs/orderbook.png";
import orderentry1 from "./imgs/orderentry.png";
import type { PropsWithClassName } from "@/types";

const IntegrateSDK: React.FC<PropsWithClassName> = (props) => {
  return (
    <Content id="IntegrateSDK" className={props.className}>
      <BlockTitle>Integrate with Orderly SDK</BlockTitle>
      <div
        className={cn(
          /** 375 */
          "flex felx-col flex-col-reverse mt-[85px]",
          /** 768 */
          "md:flex-row md:justify-between md:mt-[78px]",
          /** 1024 */
          "lg:mt-[87px]",
          /** 1440 */
          "xl:mt-[120px]"
        )}
      >
        <div className={cn("mx-auto")}>
          <div
            className={cn(
              /** 375 */
              "text-primary text-xl leading-[24px] mt-[61px]",
              /** 768 */
              "md:mt-[15px]",
              /** 1024 */
              "lg:text-[26px] lg:leading-[34px] lg:mt-[67px]",
              /** 1440 */
              "xl:text-4xl xl:leading-[56px] xl:mt-[104px]"
            )}
          >
            Build independent UI <br /> components and pages
          </div>
          <div
            className={cn(
              "text-primary-80 mt-[12px]",
              /** 375 */
              "text-sm leading-[21px]",
              /** 768 */
              "md:w-[300px] md:text-base md:leading-[24px]",
              /** 1024 */
              "lg:w-[365px] lg:text-xl lg:leading-[30px]",
              /** 1440 */
              "xl:w-[534px]"
            )}
          >
            Implement components and pages <br className="md:hidden" /> without
            <br className="sm:hidden md:hidden" /> needing to fuss with data,
            APIs, <br className="md:hidden" /> or business logic.
          </div>
        </div>
        <div
          className={cn(
            "relative mx-auto",
            /** 375 */
            "w-[267.2px] h-[194px] left-[8px]",
            /** 768 */
            "md:left-0",
            /** 1024 */
            "lg:w-[501px] lg:h-[363.75px]",
            /** 1440 */
            "xl:w-[668px] xl:h-[485px]"
          )}
        >
          <img
            id="IntegrateSDKBg"
            className={cn(
              "[backdrop-filter:blur(12.5475px)] overflow-hidden",
              "[box-shadow:20px_31px_147px_rgba(118,42,215,0.5)]",
              "[transform:matrix(0.99,0.1,-0.29,0.96,0,0)_translateY(-100px)]",
              /** 375 */
              "w-[267.2px] h-[194px] rounded-[10.7px]",
              /** 1024 */
              "lg:w-[501px] lg:h-[363.75px] lg:rounded-[20.08px]",
              /** 1440 */
              "xl:w-[668px] xl:h-[485px] xl:rounded-[26.77px]"
            )}
            src={bg.src}
          />
          <img
            id="IntegrateSDKOrderBook"
            className={cn(
              "absolute",
              "[box-shadow:15px_16.73px_25px_0px_rgba(0,0,0,0.3)]",
              "[backdrop-filter:blur(25.88px)]",
              "[transform:matrix(0.99,0.1,-0.29,0.96,0,0)]",
              /** 375 */
              "w-[121.6px] h-[194px] top-[-22px] left-[-10px] rounded-[11.64px]",
              /** 1024 */
              "lg:w-[228px] lg:h-[363.75px] lg:top-[-35px] lg:left-[-10px] lg:rounded-[21.84px]",
              /** 1440 */
              "xl:w-[304px] xl:h-[485px] xl:top-[-45px] xl:left-[-10px] xl:rounded-[29.11px]"
            )}
            src={orderbook1.src}
          />
          <img
            id="IntegrateSDKOrderEntry"
            className={cn(
              "absolute",
              "[box-shadow:15px_16.73px_25px_0px_rgba(0,0,0,0.3)]",
              "[backdrop-filter:blur(12.9393px)]",
              "[transform:matrix(0.99,0.1,-0.29,0.96,0,0)]",
              /** 375 */
              "w-[137.6px] h-[194px] top-[-8px] right-[10px] rounded-[11.64px]",
              /** 1024 */
              "lg:w-[258px] lg:h-[363.75px] lg:top-[-10px] lg:right-[15px] lg:rounded-[21.84px]",
              /** 1440 */
              "xl:w-[344px] xl:h-[485px] xl:top-[-12px] xl:right-[15px] xl:rounded-[29.11px]"
            )}
            src={orderentry1.src}
          />
        </div>
      </div>
    </Content>
  );
};

export default IntegrateSDK;
