import React from "react";
import type { SvgIconProps } from "src/types";

const TwitterIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.2174 2.20898H14.4663L9.55298 7.82465L15.3332 15.4663H10.8073L7.26253 10.8317L3.20647 15.4663H0.956125L6.21146 9.45971L0.666504 2.20898H5.30724L8.51143 6.44521L12.2174 2.20898ZM11.428 14.1202H12.6742L4.6301 3.48441H3.29281L11.428 14.1202Z"
        // fill="white"
        fillOpacity="0.54"
      />
    </svg>
  );
};

export default TwitterIcon;
