import BlockTitle from "@/components/BlockTitle";
import Content from "@/components/Content";
import { cn } from "@/utils";
import React from "react";

interface IntegrateSDKProps {}
const IntegrateSDK: React.FC<IntegrateSDKProps> = (props) => {
  return (
    <Content>
      <BlockTitle>Integrate with Orderly SDK</BlockTitle>
      <div
        className={cn(
          /** 375 */
          "flex felx-col flex-col-reverse justify-center",
          /** 768 */
          "md:flex-col md:justify-between"
        )}
      >
        <div
          className={cn(
            /** 375 */
            "mt-[45px]",
            /** 768 */
            "md:mt-[78px]",
            /** 1024 */
            "lg:mt-[87px]",
            /** 1440 */
            "xl:mt-[61px]"
          )}
        >
          <div
            className={cn(
              /** 375 */
              "text-primary text-xl leading-[24px] text-center mt-[61px]",
              /** 768 */
              "md:text-left md:mt-0",
              /** 1024 */
              "lg:text-[26px] lg:leading-[34px]",
              /** 1440 */
              "xl:text-4xl xl:leading-[56px]"
            )}
          >
            Build independent UI <br /> components and pages
          </div>
          <div
            className={cn(
              "text-primary-80 mt-[12px]",
              /** 375 */
              "text-sm leading-[21px] text-center",
              /** 768 */
              "md:w-[300px] md:text-base md:leading-[24px] md:text-left",
              /** 1024 */
              "lg:w-[365px] lg:text-xl lg:leading-[30px]",
              /** 1440 */
              "xl:w-[534px]"
            )}
          >
            Implement components and pages without <br className="md:hidden" />{" "}
            needing to fuss with data, APIs, or business logic.
          </div>
        </div>
      </div>
    </Content>
  );
};

export default IntegrateSDK;
