import React from "react";

interface ArrowIconProps {
  className?: string;
}

const ArrowIcon: React.FC<ArrowIconProps> = (props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <mask
        id="mask0_2191_7528"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2191_7528)">
        <path d="M4.04995 12L3.19995 11.15L9.94995 4.4H3.99995V3.2H12V11.2H10.8V5.25L4.04995 12Z" />
      </g>
    </svg>
  );
};

export default ArrowIcon;
