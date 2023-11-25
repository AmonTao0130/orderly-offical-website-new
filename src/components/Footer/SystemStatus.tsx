import React from "react";
import { cn } from "@utils/index";
import { cx, cva, type VariantProps } from "class-variance-authority";

interface SystemStatusProps {
  isMaintenance: boolean;
}

// const variants = cva(
//   [
//     "inline-flex justify-center items-center text-white font-bold text-sm lg:text-base px-[20px] lg:px-[24px] h-[40px] lg:h-[52px] rounded-full cursor-pointer",
//   ],
//   {
//     variants: {
//       isMaintenance: {
//         primary: [
//           "[background:linear-gradient(270.23deg,#48BDFF_0.04%,#786CFF_47.76%,#BD00FF_99.64%),rgba(255,255,255,0.98)]",
//           "hover:[background:linear-gradient(270.23deg,#B008FF_0.04%,#F041C3_49.84%,#FFB672_99.64%),_rgba(255,255,255,0.98)]",
//         ],
//         secondary: ["bg-white/[0.08]", "hover:bg-white/[0.3]"],
//         outlined: [
//           "border-[1px]",
//           "border-solid",
//           "border-white/[0.8]",
//           "hover:bg-white",
//           "hover:text-black",
//         ],
//       },
//     },
//   }
// );

/**
 * 状态指示连这个api: https://docs-api-evm.orderly.network/?shell#restful-api-public-system-maintenance-status
 * 维护中的时候不用动画，就纯静态就好
 */
const SystemStatus: React.FC<SystemStatusProps> = (props) => {
  const { isMaintenance } = props;
  const statusText = isMaintenance
    ? "System under maintenance."
    : "All systems operational.";

  return (
    <div
      className={cn(
        "inline-flex items-center h-[35px] px-[12px] text-white text-sm font-semibold rounded-full",
        isMaintenance
          ? "bg-[rgb(209,150,255,0.06)]"
          : cx(
              "[background:linear-gradient(90deg,rgba(51,243,255,0.06)_-2.56%,rgba(0,220,154,0.06)_100%)]",
              "border-[1px] border-solid [border-image:linear-gradient(116.21deg,#20BB8C_1.99%,rgba(66,255,221,0.05)_46.7%)]"
            )
      )}
    >
      <div
        className={cn(
          "w-[6px] h-[6px] mr-[6px] rounded-full",
          isMaintenance ? "bg-[#D196FF]" : "bg-[#24AD8F]"
        )}
      />
      <div>{statusText}</div>
    </div>
  );
};

export default SystemStatus;
