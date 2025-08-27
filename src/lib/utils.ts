import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(isoString: string) {
  const date = new Date(isoString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formatted = date.toLocaleDateString("en-US", options);
  return formatted;
}

export function converReadTime(readTime: number) {
  return `${Math.ceil(readTime / 60)} min read`;
}
