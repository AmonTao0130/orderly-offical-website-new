import type { FC } from "react";
import { cn } from "@/utils";
import Button from "@/components/Button";

const Contact: FC = () => {
  return (
    <div className="text-center">
      <div
        className={cn(
          "text-[16px] md:text-[24px] lg:text-[32px]",
          "md:text-[24px]"
        )}
      >
        Met the listing criteria or got more questions?
      </div>
      <div
        className={cn(
          "text-primary-54 mt-[8px]",
          "text-[12px] md:text-[16px] lg:text-[20px]",
          "leading-[18px] md:leading-[24px] lg:leading-[30px]"
        )}
      >
        Let us know and we will get back to you shortly
      </div>

      <div className="flex gap-x-[20px] justify-center mt-[20px]">
        <Button
          className="!h-[40px]"
          href="https://forms.gle/rzqVxvyWTo3i9crp6"
          target="_blank"
        >
          Apply now
        </Button>
        <Button
          href="mailto:listing@orderly.network"
          type="outlined"
          className="!h-[40px]"
        >
          Contact us
        </Button>
      </div>
    </div>
  );
};

export default Contact;
