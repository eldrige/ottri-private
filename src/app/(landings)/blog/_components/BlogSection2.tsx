"use client";
import { articlesData } from "@/lib/sampleData";
import { Article } from "@/lib/types";
import { ArrowRight, CalendarIcon, ClockIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="flex gap-8 flex-wrap mx-auto">
      {articleCategories.map((cat) => (
        <div
          key={cat}
          className={`px-4 cursor-pointer py-2 border transition-all rounded-lg ${
            category === cat
              ? "bg-primary-700 text-white"
              : " bg-transparent border border-primary-700 text-primary-700"
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
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "All Posts";
  const filteredArticles = articlesData.filter(
    (article) =>
      !article.isFeatured &&
      (category === "All Posts" ? true : article.category === category)
  );

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.length > 0 &&
            filteredArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
        </div>
        {filteredArticles.length === 0 && (
          <div className="w-full flex justify-center">
            <p>
              No acrticles of category{" "}
              <span className="text-primary-700">{` "${category}"`}</span>
            </p>
          </div>
        )}
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
  postedAt,
  id,
  category
}: ArticleCardProps) {
  return (
    <div className="relative flex flex-col shadow-custom-strong rounded-lg">
      <span className="absolute left-4 top-4 text-[10px] w-fit py-1 px-4 bg-white rounded-sm text">
        {category}
      </span>
      <div className="w-full flex">
        <Image
          src={coverSrc}
          alt={title}
          className="aspect-2/1 object-cover rounded-t-lg"
        />
      </div>
      <div className="flex h-full justify-between flex-col text-left gap-6 px-6 py-8">
        <h3 className="text-xl text-secondary-700 font-medium">{title}</h3>
        <p className="text-subtitle text-surface-500 max-w-6xl mx-auto">
          {description}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-surface-500 text-nowrap *:flex *:gap-2 *:items-center">
          <div>
            <UserIcon className="size-5 text-surface-500" />
            <span className="text-surface-500">{authorName}</span>
          </div>
          <div>
            <ClockIcon className="size-5 text-surface-500" />
            <span className="text-surface-500">{readTime}</span>
          </div>
        </div>
        <div className="flex justify-between border-t border-surface-500/20 pt-6">
          <div className="flex items-center gap-2 text-primary-700">
            <CalendarIcon className="size-5 text-surface-500" />
            <span className="text-surface-500">{postedAt}</span>
          </div>
          <Link href={`/blog/post/${id}`}>
            <ArrowRight className=" text-primary-700" />
          </Link>
        </div>
      </div>
    </div>
  );
}
