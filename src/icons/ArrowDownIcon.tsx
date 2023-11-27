import React from "react";
import type { SvgIconProps } from "src/types";

/** 这个图标有问题，需要让设计重新导出 */
const ArrowDownIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.59155 4.90527L2.65221 3.84461L6.01097 7.20337L9.36973 3.84461L10.4304 4.90527L6.54158 8.79408L6.01097 9.32469L1.59155 4.90527Z"
        // fill="white"
        // fillOpacity="0.8"
      />
    </svg>
  );
};

export default ArrowDownIcon;
