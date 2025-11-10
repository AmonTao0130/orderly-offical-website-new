import { twMerge } from "tailwind-merge";
import { cx } from "class-variance-authority";
import { format } from "date-fns";
import { PublicationStateEnum, type Article } from "@/strapi/type";

export function cn(...args: any[]) {
  return twMerge(cx(...args));
}

export function formatDate(date: string | Date) {
  if (!date) {
    return "";
  }
  if (typeof date === "string") {
    return format(new Date(date), "MMM dd, yyyy");
  }

  return format(date, "MMM dd, yyyy");
}

export function array2Map(array: any[]) {
  const map: Record<string, any> = {};
  array.forEach((item) => {
    map[item.id] = item;
  });
  return map;
}

export async function copyContent(content: string) {
  try {
    await navigator.clipboard.writeText(content);
    // console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}

export function isDev(hostname: string) {
  return ["localhost", "dev-v2.orderly.network"].includes(hostname);
}

export async function fetcher(url: string, init?: RequestInit) {
  return fetch(url, init).then((res) => res.json());
}

export function getDisplayTime(attributes: Article["attributes"]) {
  const { postedTime, publishedAt, updatedAt } = attributes || {};
  return formatDate(postedTime || publishedAt || updatedAt);
}

export function isEnableFetchBlogApi() {
  return import.meta.env.PUBLIC_ENABLE_FETCH_BLOG_API === "true";
}

export function getPublicationState(hostname: string) {
  return isDev(hostname)
    ? PublicationStateEnum.PREVIEW
    : PublicationStateEnum.LIVE;
}
