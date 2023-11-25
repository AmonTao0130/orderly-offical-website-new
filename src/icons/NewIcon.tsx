import React from "react";
import type { SvgIconProps } from "src/types";

const NewIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      width="32"
      height="16"
      viewBox="0 0 32 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        y="0.439453"
        width="32"
        height="15"
        rx="7.5"
        fill="white"
        fillOpacity="0.98"
      />
      <rect
        y="0.439453"
        width="32"
        height="15"
        rx="7.5"
        fill="url(#paint0_linear_2191_6260)"
      />
      <path
        d="M4.7 11.4395V4.23945H6.08L9.21 9.03945V4.23945H10.59V11.4395H9.21L6.08 6.63945V11.4395H4.7ZM11.9852 11.4395V4.23945H16.6852V5.50945H13.3452V7.04945H16.0852V8.31945H13.3452V10.1695H16.6852V11.4395H11.9852ZM19.3936 11.4395L17.2836 4.23945H18.7136L20.0636 9.18945L21.4136 4.24945L22.8436 4.23945L24.1936 9.18945L25.5436 4.23945H26.9736L24.8636 11.4395H23.5236L22.1286 6.57945L20.7336 11.4395H19.3936Z"
        fill="white"
        fillOpacity="0.8"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2191_6260"
          x1="32"
          y1="13.9811"
          x2="0.00236468"
          y2="13.706"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#48BDFF" />
          <stop offset="0.479167" stopColor="#786CFF" />
          <stop offset="1" stopColor="#BD00FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default NewIcon;
