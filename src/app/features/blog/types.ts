export type BlogCategory = string;

export type BlogTab = {
  title: string;
  key: string;
};

export function formatBlogDisplayDate(date: Date | string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  /** Trusted HTML string for article body */
  html: string;
  /** ISO display time from the article source */
  displayTime: string;
  categoryName: BlogCategory;
  authorName: string;
  /** Absolute URL or root-relative path */
  coverImageUrl?: string;
  /** Estimated read time in minutes */
  readTime: number;
}

