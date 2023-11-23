import React, { useMemo, useState } from "react";
import CloseIcon from "./CloseIcon";
import LearnMore from "./LearnMore";

interface BannerProps {}

const Banner: React.FC<BannerProps> = (props) => {
  const [visible, setVisible] = useState(true);
  const data = useMemo(
    () => ({
      title: "Orderly Ambassador Program",
      url: "https://medium.com/@orderlynetwork/introducing-the-orderly-network-ambassador-program-7f05e291e2f2",
    }),
    []
  );

  if (!visible) {
    return null;
  }

  return (
    <div
      style={{
        background:
          "linear-gradient(270.23deg, #34D4DE 0.04%, #6473FF 50.25%, #AD2BFE 99.64%)",
      }}
      className="flex justify-between items-center px-[24px] py-[16px] text-[16px]"
    >
      <div className="flex flex-1 justify-center flex-wrap leading-[24px]">
        {/* TODO: 第二行文字左对齐 */}
        <span className="text-white font-semibold pr-[8px]">{data.title}</span>
        <LearnMore url={data.url} />
      </div>

      <CloseIcon
        onClick={() => {
          setVisible(!visible);
        }}
      />
    </div>
  );
};

export default React.memo(Banner);
