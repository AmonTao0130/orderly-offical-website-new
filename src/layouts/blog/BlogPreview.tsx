import React, { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { getArticleBySlug } from "@/strapi/services";
import type { Article } from "@/strapi/type";
import { parse } from "qs";
import Header from "@/layouts/blog/detail/Header";
import BlogDetail from "@/layouts/blog/detail/BlogDetail";
import Footer from "@/components/Footer";
import { isDev } from "@/utils";

interface BlogPreviewProps {}
const BlogPreview: React.FC<BlogPreviewProps> = (props) => {
  const [article, setArticle] = useState<Article>();
  const [loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);
    const search = window.location.search?.replace("?", "");
    const { slug } = parse(search);
    const article = await getArticleBySlug(slug as string);
    setArticle(article);
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
            <BlogDetail article={article!} />
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default BlogPreview;
