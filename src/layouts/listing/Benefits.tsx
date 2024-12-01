import React from "react";
import Title from "./Title";
import benefits1 from "./img/benefits1.png";
import benefits2 from "./img/benefits2.png";
import benefits3 from "./img/benefits3.png";
import { cn } from "@/utils";
import Block from "./Block";

interface BenefitsProps {}

const data = [
  {
    src: benefits1.src,
    title: "One-off access to 30+ omnichain DEXs",
  },
  {
    src: benefits2.src,
    title: "Social media exposure to 300K+ users",
  },
  {
    src: benefits3.src,
    title: "Community activation via customized campaigns",
  },
];
const Benefits: React.FC<BenefitsProps> = (props) => {
  return (
    <div>
      <Title>Enjoy listing benefits on Orderly</Title>
      <div className="flex flex-col md:flex-row gap-[20px]">
        {data.map((item) => (
          <Block
            key={item.src}
            className={cn(
              "flex flex-1 flex-row-reverse md:flex-col gap-x-[20px]",
              "items-center justify-between md:justify-center",
              "p-[24px] md:p-[16px] lg:p-[40px]"
            )}
          >
            <img
              src={item.src}
              alt={item.title}
              className={cn(
                "w-[60px] h-[60px]",
                "md:w-[100px] md:h-[100px]",
                "lg:w-[140px] lg:h-[140px]"
              )}
            />
            <div
              className={cn(
                "listing-text-gradient md:text-center md:mt-[20px] xl:px-[30px]",
                "text-[16px] lg:text-[18px] xl:text-[20px]"
              )}
            >
              {item.title}
            </div>
          </Block>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
