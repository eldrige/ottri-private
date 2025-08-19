import ClockIcon from "@/components/icons/ClockIcon";
import { Button } from "@/components/ui/Button";
import { articlesData } from "@/lib/sampleData";
import { Article } from "@/lib/types";
import { CalendarIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function BlogSection1() {
  const [popularArticles] = articlesData.filter(
    (article) => article.isFeatured
  );
  return (
    <section className="py-8 lg:py-24 flex flex-col gap-8">
      <div className="text-center flex flex-col justify-center items-center space-y-4">
        <h2 className="text-heading-3 md:text-heading-2 font-semibold">
          Featured Article
        </h2>
        <FeaturedArticle {...popularArticles} />
      </div>
    </section>
  );
}

type FeaturedArticleProps = Article;

function FeaturedArticle({
  authorName,
  category,
  title,
  description,
  coverSrc,
  readTime,
  postedAt
}: FeaturedArticleProps) {
  return (
    <div className="flex flex-col  md:flex-row shadow-custom-strong rounded-lg">
      <div className="w-full flex md:flex-44/100">
        <Image
          src={coverSrc}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex self-center md:flex-56/100 flex-col text-left gap-3 md:gap-5 p-5 md:px-10 md:py-13">
        <span className="w-fit py-1 px-4 bg-surface-500/10 rounded-lg text">
          {category}
        </span>
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
            <CalendarIcon className="size-5 text-surface-500" />
            <span className="text-surface-500">{postedAt}</span>
          </div>
          <div>
            <ClockIcon className="*:size-5 text-surface-500" />
            <span className="text-surface-500">{readTime}</span>
          </div>
        </div>
        <Button className="w-fit py-2" size={"xs"}>
          Book with Maria
        </Button>
      </div>
    </div>
  );
}
