import { cn } from "@/utils";
import React from "react";
import bg375 from "./img/bg/375.png";
import bg768 from "./img/bg/768.png";
import bg1024 from "./img/bg/1024.png";
import bg1440 from "./img/bg/1440.png";
import Button from "@/components/Button";

interface HeaderProps {}
const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div>
      {/* <div className="absolute top-0 left-0 mix-blend-screen object-cover">
        <picture>
          <source srcSet={bg1440.src} media="(min-width: 1440px)" />
          <source srcSet={bg1024.src} media="(min-width: 1024px)" />
          <source srcSet={bg768.src} media="(min-width: 768px)" />
          <source srcSet={bg375.src} media="(min-width: 375px)" />

          <img src={bg1024.src} alt="listing header background" />
        </picture>
      </div> */}
      <div className="text-center">
        <div
          style={{
            background:
              "linear-gradient(360deg, #9975FF -30.75%, rgba(155, 249, 255, 0) 103.38%), linear-gradient(0deg, #FFFFFF, #FFFFFF)",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            WebkitBackgroundClip: "text",
          }}
          className={cn(
            "font-bold",
            "text-[24px] md:text-[36px] lg:text-[56px]",
            "mt-[100px] md:mt-[100px]"
          )}
        >
          Trade Anything, Anywhere.
          <br /> Hassle-free p Listings
        </div>
        <div
          className={cn(
            "mx-auto text-primary-80",
            "w-[365px] md:w-[480px] lg:w-[680px]",
            "text-[14px] lg:text-[20px]",
            "leading-[21px] lg:leading-[30px]",
            "mt-[8px] md:mt-[12px]"
          )}
        >
          List your perps fast and hassle-free, with zero hidden costs—just
          top-tier liquidity. Get instant access to 30+ DEXs connected with
          Orderly.
        </div>
        <Button
          className={cn(
            "mt-[24px] lg:mt-[40px]",
            "px-[40px] md:px-[24px] lg:px-[40px]"
          )}
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default Header;
