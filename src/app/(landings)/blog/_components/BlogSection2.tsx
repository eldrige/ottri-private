import React from "react";
import LatestArticles, { CategoryFilter } from "./LatestArticles";
import axios from "@/lib/axios";

export default async function BlogSection2() {
  const { data } = await axios.get("/articles/published");
  return (
    <section className="py-8 lg:py-24 flex flex-col gap-12">
      <CategoryFilter />
      <LatestArticles articlesData={data} />
    </section>
  );
}
