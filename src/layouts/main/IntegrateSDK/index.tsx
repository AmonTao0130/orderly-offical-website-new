import React from "react";
import BlockTitle from "@/components/BlockTitle";
import Content from "@/components/Content";
import { cn } from "@/utils";
import type { PropsWithClassName } from "@/types";
import SDKImage from "./SDKImage";
import SDKText from "./SDKText";

const IntegrateSDK: React.FC<PropsWithClassName> = (props) => {
  return (
    <Content id="IntegrateSDK" className={props.className}>
      <BlockTitle>Integrate with Orderly SDK</BlockTitle>
      {/* <div id="IntegrateSDKTrigger" className="absolute top-[300px]">
        Trigger
      </div> */}
      <div
        className={cn(
          /** 375 */
          "flex felx-col flex-col-reverse mt-[85px]",
          /** 768 */
          "md:flex-row md:justify-between md:mt-[78px]",
          /** 1024 */
          "lg:mt-[87px]",
          /** 1440 */
          "xl:mt-[120px]"
        )}
      >
        <div className="relative">
          <SDKText
            order="first"
            id="IntegrateSDKText"
            title={
              <>
                Build independent UI <br /> components and pages
              </>
            }
            content={
              <>
                Implement components and pages <br className="md:hidden" />{" "}
                without
                <br className="sm:hidden md:hidden" /> needing to fuss with
                data, APIs, <br className="md:hidden" /> or business logic.
              </>
            }
          />

          <SDKText
            order="first"
            id="IntegrateSDKText2"
            className="absolute bottom-0 opacity-0"
            title={
              <>
                Build independent UI <br /> components and pages
              </>
            }
            content={
              <>
                Implement components and pages <br className="md:hidden" />{" "}
                without
                <br className="sm:hidden md:hidden" /> needing to fuss with
                data, APIs, <br className="md:hidden" /> or business logic.
              </>
            }
          />
        </div>

        <div className="relative">
          <SDKImage id="IntegrateSDKImage1" order="first" className="" />
          <div id="IntegrateSDKImage2" className="absolute top-0 left-0">
            <SDKImage order="second" />
          </div>
        </div>
      </div>
    </Content>
  );
};

export default IntegrateSDK;
