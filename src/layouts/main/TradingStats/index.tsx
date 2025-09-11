import React from "react";
import type { PropsWithClassName } from "@/types";
import { cn } from "@/utils";
import Content from "@/components/Content";
import NumberLabel from "./Number";
import { useStatistics } from "../../hooks/useStatistics";

interface StatItemProps {
  label: string;
  number: string;
  isLarge?: boolean;
}

interface StatGroupProps {
  stats: StatItemProps[];
  className?: string;
}

const StatGroup: React.FC<StatGroupProps> = ({ stats }) => {
  return (
    <div className={cn(
      "flex flex-col",
      /** 375 */
      "gap-6",
      /** 768 */
      "md:gap-6",
      /** 1024 */
      "lg:gap-6",
      /** 1440 */
      "xl:gap-12"
    )}>
      {stats.map((stat, index) => (
        <NumberLabel key={index} {...stat} />
      ))}
    </div>
  );
};

const Divider: React.FC = () => {
  return (
    <div
      className={cn(
        "w-0",
        /** 375 */
        "h-[174px]",
        /** 768 */
        "md:h-[234px]",
        /** 1024 */
        "lg:h-[189px]"
      )}
      style={{
        borderLeft: "1px solid",
        borderImageSource:
          "linear-gradient(283.08deg, rgba(47, 0, 146, 0.2) 9.47%, rgba(205, 125, 255, 0.55) 45.44%, rgba(47, 0, 146, 0.2) 93.06%)",
        borderImageSlice: 1,
      }}
    />
  );
};

const TradingStats: React.FC<PropsWithClassName> = (props) => {
  const { stats, loading } = useStatistics();
  
  const containerStyle: React.CSSProperties = {
    background: "radial-gradient(92.86% 185.71% at 50% 100%, rgba(144, 62, 248, 0.3) 0%, rgba(0, 0, 0, 0) 60%)",
    position: "relative",
    backdropFilter: "blur(20px)",
  };

  const borderStyle: React.CSSProperties = {
    background: "linear-gradient(4.4deg, rgba(255, 255, 255, 0) 9.47%, rgba(47, 0, 146, 0.3) 45.44%, rgba(206, 125, 255, 0.6) 93.06%)",
    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    maskComposite: "exclude",
    borderRadius: "inherit",
    zIndex: -1,
  };

  return (
    <Content className={props.className}>
      <div 
        className={cn(
          "flex justify-between items-start",
          /** 375 */
          "flex-col items-center",
          /** 768 */
          "md:flex-col md:items-center",
          /** 1024 */
          "lg:flex-row lg:gap-8 lg:items-start",
          /** 1440 */
          "xl:gap-12",
          "rounded-[24px]",
          /** 375 */
          "p-[24px]",
          /** 768 */
          "md:py-[32px] md:px-[80px]",
          /** 1024 */
          "lg:py-[48px] lg:px-[40px]",
          /** 1440 */
          "xl:p-[48px]",
          "relative"
        )}
        style={containerStyle}
      >
        <div 
          className="absolute inset-0 rounded-[24px] p-px"
          style={borderStyle}
        />

        <div className={cn(
          "w-auto",
          /** 375 */
          "sm:w-full",
          /** 768 */
          "md:w-full",
          /** 1024 */
          "lg:w-auto lg:mx-[12px]"
        )}>
          {/* For under 1024, show total volume and 24h volume in one row */}
          <div className="block hidden lg:block">
            <StatGroup stats={[
              { label: "Total trading volume", number: loading ? "--" : stats.totalVolume },
              { label: "24h tradingvolume", number: loading ? "--" : stats.volume24h}
            ]} />
          </div>
        </div>
        <div className={cn(
          "min-w-[295px] ml-[18px] flex justify-between items-start",
          /** 375 */
          "sm:w-full sm:justify-between sm:items-center",
          /** 768 */
          "md:w-full md:ml-0 md:justify-between md:items-center",
          /** 1024 */
          "lg:gap-8 lg:justify-between lg:items-start",
          /** 1440 */
          "xl:gap-12"
        )}>
          <div className="hidden lg:block">
            <Divider />
          </div>
          <div className="block lg:hidden">
            <StatGroup stats={[
              { label: "Total trading volume", number: loading ? "--" : stats.totalVolume },
              { label: "Open interest", number: loading ? "--" : stats.openInterest },
              { label: "TVL", number: loading ? "--" : stats.tvl }
            ]} />
          </div>
          <div className="hidden lg:block">
            <StatGroup stats={[
              { label: "Open interest", number: loading ? "--" : stats.openInterest },
              { label: "TVL", number: loading ? "--" : stats.tvl }
            ]} />
          </div>
          <Divider />
          <div className="block lg:hidden">
            <StatGroup stats={[
              { label: "24h trading volume", number: loading ? "--" : stats.volume24h},
              { label: "Total traders", number: loading ? "--" : stats.totalTraders },
              { label: "Live builders", number: loading ? "--" : stats.totalBuilders }
            ]} />
          </div>
          <div className="hidden lg:block">
            <StatGroup stats={[
              { label: "Total traders", number: loading ? "--" : stats.totalTraders },
              { label: "Live builders", number: loading ? "--" : stats.totalBuilders }
            ]} />
          </div>
        </div>
      </div>
    </Content>
  );
};

export default TradingStats;
