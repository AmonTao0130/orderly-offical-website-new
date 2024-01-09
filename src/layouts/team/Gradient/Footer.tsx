import React from "react";
import Footer from "./imgs/Footer.svg";
import { cn } from "@/utils";

const FooterGradient: React.FC = (props) => {
  return (
    <>
      <img
        className={cn(
          "absolute",
          /** 375 */
          "w-[961px] right-[-30px] bottom-[-80px]",
          /** 768 */
          "md:w-[961px] md:right-[-100px] md:bottom-[-100px]",
          /** 1024 */
          "lg:w-[961px] lg:right-[-100px] lg:bottom-[-100px]",
          /** 1440 */
          "xl:w-[961px] xl:right-[0px] xl:bottom-[-100px]",
          /** 1920 */
          "2xl:w-[961px] 2xl:right-[0px] 2xl:bottom-[0px]"
        )}
        src={Footer.src}
        alt="orderly-network-team-footer-background"
      />
    </>
  );
};

export default FooterGradient;
