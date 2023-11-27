import React from "react";
import { cn } from "@/utils/index";

interface NewLabelProps {
  className?: string;
}

const NewLabel: React.FC<NewLabelProps> = (props) => {
  return (
    <div
      className={cn(
        "flex justify-center items-center w-[32px] h-[15px] rounded-full text-[10px] [background:linear-gradient(270.23deg,#48BDFF_0.04%,#786CFF_47.76%,#BD00FF_99.64%),rgba(255,255,255,0.98)]",
        props.className
      )}
    >
      NEW
    </div>
  );
};

export default NewLabel;
