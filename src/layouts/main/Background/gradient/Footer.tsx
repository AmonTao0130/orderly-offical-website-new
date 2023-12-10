import React from "react";
import FooterLeft from "../imgs/gradient/FooterLeft.svg";
import FooterRight from "../imgs/gradient/FooterRight.svg";
import { cn } from "@/utils";

const FooterGradient: React.FC = (props) => {
  return (
    <>
      <img
        className={cn(
          "absolute",
          /** 375 */
          "w-[400px] left-[-150px] bottom-[350px]",
          /** 768 */
          "md:w-[565px] md:left-[-150px] md:bottom-[100px]",
          /** 1024 */
          "lg:w-[733px] lg:left-[-150px] lg:bottom-[100px]",
          /** 1440 */
          "xl:w-[989px] xl:left-[-200px] xl:bottom-[-200px]"
        )}
        src={FooterLeft.src}
      />
      <img
        className={cn(
          "absolute",
          /** 375 */
          "w-[293px] right-[0px] bottom-[0px]",
          /** 768 */
          "md:w-[465px] md:right-[-30px] md:bottom-[0px]",
          /** 1024 */
          "lg:w-[602px] lg:right-[-50px] lg:bottom-[0px]",
          /** 1440 */
          "xl:w-[989px] xl:right-[-150px] xl:bottom-[0px]"
        )}
        src={FooterRight.src}
      />
    </>
  );
};

export default FooterGradient;
