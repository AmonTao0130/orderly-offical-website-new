import React from "react";
import type { SvgIconProps } from "src/types";

/** 这个图标有问题，需要让设计重新导出 */
const ArrowDownIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      // 这里改为currentColor会有问题
      // fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.12183 4.375L6.01091 8.26409C6.01091 8.26409 8.7264 5.54861 9.9 4.375"
        stroke="white"
        strokeOpacity="0.8"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default ArrowDownIcon;
