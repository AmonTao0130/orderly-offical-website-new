import React, { useMemo } from "react";
import { cn } from "@/utils";

interface ScrollIndicatorProps {
  scrollIndex: number;
  total: number;
  scrollTo?: (index: number, jump?: boolean) => void;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = (props) => {
  const { scrollIndex } = props;

  const list = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= props.total; i++) {
      arr.push(i);
    }
    return arr;
  }, [props.total]);

  return (
    <div className="flex justify-center mt-[20px] gap-x-[8px]">
      {list.map((item, index) => (
        <div
          className={cn(
            "flex justify-center items-center",
            "h-[16px] w-[16px]"
          )}
          onClick={() => {
            props.scrollTo?.(index);
          }}
          key={index}
        >
          <div
            key={item}
            className={cn(
              "w-[8px] h-[8px] rounded-full",
              "transition-all duration-300",
              scrollIndex === index ? "bg-primary-100" : "bg-primary-36"
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default ScrollIndicator;
