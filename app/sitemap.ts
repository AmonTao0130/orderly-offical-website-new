import type { MetadataRoute } from "next";
import {
  articlesToBlogPosts,
  getAllPageArticles,
  PublicationStateEnum,
} from "@/app/features/blog";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllPageArticles({
    publicationState: PublicationStateEnum.LIVE,
  });
  const blogPostEntries: MetadataRoute.Sitemap = articlesToBlogPosts(articles).map((post) => ({
    url: `https://orderly.network/blog/${post.slug}`,
    lastModified: new Date(post.displayTime),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: "https://orderly.network",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://orderly.network/faq",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://orderly.network/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogPostEntries,
  ];
}
