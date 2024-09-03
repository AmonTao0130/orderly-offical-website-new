import React, { useCallback, useEffect, useState } from "react";
import spark from "../imgs/spark.svg";
import back from "../imgs/arrow_back.svg";
import forward from "../imgs/arrow_forward.svg";
import { cn, fetcher } from "@/utils";
import BannerItem from "./BannerItem";
import { data } from "./data";
import useEmblaCarousel from "embla-carousel-react";
import ScrollIndicator from "./ScrollIndicator";
import Autoplay from "embla-carousel-autoplay";
import useSWR from "swr";
import type { Article, PublicationState } from "@/strapi/type";

type BlogBannerProps = {
  publicationState: PublicationState;
};

const BlogBanner: React.FC<BlogBannerProps> = (props) => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const [articles, setArticles] = useState<Article[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 25,
      slidesToScroll: "auto",
    },
    [Autoplay({ playOnInit: true, delay: 10000 })]
  );

  const { data, isLoading } = useSWR(
    `/api/articles/pin?&publicationState=${props.publicationState}`,
    fetcher
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    setArticles(data?.data || []);
  }, [data]);

  useEffect(() => {
    emblaApi?.on("select", () => {
      setScrollIndex(emblaApi?.selectedScrollSnap());
    });
  }, [emblaApi]);

  const renderBanner = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center my-[100px]">
          <img
            src="/pageloading.gif"
            className="w-[80px] h-[80px] md:w-[120px] md:h-[120px]"
          />
        </div>
      );
    }
    return (
      <div className="flex md:items-center md:gap-x-[16px]">
        <div
          className={cn(
            "hidden md:flex",
            "items-center justify-center cursor-pointer",
            "w-[40px] h-[40px] rounded-full bg-primary-8"
          )}
          onClick={() => {
            emblaApi?.scrollPrev();
          }}
        >
          <img src={back.src} className="w-[12px] h-[12px]" />
        </div>

        <div className="flex-1 overflow-hidden mt-[24px]" ref={emblaRef}>
          <div className="flex">
            {articles.map((article, index) => (
              <BannerItem
                key={article.id}
                article={article as any}
                className="flex-[0_0_100%] min-w-0"
              />
            ))}
          </div>
          <ScrollIndicator
            scrollIndex={scrollIndex}
            total={articles.length}
            scrollTo={emblaApi?.scrollTo}
          />
        </div>

        <div
          className={cn(
            "hidden md:flex",
            "items-center justify-center cursor-pointer",
            "w-[40px] h-[40px] rounded-full bg-primary-8"
          )}
          onClick={() => {
            emblaApi?.scrollNext();
          }}
        >
          <img src={forward.src} className="w-[12px] h-[12px]" />
        </div>
      </div>
    );
  };

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
      {renderBanner()}
    </div>
  );
};

export default BlogBanner;
