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
      <div className="border border-black/10 rounded-lg p-8 w-full max-w-2xl bg-white space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex gap-8">
              <h3 className="text-xl font-bold text-secondary-700 flex items-center gap-2">
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
            <p className="text-secondary-700/70 mt-4">
              Preview how this blog post will appear on your website
            </p>
          </div>
          <button onClick={onClose}>
            <X className="size-8 text-secondary-700/70" />
          </button>
        </div>

        {/* Title */}
        <h1 className="font-poppins text-3xl font-bold text-secondary-900">
          {article.title}
        </h1>

        {/* Article Content */}
        {/* Header Info */}
        <div className="flex items-center gap-4 text-secondary-700/70">
          <span>
            Published on {format(article.publicationDate, "MMMM d, y")}
          </span>
          <span className="w-2 aspect-square rounded-full bg-surface-300" />
          <span>by {article.author}</span>
          <span className="w-2 aspect-square rounded-full bg-surface-300" />
          <span>{Math.floor(Math.random() * 9999)} views</span>
          {/* TODO: make it use actual views */}
        </div>
        {/* Excerpt */}
        <p className="text-secondary-700/70">{article.excerpt}</p>

        <hr className="text-black/10" />

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
        <div className="prose">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>

        <hr className="text-black/10" />

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div>
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
