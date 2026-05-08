import type { Metadata } from "next";
import Blog from "@/app/pages/Blog";
import {
  articleToBlogPost,
  articlesToBlogPosts,
  categoriesToBlogTabs,
  getAllPageArticles,
  getCategories,
  getPinArticles,
  PublicationStateEnum,
} from "@/blog";

export const metadata: Metadata = {
  title: "Blog | Orderly Network",
  description:
    "Insights, updates, and deep dives from the Orderly team — announcements, product launches, ecosystem spotlights, and thought leadership on omnichain perp infrastructure.",
  alternates: {
    canonical: "https://orderly.network/blog",
  },
  openGraph: {
    title: "Blog | Orderly Network",
    description:
      "Insights, updates, and deep dives from the Orderly team — announcements, product launches, ecosystem spotlights, and thought leadership on omnichain perp infrastructure.",
    url: "https://orderly.network/blog",
  },
};

export default async function Page() {
  const categories = await getCategories();
  const tabs = categoriesToBlogTabs(categories);
  const pinArticles = await getPinArticles();
  const articles = await getAllPageArticles({
    publicationState: PublicationStateEnum.LIVE,
  });
  const total = articles.length;

  return (
    <Blog
      articles={articlesToBlogPosts(articles)}
      pinArticles={pinArticles.map(articleToBlogPost)}
      tabs={tabs}
      total={total}
    />
  );
}
