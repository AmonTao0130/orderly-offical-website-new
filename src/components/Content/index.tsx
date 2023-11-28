import React, { type PropsWithChildren } from "react";
import { cn } from "../../utils";

interface ContentProps {
  className?: string;
}

const Content: React.FC<ContentProps & PropsWithChildren> = (props) => {
  return (
    <div
      className={cn(
        "mx-auto ",
        /** 375 w-[335px] 手机端px-[20px] */
        "w-[calc(100%_-_40px)]",
        /** 768 */
        "md:w-[688px] ",
        /** 1024 */
        "lg:w-[904px]",
        /** 1440 */
        "xl:w-[1280px]",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default Content;
