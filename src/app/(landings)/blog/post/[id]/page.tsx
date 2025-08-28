import React from "react";
import ArticleDetails from "./_components/ArticleDetailsHero";
import { Article } from "@/lib/types";
import RelatedArticles from "./_components/RelatedArticles";

async function ArticlesDetailsPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const responseArticleDetails = await fetch(
    `http://ottri-backend-600e2b0645fc.herokuapp.com/api/v1/articles/${id}`
  );
  const article = (await responseArticleDetails.json()) as Article;
  if (!article) {
    return (
      <main>
        <div>Article not found</div>
      </main>
    );
  }
  return (
    <>
      <ArticleDetails {...article} />
      <RelatedArticles id={article.id} category={article.category} />
    </>
  );
}

export default ArticlesDetailsPage;
