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
    <div className={cn("flex flex-col gap-12")}>
      {stats.map((stat, index) => (
        <NumberLabel key={index} {...stat} />
      ))}
    </div>
  );
};

const Divider: React.FC = () => {
  return (
    <div
      className="w-0 h-[189px]"
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
          "gap-12",
          "rounded-[24px]",
          "p-[48px]",
          "relative"
        )}
        style={containerStyle}
      >
        <div 
          className="absolute inset-0 rounded-[24px] p-px"
          style={borderStyle}
        />
        <StatGroup stats={[
          { label: "Total trading volume", number: loading ? "--" : stats.totalVolume, isLarge: true }
        ]} />
        <Divider />
        <StatGroup stats={[
          { label: "Open interest", number: loading ? "--" : stats.openInterest },
          { label: "TVL", number: loading ? "--" : stats.tvl }
        ]} />
        <Divider />
        <StatGroup stats={[
          { label: "Total traders", number: loading ? "--" : stats.totalTraders },
          { label: "Total builders", number: loading ? "--" : stats.totalBuilders }
        ]} />
      </div>
    </Content>
  );
};

export default TradingStats;
