import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "react-hot-toast";

/**
 * Combines multiple class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(isoString: string) {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  } as const;
  const formatted = date.toLocaleDateString("en-US", options);
  return formatted;
}

export function converReadTime(readTime: number) {
  return `${Math.ceil(readTime / 60)} min read`;
}

export const shareLinks = async (
  url: string,
  title = "Ottri",
  text = "Check out this article from Ottri!"
) => {
  try {
    if (navigator.share) {
      await navigator.share({
        title,
        text,
        url
      });
      toast.success("Content shared successfully!", {
        position: "bottom-right"
      });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!", { position: "bottom-right" });
    }
  } catch (error) {
    console.error("Error sharing content:", error);
  }
};

export const cleanMD = (markdown: string): string => {
  return markdown
    .replace(/[#*_~`>\[\]()]/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
};
