import React from "react";
import type { SvgIconProps } from "src/types";

const ArrowForwardIcon: React.FC<SvgIconProps> = (props) => {
  const { size = 18, ...rest } = props;
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 18 18"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <mask
        id="mask0_4004_7203"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="18"
        height="18"
      >
        <rect width="18" height="18" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_4004_7203)">
        <path
          d="M11.8125 9.67501H3.59998V8.32501H11.8125L8.04373 4.55626L8.99998 3.60001L14.4 9.00001L8.99998 14.4L8.04373 13.4438L11.8125 9.67501Z"
          // fill="#8AEFF5"
        />
      </g>
    </svg>
  );
};

export default ArrowForwardIcon;
