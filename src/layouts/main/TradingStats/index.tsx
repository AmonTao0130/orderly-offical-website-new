import React from "react";
import type { PropsWithClassName } from "@/types";
import { cn } from "@/utils";

const bgStyle: React.CSSProperties = {
  backgroundImage: `linear-gradient(0deg, rgba(47, 0, 146, 0.20) 18.85%, rgba(206, 125, 255, 0.50) 62.55%, rgba(47, 0, 146, 0.20) 100%);`,
};

const TradingStats: React.FC<PropsWithClassName> = (props) => {
  return (
    <div
      className={cn("flex justify-center items-start gap-12", props.className)}
    >
      <div className="flex flex-col gap-6">
        <div className="text-white text-xl font-normal">
          Total trading volum
        </div>
        <div className="font-bold text-[80px] capitalize">$115.42B+</div>
      </div>
      <div className="w-px h-[190px]" style={bgStyle} />
      <div className={cn("flex flex-col gap-12")}>
        <div className="flex flex-col gap-6">
          <div className="text-white text-xl font-normal">Open interest</div>
          <div className="font-semibold text-[48px] capitalize">$8.37B+</div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="text-white text-xl font-normal">TVL</div>
          <div className="font-semibold text-[48px] capitalize">$5.92B+</div>
        </div>
      </div>
      <div className="w-px h-[190px]" style={bgStyle} />
      <div className={cn("flex flex-col gap-12")}>
        <div className="flex flex-col gap-6">
          <div className="text-white text-xl font-normal">Total traders</div>
          <div className="font-semibold text-[48px] capitalize">400k+</div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="text-white text-xl font-normal">Total builders</div>
          <div className="font-semibold text-[48px] capitalize">12K+</div>
        </div>
      </div>
    </div>
  );
};

export default TradingStats;
