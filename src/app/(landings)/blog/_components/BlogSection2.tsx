import React from "react";
import LatestArticles, { CategoryFilter } from "./LatestArticles";

export default async function BlogSection2() {
  const response = await fetch(
    "http://ottri-backend-600e2b0645fc.herokuapp.com/api/v1/articles/published"
  );
  const data = await response.json();
  return (
    <section className="py-8 lg:py-24 flex flex-col gap-12">
      <CategoryFilter />
      <LatestArticles articlesData={data} />
    </section>
  );
}
