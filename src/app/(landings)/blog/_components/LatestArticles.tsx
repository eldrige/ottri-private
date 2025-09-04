"use client";
import { Article } from "@/lib/types";
import {
  ArrowLeft,
  ArrowRight,
  CalendarIcon,
  ClockIcon,
  UserIcon
} from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn, converReadTime, formatDate } from "@/lib/utils";

export default function LatestArticles({
  articlesData
}: {
  articlesData: Article[];
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % articlesData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + articlesData.length) % articlesData.length
    );
  };
  useEffect(() => {
    console.log(articlesData);
  }, [articlesData]);
  return (
    <div className="text-center flex flex-col justify-center items-center space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-heading-3 md:text-heading-2 text-secondary-700 font-semibold">
          Latest Articles
        </h2>
        <p className="text-subtitle text-surface-500 max-w-6xl mx-auto">
          Expert advice and practical tips for maintaining a clean, healthy home
        </p>
      </div>
      <div>
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {articlesData.length > 0 &&
            articlesData.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
        </div>
        <div className="lg:hidden space-y-4">
          <div className="overflow-hidden w-full max-w-full">
            <div
              className="flex max-w-md transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {articlesData.map((article) => (
                <div
                  key={article.id}
                  className="w-full flex-shrink-0 max-w-full px-2 sm:px-4"
                >
                  <ArticleCard {...article} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-1">
            {articlesData.map((_, index) => (
              <span
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full cursor-pointer",
                  currentSlide === index
                    ? "bg-primary-700"
                    : "bg-surface-200/60"
                )}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          <div className="flex justify-center gap-4">
            <button
              disabled={currentSlide === 0}
              className={cn(
                "*:h-6 *:w-6 transition-colors",
                currentSlide === 0
                  ? "text-secondary-700/30"
                  : "text-primary-700 cursor-pointer"
              )}
              onClick={prevSlide}
            >
              <ArrowLeft />
            </button>
            <button
              disabled={currentSlide === articlesData.length - 1}
              className={cn(
                "*:h-6 *:w-6 transition-colors",
                currentSlide === articlesData.length - 1
                  ? "text-secondary-700/30"
                  : "text-primary-700 cursor-pointer"
              )}
              onClick={nextSlide}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
        {articlesData.length === 0 && (
          <div className="w-full flex justify-center">
            <p>No acrticles of this category</p>
          </div>
        )}
      </div>
    </div>
  );
}

type ArticleCardProps = Article;

function ArticleCard({
  author: authorName,
  title,
  content: description,
  thumbnail: coverSrc,
  readingTime: readTime,
  publicationDate: postedAt,
  id,
  category
}: ArticleCardProps) {
  return (
    <div className="w-full max-w-md mx-auto relative overflow-hidden flex flex-col shadow-custom-strong rounded-lg">
      <span className="absolute left-4 top-4 text-[10px] w-fit py-1 px-4 bg-white rounded-sm text">
        {category}
      </span>
      <div className="w-full flex">
        <Image
          width={500}
          height={500}
          src={coverSrc}
          alt={title}
          className="w-full lg:aspect-2/1 aspect-5/3 object-cover rounded-t-lg"
        />
      </div>
      <div className="flex h-full justify-between flex-col text-left gap-6 px-6 py-8">
        <h3 className="text-xl text-secondary-700 font-medium">{title}</h3>
        <p className="text-subtitle text-surface-500 text-wrap">
          {description}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-surface-500 *:flex *:gap-2 *:items-center">
          <div>
            <UserIcon className="size-5 text-surface-500" />
            <span className="text-surface-500">{authorName}</span>
          </div>
          <div>
            <ClockIcon className="size-5 text-surface-500" />
            <span className="text-surface-500">{converReadTime(readTime)}</span>
          </div>
        </div>
        <div className="flex justify-between border-t border-surface-500/20 pt-6">
          <div className="flex items-center gap-2 text-primary-700">
            <CalendarIcon className="size-5 text-surface-500" />
            <span className="text-surface-500">{formatDate(postedAt)}</span>
          </div>
          <Link href={`/blog/post/${id}`}>
            <ArrowRight className="text-primary-700" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function CategoryFilter({
  category,
  setCategory
}: {
  category: string;
  setCategory: (cat: string) => void;
}) {
  const articleCategories = [
    "All Posts",
    "Cleaning Tips",
    "Product Review",
    "Professional Tips",
    "Organizations",
    "Eco-Friendly"
  ];

  return (
    <div className="overflow-x-auto lg:flex lg:justify-center no-scrollbar">
      <div className="flex transition-transform duration-300 ease-in-out gap-6 md:gap-8 text-nowrap mx-auto">
        {articleCategories.map((cat, idx) => (
          <div
            key={idx}
            className={`px-4 text-body cursor-pointer py-2 border transition-all rounded-lg ${
              category === cat
                ? "bg-primary-700 text-white"
                : " bg-transparent border border-primary-700 text-primary-700"
            }`}
            onClick={(e) => {
              e.preventDefault();
              setCategory(cat);
            }}
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
}
