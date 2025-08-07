import React, { useEffect, useState, type FC, type SVGProps } from "react";
import spark from "../imgs/spark.svg";
import { cn, fetcher } from "@/utils";
import BannerItem from "./BannerItem";
import useEmblaCarousel from "embla-carousel-react";
import ScrollIndicator from "./ScrollIndicator";
import Autoplay from "embla-carousel-autoplay";
import useSWR from "swr";
import type { Article, PublicationState } from "@/strapi/type";
import Content from "@/components/Content";

type BlogBannerProps = {
  articles?: Article[];
  publicationState: PublicationState;
};

const BlogBanner: React.FC<BlogBannerProps> = (props) => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const [articles, setArticles] = useState<Article[]>(props.articles || []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 25,
      slidesToScroll: "auto",
    },
    [Autoplay({ playOnInit: true, delay: 10000 })]
  );

  const { data, isLoading } = useSWR(
    `/api/pinArticles?&publicationState=${props.publicationState}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 1000 * 60 * 5,
    }
  );

  useEffect(() => {
    if (!data || isLoading) {
      return;
    }
    setArticles(data?.data || []);
  }, [data, isLoading]);

  useEffect(() => {
    const callback = () => {
      setScrollIndex(emblaApi?.selectedScrollSnap() ?? 0);
    };
    emblaApi?.on("select", callback);
    return () => {
      emblaApi?.off("select", callback);
    };
  }, [emblaApi]);

  const hideIndicator = articles?.length <= 1;

  const renderBanner = () => {
    // if (isLoading) {
    //   return (
    //     <div className="flex justify-center my-[100px]">
    //       <img
    //         src="/pageloading.gif"
    //         className="w-[80px] h-[80px] md:w-[120px] md:h-[120px]"
    //       />
    //     </div>
    //   );
    // }
    return (
      <div className="flex md:items-center md:gap-x-[16px]">
        <div
          className={cn(
            "hidden md:flex",
            "items-center justify-center cursor-pointer",
            "w-[40px] h-[40px] rounded-full bg-primary-8 ",
            hideIndicator
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-[rgba(209,150,255,1)] hover:text-[rgb(0,0,0)]"
          )}
          onClick={() => {
            emblaApi?.scrollPrev();
          }}
        >
          <BackIcon className="w-[12px] h-[12px]" />
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
            className={cn(hideIndicator && "opacity-0")}
          />
        </div>

        <div
          className={cn(
            "hidden md:flex",
            "items-center justify-center cursor-pointer",
            "w-[40px] h-[40px] rounded-full bg-primary-8 ",
            hideIndicator
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-[rgba(209,150,255,1)] hover:text-[rgb(0,0,0)]"
          )}
          onClick={() => {
            emblaApi?.scrollNext();
          }}
        >
          <ForwardIcon className="w-[12px] h-[12px]" />
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        background:
          "radial-gradient(53.11% 53.11% at 50% 100%, rgba(84, 0, 190, 0.80) 0%, rgba(77, 8, 165, 0.00) 100%), #0A0A0A",
      }}
    >
      <Content>
        <div
          style={{ lineHeight: 1.2 }}
          className="font-display pt-[20px] pb-[40px]"
        >
          <div className="flex items-center gap-x-[8px]">
            <img src={spark.src} className="w-[24px] h-[24px]" />
            <div
              className={cn(
                "font-semibold",
                "text-xl leading-[20px]",
                "md:text-2xl md:leading-[24px]"
              )}
            >
              Featured posts
            </div>
          </div>
          {renderBanner()}
        </div>
      </Content>
    </div>
  );
};

export default BlogBanner;

export const BackIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M2.49835 6.54166L6.76606 10.8094L6.00002 11.5833L0.416687 5.99999L6.00002 0.416656L6.76606 1.19062L2.49835 5.45832H11.5834V6.54166H2.49835Z" />
  </svg>
);

export const ForwardIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="13"
    height="12"
    viewBox="0 0 13 12"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M9.96848 6.54166H0.883484V5.45832H9.96848L5.70078 1.19062L6.46682 0.416656L12.0502 5.99999L6.46682 11.5833L5.70078 10.8094L9.96848 6.54166Z" />
  </svg>
);
