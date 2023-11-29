import Button from "@/components/Button";
import { cn } from "@/utils";
import React from "react";

interface GetStartProps {}
const GetStart: React.FC<GetStartProps> = (props) => {
  return (
    <div className="text-center">
      <div
        className={cn(
          /** 375 */
          "text-[22px] leading-[26px]",
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
