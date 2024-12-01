import Button from "@/components/Button";
import { cn } from "@/utils";
import React from "react";

interface ContactProps {}
const Contact: React.FC<ContactProps> = (props) => {
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
        <Button className="!h-[40px]">Apply now</Button>
        <Button type="outlined" className="!h-[40px]">
          Contact us
        </Button>
      </div>
    </div>
  );
};

export default Contact;
