import React from "react";
import type { SvgIconProps } from "src/types";

const ArrowDownIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_2191_6139"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="25"
      >
        <rect y="0.939575" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2191_6139)">
        <path
          d="M12.0001 15.6415L6.69238 10.3338L7.40008 9.6261L12.0001 14.2261L16.6001 9.6261L17.3078 10.3338L12.0001 15.6415Z"
          // fill="white"
          fillOpacity="0.8"
        />
      </g>
    </svg>
  );
};

export default ArrowDownIcon;
