"use client";

import PanelViewer from "../_components/PanelViewer";
import React, { useState } from "react";
import BlogsPanel from "./_panels/BlogsPanel";

export default function MarketingPage() {
  const [activeView, setActiveView] = useState<string>("blogs");
  const views = [
    { content: "Blogs", viewName: "blogs" },
    { content: "Discounts", viewName: "discounts" },
    { content: "Newsletter", viewName: "newsletter" },
    { content: "Reviews", viewName: "reviews" }
  ];

  return (
    <main className="w-full h-full py-4 px-4 lg:px-6 space-y-4">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2">
        <h3 className="text-heading-4">Marketing</h3>
        <p className="text-secondary-700/70">Welcome back Admin</p>
      </div>
      <hr className="my-4 text-black/10 hidden lg:block" />
      <div className="space-y-2.5">
        <h3 className="text-heading-4">Marketing Dashboard</h3>
        <p>Manage blog content and promotional discounts</p>
      </div>
      <PanelViewer
        views={views}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      {activeView === "blogs" && <BlogsPanel />}
    </main>
  );
}
