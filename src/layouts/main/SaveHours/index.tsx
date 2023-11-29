import React from "react";
import Content from "@/components/Content";
import HoursSvg from "./200.svg";
import { cn } from "@/utils";

interface SaveHoursProps {}
const SaveHours: React.FC<SaveHoursProps> = (props) => {
  return (
    <Content>
      <div
        className={cn(
          "relative flex flex-col mx-auto",
          /** 375 */
          "w-[335px] h-[146px]",
          /** 768 */
          "md:w-[688px] md:h-[300px]",
          /** 1024 */
          "lg:w-[904px] lg:h-[394px]",
          /** 1440 */
          "xl:w-[1060px] xl:h-[462px]"
        )}
      >
        <img
          className="drop-shadow-[0px_0px_50px_rgba(108,25,244,0.5)]"
          src={HoursSvg.src}
        />
        <div
          style={{
            background:
              "linear-gradient(87.18deg, #FFFFFF 1.27%, #D196FF 108.54%)",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            WebkitBackgroundClip: "text",
          }}
          className={cn(
            " w-full h-full flex justify-center items-center text-center",
            "text-5xl leading-[67.2px] ",
            /** 375 */
            "text-[22px] leading-[26.4px] mt-[11.7px]",
            /** 768 */
            "md:absolute md:text-4xl md:leading-[48px] md:mt-0",
            /** 1024 */
            "lg:leading-[57.6px]",
            /** 1440 */
            "xl:text-5xl xl:leading-[67.2px]"
          )}
        >
          Orderly saves teams over <br />
          200 hours on each integration.
        </div>
      </div>
    </Content>
  );
};

export default SaveHours;
