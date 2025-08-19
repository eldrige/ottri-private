import React from "react";
import BlogHero from "./_components/BlogHero";
import BlogSection1 from "./_components/BlogSection1";
import BlogSection2 from "./_components/BlogSection2";

export default function page() {
  return (
    <main>
      <div className="container mx-auto px-6">
        <BlogHero />
        <BlogSection1 />
        <BlogSection2 />
      </div>
    </main>
  );
}
