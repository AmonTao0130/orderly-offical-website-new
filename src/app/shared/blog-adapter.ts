import type { BlogPost, BlogTab } from "./blog";
import { markdownToHtml } from "./marked";
import type { Article, Categorg } from "./strapi/type";
import {
  getArticleCoverImage,
  getDisplayTime,
} from "./strapi/utils";

const WORDS_PER_MINUTE = 220;

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function blockToHtml(block: Article["attributes"]["blocks"][number]) {
  if (block.__component === "shared.rich-text" && block.body) {
    return markdownToHtml(block.body);
  }

  if (block.__component === "shared.quote" && block.body) {
    const title = block.title ? `<strong>${block.title}</strong>` : "";
    return `<blockquote>${title}${markdownToHtml(block.body)}</blockquote>`;
  }

  if (block.__component === "shared.media") {
    const image = block.file?.data?.attributes;
    const src = image?.url;
    if (!src) {
      return "";
    }
    const alt = image.alternativeText || image.name || "";
    const caption = block.caption ? `<figcaption>${block.caption}</figcaption>` : "";
    return `<figure><img src="${src}" alt="${alt}" />${caption}</figure>`;
  }

  if (block.html) {
    return block.html;
  }

  return "";
}

function articleContentToHtml(article: Article) {
  return article.attributes.blocks.map(blockToHtml).filter(Boolean).join("\n");
}

function estimateReadTime(html: string) {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (!text) {
    return 1;
  }
  return Math.max(1, Math.ceil(text.split(" ").length / WORDS_PER_MINUTE));
}

export function categoriesToBlogTabs(categories: Categorg[]): BlogTab[] {
  return categories
    .map((category) => ({
      title: category.attributes.name,
      key: category.attributes.slug,
    }))
    .filter((item) => item.key);
}

export function articleToBlogPost(article: Article): BlogPost {
  const attributes = article.attributes;
  const content = articleContentToHtml(article);
  const displayTime = getDisplayTime(article);
  const isoDate = displayTime.toISOString();

  return {
    slug: attributes.slug,
    title: attributes.title,
    excerpt: attributes.description,
    content,
    date: formatDate(displayTime),
    isoDate,
    category: attributes.category?.data?.attributes?.name || "Updates",
    author: attributes.author?.data?.attributes?.name || "Orderly Network",
    coverImage: getArticleCoverImage(article),
    readTime: estimateReadTime(content),
    featured: !!attributes.pin,
  };
}

export function articlesToBlogPosts(articles: Article[]) {
  return articles.map(articleToBlogPost);
}
