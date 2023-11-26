import React from "react";
import type { SvgIconProps } from "src/types";

const CollapseIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_1975_93249"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="32"
        height="32"
      >
        <rect width="32" height="32" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1975_93249)">
        <path
          d="M4.66675 23.5128V21.5128H27.3334V23.5128H4.66675ZM4.66675 16.9999V15H27.3334V16.9999H4.66675ZM4.66675 10.4871V8.48718H27.3334V10.4871H4.66675Z"
          // fill="white"
        />
      </g>
    </svg>
  );
};

export default CollapseIcon;
