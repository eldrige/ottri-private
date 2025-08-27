import { Article } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ArticleDetails({ title }: Pick<Article, "title">) {
  return (
    <section>
      <Link
        href="/blog"
        className="text-primary-500 text-lg mr-auto items-center gap-4 flex"
      >
        <ArrowLeft size={24} /> Back to all Articles
      </Link>
      <h1 className="text-heading-3 text-primary-700 md:text-heading-1 text-center md:text-start">
        {title}
      </h1>
    </section>
  );
}
