import React from "react";
import { cn } from "@/utils";
import coin11 from "./img/coin-layer-1-1.png";
import coin12 from "./img/coin-layer-1-2.png";
import coin13 from "./img/coin-layer-1-3.png";
import coin14 from "./img/coin-layer-1-4.png";

import coin21 from "./img/coin-layer-2-1.png";
import coin22 from "./img/coin-layer-2-2.png";
import coin23 from "./img/coin-layer-2-3.png";

import coin31 from "./img/coin-layer-3-1.png";
import coin32 from "./img/coin-layer-3-2.png";

interface CoinProps {}
const Coin: React.FC<CoinProps> = (props) => {
  return (
    <div id="listing-coin" className="fixed left-0 w-full h-full">
      {/* layer 3 */}
      <img
        src={coin31.src}
        alt="listing background left"
        className={cn(
          "listing-coin-layout-3",
          "w-[45px] md:w-[62px] lg:w-[90px] xl:w-[117px]",
          "absolute left-0",
          "top-[0px] lg:top-[10px] xl:top-[18px] "
        )}
      />

      <img
        src={coin32.src}
        alt="coin background right"
        className={cn(
          "listing-coin-layout-3",
          "w-[68px] md:w-[90px] lg:w-[127px] xl:w-[189px]",
          "absolute right-0",
          "top-[-80px] md:top-[-100px] lg:top-[-160px] xl:top-[-160px] "
        )}
      />
      {/* layer 1 */}
      <img
        src={coin11.src}
        alt="coin 1"
        className={cn(
          "listing-coin-layout-1",
          "absolute",
          "w-[55px] md:w-[79px] lg:w-[103px] xl:w-[137px]",
          "top-[0px] left-[41px]",
          "md:top-[0px] md:left-[50px]",
          "lg:top-[-20px] lg:left-[89px]",
          "xl:top-[30px] xl:left-[178px]"
        )}
      />
      <img
        src={coin12.src}
        alt="coin 2"
        className={cn(
          "listing-coin-layout-1",
          "w-[71px] md:w-[101px] lg:w-[131px] xl:w-[172px]",
          "absolute",
          "top-[270px] left-[16px]",
          "md:top-[319px] md:left-[29px]",
          "lg:top-[384px] lg:left-[47px]",
          "xl:top-[372px] xl:left-[194px]"
        )}
      />
      <img
        src={coin13.src}
        alt="coin 2"
        className={cn(
          "listing-coin-layout-1",
          "w-[71px] md:w-[102px] lg:w-[134px] xl:w-[177px]",
          "absolute",
          "top-[220px] right-[-30px]",
          "md:top-[217px] md:right-[-20px]",
          "lg:top-[234px] lg:right-[0px]",
          "xl:top-[296px] xl:right-[37px]"
        )}
      />
      <img
        src={coin14.src}
        alt="coin 2"
        className={cn(
          "listing-coin-layout-1",
          "w-[72px] md:w-[102px] lg:w-[134px] xl:w-[176px]",
          "absolute",
          "top-[316px] right-[29px]",
          "md:top-[340px] md:right-[54px]",
          "lg:top-[400px] lg:right-[88px]",
          "xl:top-[413px] xl:right-[268px]"
        )}
      />
      {/* layer 2 */}
      <img
        src={coin21.src}
        alt="coin 2"
        className={cn(
          "listing-coin-layout-2",
          "w-[80px] md:w-[110px] lg:w-[130px] xl:w-[192px]",
          "absolute",
          "top-[110px] left-[-20px]",
          "md:top-[170px] md:left-[-30px]",
          "lg:top-[190px] lg:left-[-20px]",
          "xl:top-[216px] xl:left-[55px]"
        )}
      />
      <img
        src={coin22.src}
        alt="coin 2"
        className={cn(
          "listing-coin-layout-2",
          "w-[55px] md:w-[79px] lg:w-[103px] xl:w-[138px]",
          "absolute",
          "top-[0px] right-[46px]",
          "md:top-[20px] md:right-[72px]",
          "lg:top-[10px] lg:right-[110px]",
          "xl:top-[37px] xl:right-[162px]"
        )}
      />
      <img
        src={coin23.src}
        alt="coin 2"
        className={cn(
          "listing-coin-layout-2",
          "w-[60px] md:w-[66px] lg:w-[80px] xl:w-[157px]",
          "absolute",
          "top-[40px] right-[-10px]",
          "md:top-[90px] md:right-[-10px]",
          "lg:top-[110px] lg:right-[-10px]",
          "xl:top-[150px] xl:right-[0px]"
        )}
      />
    </div>
  );
};

export default Coin;
