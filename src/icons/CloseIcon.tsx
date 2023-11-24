import React from "react";
import type { SvgIconProps } from "src/types";

const CloseIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_1797_9748"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1797_9748)">
        <path
          d="M8.4 17L7 15.6L10.6 12L7 8.42499L8.4 7.02499L12 10.625L15.575 7.02499L16.975 8.42499L13.375 12L16.975 15.6L15.575 17L12 13.4L8.4 17Z"
          // fill="white"
        />
      </g>
    </svg>
  );
};

export default CloseIcon;
