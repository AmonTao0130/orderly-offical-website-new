import React from "react";
import type { SvgIconProps } from "src/types";

const IndicatorIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      width="199"
      height="36"
      viewBox="0 0 199 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.969849"
        width="198"
        height="34"
        rx="17"
        stroke="url(#paint1_linear_2191_6198)"
      />

      <defs>
        <linearGradient
          id="paint1_linear_2191_6198"
          x1="16.2505"
          y1="-3.22665"
          x2="31.2846"
          y2="38.8469"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#20BB8C" />
          <stop stopColor="#42FFDD" offset="1" stopOpacity="0.05" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default IndicatorIcon;
