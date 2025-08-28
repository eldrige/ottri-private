import ClockIcon from "@/components/icons/ClockIcon";
import { Button } from "@/components/ui/Button";
import { Article } from "@/lib/types";
import { converReadTime, formatDate } from "@/lib/utils";
import { CalendarIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import axios from "@/lib/axios";

export default async function BlogSection1() {
  const { data } = (await axios.get("/articles/published")) as {
    data: Article[];
  };

  const [popularArticle] = data.filter((article) => article.isFeatured);
  return (
    <section className="py-8 lg:py-24 flex flex-col gap-8">
      <div className="text-center flex flex-col justify-center items-center space-y-4">
        <h2 className="text-heading-3 md:text-heading-2 font-semibold">
          Featured Article
        </h2>
        <FeaturedArticle {...popularArticle} />
      </div>
    </section>
  );
}

type FeaturedArticleProps = Article;

function FeaturedArticle({
  author: authorName,
  title,
  content: description,
  thumbnail: coverSrc,
  readingTime: readTime,
  publicationDate: postedAt
}: FeaturedArticleProps) {
  return (
    <div className="flex flex-col gap-8 md:gap-0 md:flex-row md:shadow-custom rounded-4xl">
      <div className="w-full flex md:flex-44/100">
        <Image
          width={500}
          height={500}
          src={coverSrc}
          alt={title}
          className="w-full h-full object-cover rounded-lg md:rounded-l-4xl"
        />
      </div>
      <div className="flex self-center md:flex-56/100 flex-col text-left gap-4 md:gap-5 md:px-10 md:py-13">
        <span className="w-fit py-1 px-4 bg-secondary-700/10 rounded-lg text">
          Popular
        </span>
        <h2 className="text-heading-4 md:text-heading-3 text-secondary-700 font-semibold">
          {title}
        </h2>
        <p className="text-subtitle  text-surface-500 max-w-6xl mx-auto">
          {description.slice(0, 200)}...
        </p>
        <div className="flex flex-col md:flex-row md:items-center gap-4 mt-2 text-surface-500 text-nowrap *:flex *:gap-2 *:items-center">
          <div>
            <UserIcon className="size-5 text-surface-500" />
            <span className="text-surface-500">{authorName}</span>
          </div>
          <div>
            <CalendarIcon className="size-5 text-surface-500" />
            <span className="text-surface-500">{formatDate(postedAt)}</span>
          </div>
          <div>
            <ClockIcon className="*:size-5 text-surface-500" />
            <span className="text-surface-500">{converReadTime(readTime)}</span>
          </div>
        </div>
        <Button className="md:w-fit py-2" size={"xs"}>
          Book with Ottri
        </Button>
      </div>
    </div>
  );
}
