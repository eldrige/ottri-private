import React from "react";
import BlogSection3 from "./_components/BlogSection3";
import BlogSection4 from "./_components/BlogSection4";

export default function BlogLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="container pb-24 mx-auto px-6">{children}</div>
      <BlogSection3 />
      <div className="container mx-auto px-6">
        <BlogSection4 />
      </div>
    </main>
  );
}
