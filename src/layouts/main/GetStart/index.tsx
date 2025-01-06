import React from "react";
import Button from "@/components/Button";
import type { PropsWithClassName } from "@/types";
import { cn } from "@/utils";
import { Hyperlink } from "@/utils/constant";

const GetStart: React.FC<PropsWithClassName> = (props) => {
  return (
    <div className={cn("text-center", props.className)}>
      <div
        className={cn(
          /** 375 */
          "font-display font-bold text-[22px] leading-[26px]",
          /** 768 */
          "md:text-4xl leading-[48px]",
          /** 1024 */
          "lg:text-[48px] leading-[57px]",
          /** 1440 */
          "lg:text-6xl leading-[76px]"
        )}
      >
        Get started with Orderly
      </div>
      <Button
        href={Hyperlink.Main.DropUsALine}
        className={cn(
          /** 375 */
          "mt-[16px]",
          /** 1440 */
          "xl:mt-[24px]"
        )}
      >
        Drop us a line
      </Button>
    </div>
  );
};

export default GetStart;
