import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPost from "@/app/pages/BlogPost";
import { BLOG_POSTS } from "@/app/shared/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found | Orderly Network" };
  }

  return {
    title: `${post.title} | Orderly Network`,
    description: post.excerpt,
    alternates: {
      canonical: `https://orderly.network/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Orderly Network`,
      description: post.excerpt,
      url: `https://orderly.network/blog/${post.slug}`,
      type: "article",
      publishedTime: post.isoDate,
      authors: [post.author],
      ...(post.coverImage ? { images: [{ url: post.coverImage }] } : {}),
    },
    other: {
      "article:published_time": post.isoDate,
      "article:section": post.category,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogPost slug={slug} />;
}
