import React from "react";
import type { PropsWithClassName } from "@/types";
import { cn } from "@/utils";
import { useVolume } from "../hooks/useVolume";

interface StatisticsItemProps {
  label: string;
  value: string;
  border?: boolean;
}

const StatisticsItem: React.FC<StatisticsItemProps & PropsWithClassName> = (
  props
) => {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col",
        /** 768 */
        props.border &&
          "md:border-r-[1px] md:border-r-solid md:border-r-primary-20"
      )}
    >
      <div
        className={cn(
          /** 375 */
          "text-[10px] leading-[10.2px] font-title text-primary-100 ",
          /** 768 */
          "md:text-base md:leading-[16.32px]",
          /** 1024 */
          "lg:text-xl lg:leading-[20.4px]"
        )}
      >
        {props.label}
      </div>
      <div
        style={{
          background:
            "linear-gradient(360deg, #9975FF -30.75%, rgba(155, 249, 255, 0) 103.38%), #FFFFFF",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          WebkitBackgroundClip: "text",
          fontVariantLigatures: "none",
        }}
        className={cn(
          "select-none",
          /** 375 */
          "text-2xl leading-[24px] font-bold mt-[8px]",
          /** 768 */
          "md:text-[32px] md:leading-[32px]",
          /** 1024 */
          "lg:text-5xl lg:leading-[56px] lg:mt-[16px]"
        )}
      >
        {props.value}
      </div>
    </div>
  );
};

const Statistics: React.FC<PropsWithClassName> = (props) => {
  const volume = useVolume();

  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(38, 18, 73, 0.3) 0%, rgba(111, 69, 184, 0.3) 100%)",
      }}
      className={cn(
        "text-center backdrop-blur-[25px] rounded-[12px]",
        "p-[28px] pb-[32px]",
        /** 375 */
        "mt-[41px]",
        /** 768 */
        "md:mt-[72px]",
        /** 1024 */
        "lg:mt-[74px] ",
        /** 1440 */
        "xl:mt-[74px]"
      )}
    >
      <div className="flex">
        <StatisticsItem
          label="Total trading volume"
          value={`$${volume}`}
          border
        />
        <StatisticsItem label="Traders" value="200K+" border />
        <StatisticsItem label="Ecosystem partners" value="26" />
      </div>
    </div>
  );
};

export default Statistics;
