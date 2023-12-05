import React from "react";
import type { PropsWithClassName } from "@/types";
import { cn } from "@/utils";
import Button from "@/components/Button";

const MiddlePagination: React.FC<PropsWithClassName> = (props) => {
  return (
    <div className={cn("flex justify-between items-center", props.className)}>
      <div className="text-xl leading-[30px] text-primary-80">
        Viewing 1-9 of 123
      </div>
      <div className="flex">
        <Button type="secondary" disabled>
          Previous
        </Button>
        <Button className="ml-[8px]" type="secondary">
          Next
        </Button>
      </div>
    </div>
  );
};

export default MiddlePagination;
