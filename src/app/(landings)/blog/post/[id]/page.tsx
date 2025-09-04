import React from "react";
import ArticleDetailsHero from "./_components/ArticleDetailsHero";
import { Article } from "@/lib/types";
import RelatedArticles from "./_components/RelatedArticles";
import axios from "@/lib/axios";

async function ArticlesDetailsPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: article } = (await axios.get(`articles/${id}`)) as {
    data: Article;
  };

  if (!article) {
    return (
      <main>
        <div>Article not found</div>
      </main>
    );
  }
  return (
    <>
      <ArticleDetailsHero {...article} />
      <RelatedArticles id={article.id} category={article.category} />
    </>
  );
}

export default ArticlesDetailsPage;
