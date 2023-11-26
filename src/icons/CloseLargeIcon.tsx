import React from "react";
import type { SvgIconProps } from "src/types";

const CloseLargeIcon: React.FC<SvgIconProps> = (props) => {
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
        id="mask0_1975_92762"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="32"
        height="32"
      >
        <rect width="32" height="32" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1975_92762)">
        <path
          d="M8.53327 24.8717L7.12817 23.4666L14.5948 15.9999L7.12817 8.53327L8.53327 7.12817L15.9999 14.5948L23.4666 7.12817L24.8717 8.53327L17.405 15.9999L24.8717 23.4666L23.4666 24.8717L15.9999 17.405L8.53327 24.8717Z"
          // fill="white"
        />
      </g>
    </svg>
  );
};

export default CloseLargeIcon;
