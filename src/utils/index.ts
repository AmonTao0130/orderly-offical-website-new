import { twMerge } from "tailwind-merge";
import { cx } from "class-variance-authority";
import { format } from "date-fns";

export function cn(...args: any[]) {
  return twMerge(cx(...args));
}

export function formatDate(date: string | Date) {
  if (typeof date === "string") {
    return format(new Date(date), "MMM dd, yyyy");
  }

  return format(date, "MMM dd, yyyy");
}

export function array2Map(array: any[]) {
  const map = {} as Record<string, any>;
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
