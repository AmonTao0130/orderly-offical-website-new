import React from "react";
import IntegrateSDK from "../imgs/gradient/IntegrateSDK.svg";
import { cn } from "@/utils";

const IntegrateSDKGradient: React.FC = (props) => {
  return (
    <>
      <img
        className={cn(
          "absolute",
          /** 375 */
          "w-[378px] h-[568px] left-[-150px] top-[-250px]",
          /** 768 */
          "md:w-[453px] md:h-[681px] md:left-[-50px] md:top-[-200px]",
          /** 1024 */
          "lg:w-[604px] lg:h-[908px] lg:left-[-150px] lg:top-[-200px]",
          /** 1440 */
          "xl:w-[756px] xl:h-[1136px] xl:left-[-100px] xl:top-[-250px]",
          /** 1920 */
          "2xl:w-[756px] 2xl:h-[1136px] 2xl:left-[-50px] 2xl:top-[-250px]"
        )}
        src={IntegrateSDK.src}
      />
    </>
  );
};

export default IntegrateSDKGradient;
