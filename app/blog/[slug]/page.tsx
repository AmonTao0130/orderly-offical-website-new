import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPost from "@/app/pages/BlogPost";
import {
  articleToBlogPost,
  articlesToBlogPosts,
  getAllPageArticleDetails,
  PublicationStateEnum,
} from "@/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getAllPageArticleDetails({
    publicationState: PublicationStateEnum.LIVE,
  });
  return articles.map((article) => ({ slug: article.attributes.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const articles = await getAllPageArticleDetails({
    publicationState: PublicationStateEnum.LIVE,
  });
  const article = articles.find((item) => item.attributes.slug === slug);

  if (!article) {
    return { title: "Post Not Found | Orderly Network" };
  }

  const post = articleToBlogPost(article);

  return {
    title: `${post.title} | Orderly Network`,
    description: post.description,
    alternates: {
      canonical: `https://orderly.network/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Orderly Network`,
      description: post.description,
      url: `https://orderly.network/blog/${post.slug}`,
      type: "article",
      publishedTime: post.displayTime,
      authors: [post.authorName],
      ...(post.coverImageUrl ? { images: [{ url: post.coverImageUrl }] } : {}),
    },
    other: {
      "article:published_time": post.displayTime,
      "article:section": post.categoryName,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const articles = await getAllPageArticleDetails({
    publicationState: PublicationStateEnum.LIVE,
  });
  const article = articles.find((item) => item.attributes.slug === slug);

  if (!article) {
    notFound();
  }

  const post = articleToBlogPost(article);
  const latestPosts = articlesToBlogPosts(articles.slice(0, 3));

  return <BlogPost slug={slug} post={post} latestPosts={latestPosts} />;
}
