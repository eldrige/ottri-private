import React from "react";
import BlogSection2 from "./_components/BlogSection2";
import BlogSection3 from "./_components/BlogSection3";

export default function BlogLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="container pb-24 mx-auto px-6">{children}</div>
      <BlogSection2 />
      <div className="container mx-auto px-6">
        <BlogSection3 />
      </div>
    </main>
  );
}
