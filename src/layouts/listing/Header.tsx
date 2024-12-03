import { cn } from "@/utils";
import Button from "@/components/Button";

interface HeaderProps {}
const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div
      id="listing-header"
      className={cn("relative", "h-[400px] lg:h-[600px]")}
    >
      <div
        id="listing-header-text"
        className={cn("fixed top-0 left-0 w-full h-full", "text-center")}
      >
        <div
          //   background:
          //     "linear-gradient(360deg, #9975FF -30.75%, rgba(155, 249, 255, 0) 103.38%), linear-gradient(0deg, #FFFFFF, #FFFFFF)",
          //   backgroundClip: "text",
          //   WebkitTextFillColor: "transparent",
          //   WebkitBackgroundClip: "text",
          // }}
          className={cn(
            "font-bold listing-text-gradient pt-[100px]",
            "text-[26px] md:text-[36px] lg:text-[56px]"
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
          href="https://forms.gle/rzqVxvyWTo3i9crp6"
          target="_blank"
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default Header;
