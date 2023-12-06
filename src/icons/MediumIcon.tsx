import React from "react";
import type { SvgIconProps } from "src/types";

const MediumIcon: React.FC<SvgIconProps> = (props) => {
  const { size = 16, ...rest } = props;

  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 16 17"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g clipPath="url(#clip0_2191_6106)">
        <path
          d="M16 8.82492C16 10.9445 15.6448 12.6638 15.2065 12.6638C14.7682 12.6638 14.4131 10.9449 14.4131 8.82492C14.4131 6.70491 14.7683 4.98608 15.2065 4.98608C15.6446 4.98608 16 6.70476 16 8.82492Z"
          // fill="white"
          // fillOpacity="0.54"
        />
        <path
          d="M13.975 8.82472C13.975 11.1909 12.9648 13.1099 11.7187 13.1099C10.4726 13.1099 9.4624 11.1909 9.4624 8.82472C9.4624 6.45851 10.4724 4.53955 11.7185 4.53955C12.9646 4.53955 13.9748 6.45789 13.9748 8.82472"
          // fill="white"
          // fillOpacity="0.54"
        />
        <path
          d="M9.02496 8.82475C9.02496 11.3386 7.00463 13.3764 4.51256 13.3764C2.02049 13.3764 0 11.3381 0 8.82475C0 6.3114 2.02033 4.27295 4.51256 4.27295C7.00478 4.27295 9.02496 6.31094 9.02496 8.82475Z"
          // fill="white"
          // fillOpacity="0.54"
        />
      </g>
      <defs>
        <clipPath id="clip0_2191_6106">
          <rect
            width="16"
            height="16"
            // fill="white"
            transform="translate(0 0.939697)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default MediumIcon;
