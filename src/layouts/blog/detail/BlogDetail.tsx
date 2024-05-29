import React from "react";
import Content from "@/components/Content";
import DetailFooter from "@/layouts/blog/detail/Footer";
import { cn } from "@/utils";
import type { Article } from "@/strapi/type";
import { parseBlocks } from "@/utils/blog";

interface BlogDetailProps {
  article: Article;
}

const BlogDetail: React.FC<BlogDetailProps> = (props) => {
  const blocks = parseBlocks(props.article.attributes?.blocks);

  const blocksHtml = blocks?.map((block) => {
    if (block.url) {
      return (
        <div className="my-[48px]" key={block?.id}>
          {[".mp4"].includes(block.ext!) ? (
            <video
              className={cn(
                "w-full min-h-[300px]",
                "border border-[rgba(255,255,255,0.12)] rounded-[8px]"
              )}
              controls
            >
              <source src={block.url} type="video/mp4" />
            </video>
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
    return (
      <div
        key={block?.id}
        className="mt-[30px]"
        dangerouslySetInnerHTML={{ __html: block.html! }}
      />
    );
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
        <div id="blogDetail">{blocksHtml}</div>
        <DetailFooter />
      </div>
    </Content>
  );
};

export default BlogDetail;
