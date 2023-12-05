import React from "react";
import type { PropsWithClassName } from "@/types";
import { cn } from "@/utils";
import Button from "@/components/Button";

const SmallPagination: React.FC<PropsWithClassName> = (props) => {
  return (
    <div className={cn("", props.className)}>
      <div className="flex justify-between">
        <Button type="secondary" disabled>
          Previous
        </Button>
        <Button className="ml-[8px]" type="secondary">
          Next
        </Button>
      </div>
      <div className="text-sm leading-[21px] text-primary-80 text-center mt-[12px]">
        Viewing 1-9 of 123
      </div>
    </div>
  );
};

export default SmallPagination;
