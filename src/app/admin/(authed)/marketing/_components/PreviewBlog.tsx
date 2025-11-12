import { ArticleType } from "@/app/(landings)/booking/new/types";
import { Button } from "@/components/ui/Button";
import { EyeIcon, X } from "lucide-react";
import React, { useState } from "react";
import ModalWrapper from "@/components/common/ModalWrapper";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { format } from "date-fns";
import EditBlog from "./EditBlog";

export default function PreviewBlog({
  article,
  onClose
}: {
  article: ArticleType;
  onClose: () => void;
}) {
  const [showEdit, setShowEdit] = useState(false);
  return (
    <ModalWrapper onClose={onClose}>
      <div className="w-full max-w-2xl p-8 space-y-4 bg-white border rounded-lg border-black/10">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex gap-8">
              <h3 className="flex items-center gap-2 text-xl font-bold text-secondary-700">
                <EyeIcon className="size-6" /> Blog Preview
              </h3>
              <span
                className={`px-3 py-1 text-sm rounded-lg capitalize ${
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
            <p className="mt-4 text-secondary-700/70">
              Preview how this blog post will appear on your website
            </p>
          </div>
          <button onClick={onClose}>
            <X className="size-8 text-secondary-700/70" />
          </button>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold font-poppins text-secondary-900">
          {article.title}
        </h1>

        {/* Article Content */}
        {/* Header Info */}
        <div className="flex items-center gap-4 text-sm text-secondary-700/70">
          {article.status === "PUBLISHED" && (
            <>
              <span>
                Published on {format(article.publicationDate, "MMMM d, y")}
              </span>
              <span className="w-2 rounded-full aspect-square bg-surface-300" />
            </>
          )}
          <span>by {article.author}</span>
          {typeof article.views === "number" && (
            <>
              <span className="w-2 rounded-full aspect-square bg-surface-300" />
              <span>{article.views} views</span>
            </>
          )}
        </div>
        {/* Excerpt */}
        <p className="text-secondary-700/70">{article.excerpt}</p>

        <hr className="text-black/10" />

        {/* Featured Image */}
        {article.thumbnail && (
          <div className="overflow-hidden rounded-lg">
            <Image
              src={article.thumbnail}
              width={800}
              height={256}
              alt={article.title || ""}
              className="object-cover w-full h-64"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>

        <hr className="text-black/10" />

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div>
            <h3 className="mb-2 font-medium text-secondary-700">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-secondary-100 text-secondary-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 flex justify-end *:flex-1 gap-8">
          <Button
            type="button"
            size={"xs"}
            variant="secondary-outline"
            className="rounded-lg"
            onClick={onClose}
          >
            Close Preview
          </Button>
          <Button
            type="button"
            size={"xs"}
            variant="secondary"
            className="rounded-lg"
            onClick={() => setShowEdit(true)}
          >
            Edit Post
          </Button>
        </div>
      </div>
      {showEdit && (
        <EditBlog article={article} onClose={() => setShowEdit(false)} />
      )}
    </ModalWrapper>
  );
}
