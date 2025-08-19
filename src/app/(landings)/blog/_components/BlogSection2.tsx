"use client";
import { articlesData } from "@/lib/sampleData";
import { Article } from "@/lib/types";
import { ArrowRight, CalendarIcon, ClockIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

export default function BlogSection2() {
  return (
    <section className="py-8 lg:py-24 flex flex-col gap-12">
      <CategoryFilter />
      <LatestArticles />
    </section>
  );
}

function CategoryFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get("category") || "all";
  const articleCategories = [
    "All Posts",
    "Cleaning Tips",
    "Product Review",
    "Professional Tips",
    "Organizations",
    "Eco-Friendly"
  ];
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all" || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="flex gap-8 mx-auto">
      {articleCategories.map((cat) => (
        <div
          key={cat}
          className={`px-4 cursor-pointer py-2 border transition-all rounded-lg ${
            category === cat
              ? "bg-primary-700 text-white hover:bg-white hover:border hover:text-primary-700 hover:border-primary-700"
              : "hover:bg-primary-700 hover:text-white hover:border-primary-700 bg-transparent border border-primary-700 text-primary-700"
          }`}
          onClick={() => {
            updateFilter("category", cat === "all" ? "" : cat);
          }}
        >
          {cat}
        </div>
      ))}
    </div>
  );
}

function LatestArticles() {
  return (
    <div className="text-center flex flex-col justify-center items-center space-y-4">
      <div>
        <h2 className="text-heading-3 md:text-heading-2 text-secondary-700 font-semibold">
          Latest Articles
        </h2>
        <p className="text-subtitle text-surface-500 max-w-6xl mx-auto">
          Expert advice and practical tips for maintaining a clean, healthy home
        </p>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articlesData.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </div>
    </div>
  );
}

type ArticleCardProps = Article;

function ArticleCard({
  authorName,
  title,
  description,
  coverSrc,
  readTime,
  postedAt
}: ArticleCardProps) {
  return (
    <div className="flex flex-col shadow-custom-strong rounded-lg">
      <div className="w-full flex">
        <Image
          src={coverSrc}
          alt={title}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>
      <div className="flex h-full justify-between flex-col text-left gap-3 p-5 ">
        <h2 className="text-heading-4 md:text-heading-3 text-secondary-700 font-semibold">
          {title}
        </h2>
        <p className="text-subtitle text-surface-500 max-w-6xl mx-auto">
          {description}
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-2 text-surface-500 text-nowrap *:flex *:gap-2 *:items-center">
          <div>
            <UserIcon className="size-5 text-surface-500" />
            <span className="text-surface-500">{authorName}</span>
          </div>
          <div>
            <ClockIcon className="*:size-5 text-surface-500" />
            <span className="text-surface-500">{readTime}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2 text-primary-700 cursor-pointer">
            <CalendarIcon className="size-5 text-surface-500" />
            <span className="text-surface-500">{postedAt}</span>
          </div>
          <ArrowRight className="size-5 text-primary-700" />
        </div>
      </div>
    </div>
  );
}
