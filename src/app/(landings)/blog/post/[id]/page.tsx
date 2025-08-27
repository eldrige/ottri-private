"use client";
import React from "react";
import { articlesData } from "@/lib/sampleData";
import { useParams } from "next/navigation";
import ArticleDetails from "./_components/ArticleDetailsHero";

function ServicesDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const article = articlesData.find((elem) => elem.id === Number(id));
  if (!article) {
    return (
      <main>
        <div>Article not found</div>
      </main>
    );
  }
  return (
    <main>
      <div className="container mx-auto px-6">
        <ArticleDetails title={article.title} />
      </div>
    </main>
  );
}

export default ServicesDetailsPage;
