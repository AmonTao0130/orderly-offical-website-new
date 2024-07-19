import type { Block } from "@/strapi/type";
import { marked } from "marked";
import { getRenderer } from "./marked";
marked.use({
  // breaks: true, // 不生效，使用正则代替
  pedantic: false,
  gfm: true,
  /**
   * 自定义 renderer不能在这里写，否则下面的 marked.parse 可能会不生效
   * 在每个使用 marked.parse 的地方传入自定义的 renderer 才能确保生效
   * */
  // renderer: {
  //   link
  // }
});

export function parseBlocks(blocks: Block[]) {
  const renderer = getRenderer();

  return blocks?.map((block) => {
    if (block.__component === "shared.rich-text") {
      const html = marked.parse(block.body || "", {
        renderer,
      }) as string;
      return {
        ...block,
        html: html
          ?.replace(/<br>/g, "<br /><br />") // 将\n转为换行元素
          ?.replace(/\n\n/g, "<br />"), // 将\n转为换行元素
      };
    }

    if (block.__component === "shared.media") {
      const { caption, url, ext } = block.file?.data?.attributes || {};
      return {
        ...block,
        url,
        ext,
        caption: marked.parse(caption || "", { renderer }),
      };
    }

    if (block.__component === "shared.quote") {
      const { title, body } = block || {};
      return {
        ...block,
        title: marked.parse(title || "", {
          renderer,
        }) as string,
        body: marked.parse(body || "", { renderer }) as string,
      };
    }

    return block;
  });
}
