export type BlogCategory = string;

export type BlogTab = {
  title: string;
  key: string;
};

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Trusted HTML string for article body */
  content: string;
  /** Human-readable date, e.g. "Apr 09, 2026" */
  date: string;
  /** ISO date for sorting & schema markup, e.g. "2026-04-09" */
  isoDate: string;
  category: BlogCategory;
  author: string;
  /** Absolute URL or root-relative path */
  coverImage?: string;
  /** Estimated read time in minutes */
  readTime: number;
  /** Pin this post to the featured slot on the list page */
  featured?: boolean;
}

export const BLOG_CATEGORIES: BlogCategory[] = [];
export const BLOG_POSTS: BlogPost[] = [];
