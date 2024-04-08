import React, { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { getArticleBySlug } from "@/strapi/services";
import { parseBlocks } from "@/utils/blog";
import type { Article, Block } from "@/strapi/type";
import { parse } from "qs";
import Header from "@/layouts/blog/detail/Header";
import BlogDetail from "@/layouts/blog/detail/BlogDetail";
import Footer from "@/components/Footer";
import { isTestEnv } from "@/utils";

interface BlogPreviewProps {}
const BlogPreview: React.FC<BlogPreviewProps> = (props) => {
  const [article, setArticle] = useState<Article>();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);
    const search = window.location.search?.replace("?", "");
    const { slug } = parse(search);
    const article = await getArticleBySlug(slug as string);
    const blocks = parseBlocks(article?.attributes?.blocks);
    setArticle(article);
    setBlocks(blocks as any);
    setLoading(false);
  }

  useEffect(() => {
    if (isDev(window.location.hostname)) {
      getData();
    } else {
      // 如果在生产环境，进入预览界面则自动跳到首页
      window.location.replace("/");
    }
  }, []);

  return (
    <div>
      <Navigation />
      {loading ? (
        <div className="my-[100px] text-center">loading...</div>
      ) : (
        <>
          <Header article={article!} />
          <div className="mb-[80px]">
            <BlogDetail blocks={blocks} />
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default BlogPreview;
