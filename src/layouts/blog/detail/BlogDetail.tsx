import React from "react";
import Content from "@/components/Content";
import DetailFooter from "@/layouts/blog/detail/Footer";
import { cn } from "@/utils";
import type { Article, Block } from "@/strapi/type";
import { parseBlocks } from "@/utils/blog";
import QuoteLeft from "../imgs/quote_left.png";
import QuoteRight from "../imgs/quote_right.png";

interface BlogDetailProps {
  article: Article;
}

const Video: React.FC<{ url: string }> = (props) => {
  return (
    <video
      className={cn(
        "w-full min-h-[300px]",
        "border border-[rgba(255,255,255,0.12)] rounded-[8px]"
      )}
      controls
    >
      <source src={props.url} type="video/mp4" />
    </video>
  );
};

const Quote: React.FC<{ title?: string; body?: string }> = (props) => {
  return (
    <div className=" relative text-center px-[36px] md:px-[80px]">
      <img
        className={cn(
          "absolute top-0 left-[8px] md:left-[20px]",
          "w-[20px] h-[20px] md:w-[40px] md:h-[40px]"
        )}
        src={QuoteLeft.src}
      />
      <img
        className={cn(
          "absolute top-0 right-[8px] md:right-[20px]",
          "w-[20px] h-[20px] md:w-[40px] md:h-[40px]"
        )}
        src={QuoteRight.src}
      />
      <div
        className={cn(
          "text-sm leading-[21px] md:text-xl md:leading-[36px]",
          "text-primary-100 italic font-extralight"
        )}
      >
        {props.body}
      </div>
      <div
        className={cn(
          "text-xs leading-[21.6px] md:text-base md:leading-[28.8px]",
          "text-primary-50 mt-[10px]"
        )}
      >
        – {props.title}
      </div>
    </div>
  );
};

const BlogDetail: React.FC<BlogDetailProps> = (props) => {
  const blocks = parseBlocks(props.article.attributes?.blocks);

  const blocksHtml = blocks?.map((block) => {
    if (block.url) {
      return (
        <div className="my-[48px]" key={block?.id}>
          {[".mp4"].includes(block.ext!) ? (
            <Video url={block.url} />
          ) : (
            <img
              className="mx-auto"
              alt={block.file?.data?.attributes?.alternativeText}
              src={block.url}
            />
          )}
          <div
            className="text-center text-xs text-primary-54 mt-[12px]"
            dangerouslySetInnerHTML={{ __html: block.caption! }}
          />
        </div>
      );
    }

    if (block.html) {
      return (
        <div
          key={block?.id}
          className="mt-[30px]"
          dangerouslySetInnerHTML={{ __html: block.html! }}
        />
      );
    }

    if (block.__component == "shared.quote") {
      return <Quote key={block?.id} title={block.title} body={block.body} />;
    }
    return null;
  });

  return (
    <Content className="flex justify-center">
      <div
        className={cn(
          "flex flex-col justify-center",
          /** 375 */
          "text-base leading-[28.8px] font-normal mt-[40px]",
          /** 768 */
          "md:w-[688px]",
          /** 1024 */
          "lg:w-[904px] lg:text-xl lg:leading-[36px] lg:mt-[80px]"
        )}
      >
        <div id="blogDetail">{blocksHtml.filter((item) => !!item)}</div>
        <DetailFooter />
      </div>
    </Content>
  );
};

export default BlogDetail;
