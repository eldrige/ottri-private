"use server";
import { Article } from "../../../_utils/types";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { axios } from "@/lib/axios";

export default async function RelatedArticles({
  category,
  id
}: {
  category: string;
  id: number;
}) {
  const { data: articles } = (await axios.get(`/articles/published`)) as {
    data: Article[];
  };

  const relatedArticles = articles.filter(
    (article) => article.category === category && article.id !== id
  );

  if (relatedArticles.length < 1) {
    return "";
  }

  return (
    <section className="flex pt-12 flex-col gap-3">
      <div className="w-full text-center">
        <h1 className="text-heading-3 text-black md:text-heading-1">
          Related Articles
        </h1>
        <p className="text-subtitle text-surface-500">
          Continue learning with these helpful guides
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {(relatedArticles.length >= 3
          ? relatedArticles.slice(0, 3)
          : relatedArticles
        ).map((article) => (
          <RelatedArticleCard key={article.id} {...article} />
        ))}
      </div>
    </section>
  );
}

function RelatedArticleCard({
  title,
  thumbnail,
  id
}: Pick<Article, "title" | "thumbnail" | "id">) {
  return (
    <div className="flex rounded-lg flex-col gap-3 shadow-custom">
      <div>
        <Image
          width={500}
          height={500}
          src={thumbnail}
          alt={title + " image"}
          className="object-cover rounded-t-lg w-full aspect-[5.3/2.5]"
        />
      </div>
      <div className="flex flex-col gap-4 py-4 px-6">
        <h3 className="text-lg text-secondary-700">{title}</h3>
        <Link className="text-primary-700 flex gap-2" href={`../post/${id}`}>
          <p>Read more</p>
          <ArrowRight />
        </Link>
      </div>
    </div>
  );
}
