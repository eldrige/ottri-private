"use client";
import { Badge } from "@/components/ui/Badge";
import { Article } from "@/lib/types";
import { converReadTime, formatDate, shareLinks } from "@/lib/utils";
import {
  ArrowLeft,
  CalendarIcon,
  ClockIcon,
  Share2Icon,
  UserIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SpringCleaningChecklist from "./SpringCleaningChecklist";

export default function ArticleDetailsHero({
  title,
  category,
  excerpt,
  author,
  publicationDate,
  readingTime,
  thumbnail,
  content,
  tags
}: Pick<
  Article,
  | "title"
  | "category"
  | "excerpt"
  | "author"
  | "publicationDate"
  | "readingTime"
  | "thumbnail"
  | "content"
  | "tags"
  | "id"
>) {
  return (
    <section className="pt-8 lg:pt-24 space-y-8">
      <Link
        href="/blog"
        className="text-primary-500 text-lg mr-auto items-center gap-4 flex"
      >
        <ArrowLeft size={24} /> Back to Blog
      </Link>
      <Badge className="w-fit" variant="default" mode="outline">
        {category}
      </Badge>
      <div>
        <h1 className="text-heading-3 text-black md:text-heading-1 text-start">
          {title}
        </h1>
        <p className="text-subtitle text-surface-500">{excerpt}</p>
      </div>
      <div className="w-full h-0.25 bg-surface-500/30" />
      <div className="w-full flex gap-5 flex-col md:flex-row justify-between py-2">
        <div className="flex flex-col gap-4 md:gap-8 md:flex-row md:items-center mt-2 text-surface-500 text-nowrap *:flex *:gap-2 *:items-center">
          <div>
            <UserIcon className="size-6 text-surface-500" />
            <span className="text-surface-500">{author}</span>
          </div>
          <div>
            <CalendarIcon className="size-6 text-surface-500" />
            <span className="text-surface-500">
              {formatDate(publicationDate)}
            </span>
          </div>
          <div>
            <ClockIcon className="size-6 text-surface-500" />
            <span className="text-surface-500">
              {converReadTime(readingTime)}
            </span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            shareLinks(window.location.href);
          }}
          className="flex md:justify-end cursor-pointer"
        >
          <div className="w-full lg:w-fit items-center justify-center px-3 py-2 text-body border gap-3 text-primary-700 rounded-lg border-primary-700 flex">
            <Share2Icon className="size-6" />
            <p>Share </p>
          </div>
        </button>
      </div>
      <div className="w-full h-0.25 bg-surface-500/30" />
      <div className="flex">
        <Image
          width={1000}
          className="lg:aspect-[3/1.2] aspect-2/1 shadow-custom w-full h-full object-cover rounded-lg md:rounded-lg"
          height={1000}
          src={thumbnail}
          alt={title + " image"}
        />
      </div>
      <p className="text-subtitle text-surface-500">{content}</p>
      <SpringCleaningChecklist />
      {tags.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-lg text-secondary-500">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="w-fit py-1 px-4 text-secondary-700 bg-secondary-700/10 rounded-lg text-caption"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
