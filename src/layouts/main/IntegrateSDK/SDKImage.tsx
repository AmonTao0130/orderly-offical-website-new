import React from "react";
import type { PropsWithClassName } from "@/types";
import { cn } from "@/utils";
import bg1 from "./imgs/bg.png";
import orderbook1 from "./imgs/orderbook.png";
import orderentry1 from "./imgs/orderentry.png";
import bg2 from "./imgs/bg-2.png";
import orderbook2 from "./imgs/orderbook-2.png";
import orderentry2 from "./imgs/orderentry-2.png";

interface SDKImageProps {
  order: "first" | "second";
  id?: string;
}
const SDKImage: React.FC<SDKImageProps & PropsWithClassName> = (props) => {
  const isFirst = props.order === "first";
  return (
    <div
      id={props.id}
      className={cn(
        "relative mx-auto",
        /** 375 */
        "w-[267.2px] h-[194px] left-[8px]",
        /** 768 */
        "md:left-0",
        /** 1024 */
        "lg:w-[501px] lg:h-[363.75px]",
        /** 1440 */
        // "xl:w-[668px] xl:h-[485px]",
        "xl:w-[584.8px] xl:h-[412.25px]",
        props.className
      )}
    >
      <img
        id="IntegrateSDKBg"
        className={cn(
          "overflow-hidden",
          "[transform:matrix(0.99,0.1,-0.29,0.96,0,0)]",
          /** 375 */
          "w-[267.2px] h-[194px] rounded-[10.7px] [backdrop-filter:blur(6.692px)]",
          /** 1024 */
          "lg:w-[501px] lg:h-[363.75px] lg:rounded-[20.08px] lg:[backdrop-filter:blur(12.5475px)]",
          /** 1440 */
          // "xl:w-[668px] xl:h-[485px] xl:rounded-[26.77px] xl:[backdrop-filter:blur(16.73px)]",
          "xl:w-[584.8px] xl:h-[412.25px] xl:rounded-[22.75px] xl:[backdrop-filter:blur(16.73px)]",
          isFirst
            ? [
                /** 375 */
                "[box-shadow:10px_15px_73px_rgba(118,42,215,0.5)] [backdrop-filter:blur(12.5475px)]",
                /** 1024 */
                "lg:[box-shadow:15px_23px_93px_rgba(118,42,215,0.5)]",
                /** 1440 */
                "xl:[box-shadow:17px_26px_125px_rgba(118,42,215,0.5)]",
                // "[box-shadow:20px_31px_147px_rgba(118,42,215,0.5)] [backdrop-filter:blur(12.5475px)]",
              ]
            : [
                /** 375 */
                "[box-shadow:10px_15px_43px_#041165] [backdrop-filter:blur(16.73px)]",
                /** 1024 */
                "lg:[box-shadow:15px_23px_64px_#041165] ",
                /** 1440 */
                "xl:[box-shadow:17px_26px_73px_#041165]",
                // "[box-shadow:20px_31px_85.8px_#041165] [backdrop-filter:blur(16.73px)]",
              ]
        )}
        src={isFirst ? bg1.src : bg2.src}
      />
      <img
        id="IntegrateSDKOrderBook"
        className={cn(
          "absolute",
          "[box-shadow:15px_16.73px_25px_0px_rgba(0,0,0,0.3)]",
          "[transform:matrix(0.99,0.1,-0.29,0.96,0,0)]",
          /** 375 */
          "w-[121.6px] h-[194px] top-[-22px] left-[-10px] rounded-[11.64px] [backdrop-filter:blur(5.1757px)]",
          /** 1024 */
          "lg:w-[228px] lg:h-[363.75px] lg:top-[-35px] lg:left-[-10px] lg:rounded-[21.84px] lg:[backdrop-filter:blur(9.7045px)]",
          /** 1440 */
          // "xl:w-[304px] xl:h-[485px] xl:top-[-45px] xl:left-[-10px] xl:rounded-[29.11px] xl:[backdrop-filter:blur(12.9393px)]"
          "xl:w-[258.4px] xl:h-[412.25px] xl:top-[-50px] xl:left-[-10px] xl:rounded-[24.74px] xl:[backdrop-filter:blur(12.9393px)]"
        )}
        src={isFirst ? orderbook1.src : orderbook2.src}
      />
      <img
        id="IntegrateSDKOrderEntry"
        className={cn(
          "absolute",
          "[box-shadow:15px_16.73px_25px_0px_rgba(0,0,0,0.3)]",
          "[transform:matrix(0.99,0.1,-0.29,0.96,0,0)]",
          /** 375 */
          "w-[137.6px] h-[194px] top-[-8px] right-[10px] rounded-[11.64px] [backdrop-filter:blur(5.1757px)]",
          /** 1024 */
          "lg:w-[258px] lg:h-[363.75px] lg:top-[-10px] lg:right-[15px] lg:rounded-[21.84px] lg:[backdrop-filter:blur(9.7045px)]",
          /** 1440 */
          // "xl:w-[344px] xl:h-[485px] xl:top-[-12px] xl:right-[15px] xl:rounded-[29.11px] xl:[backdrop-filter:blur(12.9393px)]"
          "xl:w-[292.4px] xl:h-[412.25px] xl:top-[-22px] xl:right-[30px] xl:rounded-[24.74px] xl:[backdrop-filter:blur(12.9393px)]"
        )}
        src={isFirst ? orderentry1.src : orderentry2.src}
      />
    </div>
  );
};

export default SDKImage;
