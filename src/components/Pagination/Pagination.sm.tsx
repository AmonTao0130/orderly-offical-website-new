import React from "react";
import type { PropsWithClassName } from "@/types";
import { cn } from "@/utils";
import Button from "@/components/Button";
import type { PaginationProps } from ".";

const SmallPagination: React.FC<PaginationProps & PropsWithClassName> = (
  props
) => {
  return (
    <div className={cn("", props.className)}>
      <div className="flex justify-between">
        <Button
          type="secondary"
          disabled={!props.hasPrevious}
          onClick={props.onPrevious}
        >
          Previous
        </Button>
        <Button
          className="ml-[8px]"
          type="secondary"
          disabled={!props.hasNext}
          onClick={props.onNext}
        >
          Next
        </Button>
      </div>
      <div className="text-sm leading-[21px] text-primary-80 text-center mt-[12px]">
        Viewing {props.rangePage} of {props.total}
      </div>
    </div>
  );
};

export default SmallPagination;
