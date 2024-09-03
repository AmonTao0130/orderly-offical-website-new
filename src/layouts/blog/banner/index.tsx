import React, { useCallback, useEffect, useState } from "react";
import spark from "../imgs/spark.svg";
import back from "../imgs/arrow_back.svg";
import forward from "../imgs/arrow_forward.svg";
import { cn } from "@/utils";
import BannerItem from "./BannerItem";
import { data } from "./data";
import useEmblaCarousel from "embla-carousel-react";
import ScrollIndicator from "./ScrollIndicator";
import Autoplay from "embla-carousel-autoplay";

const BlogBanner: React.FC = () => {
  const [scrollIndex, setScrollIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 25,
      slidesToScroll: "auto",
    },
    [Autoplay({ playOnInit: true, delay: 10000 })]
  );

  useEffect(() => {
    emblaApi?.on("select", () => {
      setScrollIndex(emblaApi?.selectedScrollSnap());
    });
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <div style={{ lineHeight: 1.2 }} className="font-title">
      <div className="flex items-center gap-x-[8px] mt-[20px]">
        <img src={spark.src} className="w-[24px] h-[24px]" />
        <div
          className={cn(
            "font-extrabold",
            "text-xl leading-[20px]",
            "md:text-2xl md:leading-[24px]"
          )}
        >
          Featured posts
        </div>
      </div>

      <div className="flex md:items-center md:gap-x-[16px]">
        <div
          className={cn(
            "hidden md:flex",
            "items-center justify-center cursor-pointer",
            "w-[40px] h-[40px] rounded-full bg-primary-8"
          )}
          onClick={scrollPrev}
        >
          <img src={back.src} className="w-[12px] h-[12px]" />
        </div>

        <div className="flex-1 overflow-hidden mt-[24px]" ref={emblaRef}>
          <div className="flex">
            {data.map((article, index) => (
              <BannerItem
                key={article.id}
                article={article as any}
                className="flex-[0_0_100%] min-w-0"
              />
            ))}
          </div>
          <ScrollIndicator
            scrollIndex={scrollIndex}
            total={data.length}
            scrollTo={emblaApi?.scrollTo}
          />
        </div>

        <div
          className={cn(
            "hidden md:flex",
            "items-center justify-center cursor-pointer",
            "w-[40px] h-[40px] rounded-full bg-primary-8"
          )}
          onClick={scrollNext}
        >
          <img src={forward.src} className="w-[12px] h-[12px]" />
        </div>
      </div>
    </div>
  );
};

export default BlogBanner;
