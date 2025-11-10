import { ArticleType } from "@/app/(landings)/booking/new/types";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import React from "react";
import ModalWrapper from "@/components/common/ModalWrapper";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

export default function PreviewBlog({
  article,
  onClose
}: {
  article: ArticleType;
  onClose: () => void;
}) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <ModalWrapper onClose={onClose}>
      <div className="border border-black/10 text-secondary-700 rounded-lg p-8 w-full max-w-4xl bg-white max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-secondary-700">
              Preview Blog Post
            </h2>
            <p className="text-secondary-500 mt-1">
              Preview how your blog post will appear to readers.
            </p>
          </div>
          <button onClick={onClose}>
            <X className="size-8 text-secondary-700/70" />
          </button>
        </div>

        {/* Article Content */}
        <div className="space-y-6">
          {/* Header Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-500 border-b pb-4">
            <span className="bg-secondary-700/10 px-3 py-1 rounded-full capitalize">
              {article.category}
            </span>
            <span>By {article.author}</span>
            <span>{formatDate(article.publicationDate || "")}</span>
            <span>{article.readingTime.toFixed(2)} min read</span>
            {article.isFeatured && (
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                Featured
              </span>
            )}
            <span
              className={`px-3 py-1 rounded-full capitalize ${
                article.status === "PUBLISHED"
                  ? "bg-success/10 text-success"
                  : article.status === "SCHEDULED"
                    ? "bg-info/10 text-info-text"
                    : "bg-secondary-700/10 text-secondary-700"
              }`}
            >
              {article.status.toLowerCase()}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-secondary-900">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-secondary-600 italic border-l-4 border-secondary-300 pl-4">
            {article.excerpt}
          </p>

          {/* Featured Image */}
          {article.thumbnail && (
            <div className="rounded-lg overflow-hidden">
              <Image
                src={article.thumbnail}
                width={800}
                height={256}
                alt={article.title || ""}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose max-w-none">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="font-medium text-secondary-700 mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Article Metadata */}
          <div className="border-t pt-4 text-xs text-secondary-400 space-y-1">
            <p>Article ID: {article.id}</p>
            <p>Created: {formatDate(article.createdAt || "")}</p>
            <p>Last Updated: {formatDate(article.updatedAt || "")}</p>
            <p>Publisher ID: {article.publisherId}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end">
          <Button
            type="button"
            variant="secondary"
            className="px-6 py-3 bg-[#2D3648] text-white rounded-lg"
            onClick={onClose}
          >
            Close Preview
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
