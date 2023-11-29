import React from "react";
import Content from "@/components/Content";
import Button from "@/components/Button";
import { cn } from "@/utils";
import NumberLabel from "./Number";
import type { PropsWithClassName } from "@/types";

const ExploreEcosystem: React.FC<PropsWithClassName> = (props) => {
  return (
    <Content className={props.className}>
      <div className="flex flex-col justify-between lg:flex-row">
        <div
          className={cn(
            "flex",
            /** 375 */
            "flex-col",
            /** 768 */
            "md:flex-row md:justify-between",
            /** 1024 */
            "lg:flex-col lg:justify-start"
          )}
        >
          <div>
            <div
              className={cn(
                "text-primary",
                /** 375 */
                "text-2xl leading-[28.8px]",
                /** 768 */
                "md:text-4xl md:leading-[48px]",
                /** 1024 */
                "lg:text-5xl lg:leading-[72px]"
              )}
            >
              Explore Orderly’s <br /> vibrant ecosystem
            </div>
            <div
              className={cn(
                "text-primary-80",
                /** 375 */
                "w-[335px] text-sm leading-[21px] mt-[16px]",
                /** 768 */
                "md:w-[393px] md:text-base md:leading-[24px] md:mt-[12px]",
                /** 1024 */
                "lg:w-[520px]"
              )}
            >
              Iaculis eu non diam phasellus vestibulum lorem. Consequat ac felis
              donec et odio pellentesque diam volutpat commodo.
            </div>
          </div>
          {/* 这里加一层 div，button才不会填充整行 */}
          <div>
            <Button
              type="outlined"
              className={cn(
                /** 375 */
                "mt-[16px]",
                /** 1024 */
                "md:mt-[24px]"
              )}
            >
              View more
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "flex",
            /** 375 */
            "flex-row mt-[88px]",
            /** 768 */
            "mt-[120px]",
            /** 1024 */
            "lg:flex-col lg:mt-0"
          )}
        >
          <NumberLabel label="Total trading volume" number="$256M+" />
          <NumberLabel
            label="Total value locked"
            number="$256M+"
            className={cn(
              /** 375 */
              "ml-[43px]",
              /** 768 */
              "ml-[107px]",
              /** 1024 */
              "lg:ml-0 lg:mt-[23px]",
              /** 1440 */
              "xl:mt-[8px]",
              /** 1920 */
              "2xl:mt-[17px]"
            )}
          />
        </div>
      </div>
    </Content>
  );
};

export default ExploreEcosystem;
