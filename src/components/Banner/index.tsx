import React, { useEffect, useRef } from "react";
import CloseIcon from "@/icons/CloseIcon";
import { useStore } from "@nanostores/react";
import { bannerVisible, bannerHeight } from "@/store";
import { useSize } from "@/hooks/useSize";
import ArrowForwardIcon from "@/icons/ArrowForwardIcon";
import { cn } from "@/utils";

interface BannerProps {}

const bannerData = [
  {
    title: "Earn Underwater NFTs on Orderly & WOOFi campaign!",
    url: "https://galxe.com/orderlynetwork/campaign/GCcdEt4UAm",
    moreText: "GET STARTED",
  },
  {
    title: "Check token eligibility for Orderly Network early supporters",
    url: "https://app.orderly.network/",
    moreText: "LEARN MORE",
  },
  // {
  //   title: "Earn 100k $LOGX and NFTs on Orderly & LogX campaign!",
  //   url: "https://galxe.com/orderlynetwork/campaign/GCYnAt4USf",
  //   moreText: "GET STARTED",
  // },
];

const Banner: React.FC<BannerProps> = (props) => {
  const { width } = useSize();
  const visible = useStore(bannerVisible);
  const ref = useRef<HTMLDivElement>(null);

  // 当窗口大小变化时，计算Banner的高度
  useEffect(() => {
    const height = ref.current?.getBoundingClientRect()?.height;
    bannerHeight.set(height! || 0);
  }, [width]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="relative flex justify-between items-center px-[24px] py-[16px] text-base [background:linear-gradient(270.23deg,#34D4DE_0.04%,#6473FF_50.25%,#AD2BFE_99.64%)] z-10  overflow-hidden"
      ref={ref}
    >
      <div className="flex flex-col justify-center items-center w-full">
        {bannerData.map((item, index) => {
          return (
            <div
              className={cn(
                "flex items-center flex-wrap md:justify-center",
                "transition-all",
                index === 0
                  ? "animate-bannerOut opacity-0"
                  : "animate-bannerIn opacity-0 absolute left-[24px] right-[24px]"
              )}
            >
              {/* TODO: 第二行文字左对齐 */}
              <span className="text-white font-semibold pr-[12px] text-base leading-[24px]">
                {item.title}
              </span>
              <a
                href={item.url}
                target="_blank"
                className="inline-flex items-center text-[#8AEFF5] font-bold text-sm leading-[32px]"
              >
                <div>{item.moreText}</div>
                <ArrowForwardIcon />
              </a>
            </div>
          );
        })}
      </div>

      <CloseIcon
        className="cursor-pointer text-white z-[1]"
        onClick={() => {
          bannerVisible.set(false);
          bannerHeight.set(0);
        }}
      />
    </div>
  );
};

export default React.memo(Banner);
