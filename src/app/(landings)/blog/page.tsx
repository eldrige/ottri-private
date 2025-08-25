import React from "react";
import BlogHero from "./_components/BlogHero";
import BlogSection1 from "./_components/BlogSection1";
import BlogSection2 from "./_components/BlogSection2";
import BlogSection3 from "./_components/BlogSection3";
import BlogSection4 from "./_components/BlogSection4";

export default function page() {
  return (
    <main>
      <div className="container mx-auto px-6">
        <BlogHero />
        <BlogSection1 />
        <BlogSection2 />
      </div>
      <BlogSection3 />
      <div className="container mx-auto px-6">
        <BlogSection4 />
      </div>
    </main>
  );
}
