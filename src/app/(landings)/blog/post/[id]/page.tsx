import React from "react";
import ArticleDetailsHero from "./_components/ArticleDetailsHero";
import { Article } from "@/lib/types";
import RelatedArticles from "./_components/RelatedArticles";
import { getArticleById } from "../../_utils/queries";

async function ArticlesDetailsPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article: Article = await getArticleById(id);

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
