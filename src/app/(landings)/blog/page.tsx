import React from "react";
import BlogHero from "./_components/BlogHero";
import BlogSection1 from "./_components/BlogSection1";
import { getPublishedArticles } from "./_utils/queries";

export default async function page() {
  const articles = await getPublishedArticles();
  return (
    <>
      <BlogHero />
      <BlogSection1 articles={articles} />
    </>
  );
}
