import React from "react";
import Footer from "./imgs/Footer.svg";
import { cn } from "@/utils";

const FooterGradient: React.FC = (props) => {
  return (
    <>
      <img
        className={cn(
          "absolute mix-blend-screen",
          /** 375 */
          "w-[961px] right-[-50px] bottom-[0px]",
          /** 768 */
          "md:w-[961px] md:right-[-150px] md:bottom-[0px]",
          /** 1024 */
          "lg:w-[961px] lg:right-[-150px] lg:bottom-[0px]",
          /** 1440 */
          "xl:w-[961px] xl:right-[-100px] xl:bottom-[0px]",
          /** 1920 */
          "2xl:w-[961px] 2xl:right-[-100px] 2xl:bottom-[0px]"
        )}
        src={Footer.src}
        alt="orderly-network-ecosystem-footer-background"
      />
    </>
  );
};

export default FooterGradient;
