import React from "react";
import type { PropsWithClassName } from "@/types";
import { cn } from "@/utils";
import Button from "@/components/Button";
import type { PaginationProps } from "./Pagination";

const MiddlePagination: React.FC<PaginationProps & PropsWithClassName> = (
  props
) => {
  return (
    <div className={cn("flex justify-between items-center", props.className)}>
      <div className="text-xl leading-[30px] text-primary-80">
        Viewing {props.rangePage} of {props.total}
      </div>
      <div className="flex">
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
    </div>
  );
};

export default MiddlePagination;
