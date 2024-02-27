import React, { useEffect, useMemo, useRef } from "react";
import CloseIcon from "@/icons/CloseIcon";
import { useStore } from "@nanostores/react";
import { bannerVisible, bannerHeight } from "@/store";
import { useSize } from "@/hooks/useSize";
import ArrowForwardIcon from "@/icons/ArrowForwardIcon";

interface BannerProps {}

const Banner: React.FC<BannerProps> = (props) => {
  const { width } = useSize();
  const visible = useStore(bannerVisible);
  const ref = useRef<HTMLDivElement>(null);

  const data = useMemo(
    () => ({
      title: "Earn 2x rewards on Orderly & LogX campaign!",
      url: "https://galxe.com/orderlynetwork/campaign/GCY29twLYB",
    }),
    []
  );

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
      className="relative flex justify-between items-center px-[24px] py-[16px] text-base [background:linear-gradient(270.23deg,#34D4DE_0.04%,#6473FF_50.25%,#AD2BFE_99.64%)] z-10"
      ref={ref}
    >
      <div className="flex flex-1 items-center flex-wrap leading-[24px] md:justify-center">
        {/* TODO: 第二行文字左对齐 */}
        <span className="text-white font-semibold pr-[12px]">{data.title}</span>
        <a
          href={data.url}
          target="_blank"
          className="inline-flex items-center text-[#8AEFF5] font-bold text-sm"
        >
          <div>GET STARTED</div>
          <ArrowForwardIcon />
        </a>
      </div>

      <CloseIcon
        className="cursor-pointer text-white"
        onClick={() => {
          bannerVisible.set(false);
          bannerHeight.set(0);
        }}
      />
    </div>
  );
};

export default React.memo(Banner);
