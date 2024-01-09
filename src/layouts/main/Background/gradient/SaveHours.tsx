import React from "react";
import SaveHoursLeft from "../imgs/gradient/SaveHoursLeft.svg";
import SaveHoursRight from "../imgs/gradient/SaveHoursRight.svg";
import { cn } from "@/utils";

const SaveHoursGradient: React.FC = (props) => {
  return (
    <>
      <img
        className={cn(
          "absolute",
          /** 375 */
          "w-[300px] left-[-30px] top-[-250px]",
          /** 768 */
          "md:w-[465px] md:left-[-50px] md:top-[-400px]",
          /** 1024 */
          "lg:w-[653px] lg:left-[-50px] lg:top-[-600px]",
          /** 1440 */
          "xl:w-[913px] xl:left-[-100px] xl:top-[-700px]"
        )}
        src={SaveHoursLeft.src}
        alt="orderly-network-main-save-hours-left-background"
      />
      <img
        className={cn(
          "absolute",
          /** 375 */
          "w-[300px] right-[-50px] top-[-200px]",
          /** 768 */
          "md:w-[465px] md:right-[-50px] md:top-[-300px]",
          /** 1024 */
          "lg:w-[649px] lg:right-[-50px] lg:top-[-400px]",
          /** 1440 */
          "xl:w-[909px] xl:right-[-50px] xl:top-[-600px]"
        )}
        src={SaveHoursRight.src}
        alt="orderly-network-main-save-hours-right-background"
      />
    </>
  );
};

export default SaveHoursGradient;
