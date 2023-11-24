import { twMerge } from "tailwind-merge";
import { cx } from "class-variance-authority";

export function cn(...args: any[]) {
  return twMerge(cx(...args));
}
