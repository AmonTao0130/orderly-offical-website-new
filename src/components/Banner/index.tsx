import React, { useEffect, useRef, forwardRef } from "react";
import CloseIcon from "@/icons/CloseIcon";
import { useStore } from "@nanostores/react";
import { bannerVisible, bannerHeight } from "@/store";
import { useSize } from "@/hooks/useSize";
import ArrowForwardIcon from "@/icons/ArrowForwardIcon";
import { cn } from "@/utils";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { PropsWithClassName } from "@/types";
import { Hyperlink } from "@/utils/constant";

type Banner = {
  title: string;
  url: string;
  moreText: string;
};

const banners: Banner[] = [
  // {
  //   title: "Orderly's NEAR instance winds down on Sept. 18.",
  //   url: "https://app.orderly.network/near",
  //   moreText: "WITHDRAW ASSETS",
  // },
  // {
  //   title: "$ORDER claiming and staking are now LIVE.",
  //   url: "https://airdrop.orderly.network",
  //   moreText: "CLAIM NOW",
  // },
  {
    title: "Get your token listed on Orderly!",
    url: Hyperlink.Ecosystem.ListingApplication,
    moreText: "APPLY NOW",
  },
];

const BannerText = forwardRef<HTMLDivElement, Banner & PropsWithClassName>(
  (props, ref) => {
    const { title, url, moreText, className } = props;
    return (
      <div
        key={title}
        style={{
          transform: "translate3d(0, 0, 0)",
        }}
        className={cn(
          "flex-[0_0_100%] min-h-0 w-full py-[16px]",
          "flex flex-col justify-center items-start",
          "md:flex-row md:items-center",
          className
        )}
        ref={ref}
      >
        {/* TODO: 第二行文字左对齐 */}
        <span
          className={cn(
            "text-white font-medium text-base leading-[24px]",
            "md:pr-[12px]"
          )}
        >
          {title}
        </span>
        <a
          href={url}
          target="_blank"
          className={cn(
            "inline-flex",
            "items-center text-[#8AEFF5] font-semibold text-sm leading-[32px]"
          )}
        >
          <div>{moreText}</div>
          <ArrowForwardIcon />
        </a>
      </div>
    );
  }
);

const Banner: React.FC = () => {
  const { width } = useSize();
  const visible = useStore(bannerVisible);
  const height = useStore(bannerHeight);
  const ref = useRef<HTMLDivElement>(null);

  const [emblaRef] = useEmblaCarousel(
    {
      axis: "y",
      loop: true,
      duration: 25,
      slidesToScroll: "auto",
    },
    [Autoplay({ playOnInit: true, delay: 4500 })]
  );

  // 当窗口大小变化时，计算 Banner 的高度
  useEffect(() => {
    const { height } = ref.current?.getBoundingClientRect() || {};
    bannerHeight.set(height! || 0);
  }, [width]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative flex items-center z-10 gap-x-[16px] px-[24px] text-base",
        "[background:linear-gradient(270.23deg,#34D4DE_0.04%,#6473FF_50.25%,#AD2BFE_99.64%)]"
      )}
    >
      <div className="relative flex-1">
        <div className="overflow-hidden flex-1" ref={emblaRef}>
          <div className="flex flex-col" style={{ height }}>
            {banners.map((item) => (
              <BannerText key={item.title} {...item} />
            ))}
          </div>
        </div>

        <BannerText
          ref={ref}
          className={cn(height && "absolute invisible")}
          {...banners[0]}
        />
      </div>

      <CloseIcon
        className="w-[24px] h-[24px] cursor-pointer text-white z-[1]"
        onClick={() => {
          bannerVisible.set(false);
          bannerHeight.set(0);
        }}
      />
    </div>
  );
};

export default React.memo(Banner);
