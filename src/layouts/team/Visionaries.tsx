import React from "react";
import type { PropsWithClassName } from "@/types";
import { cn } from "@/utils";
import TitleBlock from "./TitleBlock";
import RanYi from "./imgs/RanYi.png";
import TerenceNg from "./imgs/TerenceNg.png";
import ArjunArora from "./imgs/ArjunArora.png";
import AudreyYang from "./imgs/AudreyYang.png";
import TwitterIcon from "@/icons/TwitterIcon";

const data = [
  {
    name: "Ran Yi",
    title: "Co-founder",
    icon: RanYi.src,
    twitter: "https://x.com/ranyi1115",
  },
  {
    name: "Terence Ng",
    title: "Co-founder",
    icon: TerenceNg.src,
    twitter: "https://x.com/TerenceTheNg",
  },
  {
    name: "Arjun Arora",
    title: "COO",
    icon: ArjunArora.src,
    twitter: "https://x.com/0x_Arjun",
  },
  // {
  //   name: "Audrey Yang",
  //   title: "CGO ",
  //   icon: AudreyYang.src,
  //   twitter: "https://x.com/Audrey_Orderly",
  // },
];

const Visionaries: React.FC<PropsWithClassName> = (props) => {
  return (
    <div>
      <TitleBlock
        className={cn(
          /** 375 */
          "mt-[133px]",
          /** 768 */
          "md:mt-[197px]",
          /** 1024 */
          "lg:mt-[176px]"
        )}
      >
        Meet the visionaries
      </TitleBlock>
      <div
        className={cn(
          "flex justify-center flex-wrap gap-x-[16px] md:gap-x-[40px]",
          "md:mt-[85px]",
          /** 1024 */
          "lg:mt-[80px]"
        )}
      >
        {data.map((item) => {
          return (
            <a
              key={item.name}
              className={cn(
                "group flex flex-wrap flex-col items-center",
                "mt-[32px] md:mt-0"
                // /** 375 */
                // "w-[calc((100%_-_20px)_/_2)]",
                // /** 768 */
                // "md:w-[calc((100%_-_48px)_/_4)]",
                // /** 1024 */
                // "lg:w-[calc((100%_-_120px)_/_4)]"
              )}
              href={item.twitter}
              target="_blank"
            >
              <img
                className={cn(
                  /** 375 */
                  "w-[100px] h-[100px] mt-[9px]",
                  /** 768 */
                  "md:w-[130px] md:h-[130px]",
                  /** 1024 */
                  "lg:w-[180px] lg:h-[180px]"
                )}
                src={item.icon}
                alt={item.name}
              />
              <div
                className={cn(
                  /** 375 */
                  "text-[15px] leading-[18px] text-primary mt-[9px]",
                  /** 768 */
                  "md:text-xl md:leading-[24px] md:mt-[14.45px]",
                  /** 1024 */
                  "lg:text-2xl lg:leading-[28.8px] md:mt-[20px]",
                  /** 1440 */
                  "xl"
                )}
              >
                {item.name}
              </div>
              <div
                className={cn(
                  /** 375 */
                  "text-[10.5px] leading-[12.6px] font-title font-normal mt-[5.33px]",
                  /** 768 */
                  "md:text-sm md:leading-[16.8px] md:mt-[5.78px]",
                  /** 1024 */
                  "lg:text-base lg:leading-[19.2px] lg:mt-[8px]"
                )}
              >
                {item.title}
              </div>
              <div
                className={cn(
                  "flex justify-center items-center",
                  "transition-[background] duration-300",
                  "bg-primary-12 group-hover:bg-[#D196FF] rounded-full",
                  /** 375 */
                  "w-[18px] h-[18px] mt-[6px]",
                  /** 768 */
                  "md:w-[28px] md:h-[28px] md:mt-[17.34px]",
                  /** 1024 */
                  "md:w-[40px] md:h-[40px] lg:mt-[24px]"
                )}
              >
                <TwitterIcon
                  className={cn(
                    "transition-[color] duration-300",
                    "text-primary-36 group-hover:text-[#000]",
                    /** 375 */
                    "w-[9px] h-[9px]",
                    /** 768 */
                    "md:w-[14px] md:h-[14px]",
                    /** 1024 */
                    "md:w-[20px] md:h-[20px]"
                  )}
                />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Visionaries;
