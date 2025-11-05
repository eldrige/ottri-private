import CalendarIcon from "@/components/icons/CalendarIcon";
import CheckBrokenIcon from "@/components/icons/CheckBrokenIcon";
import EditIcon from "@/components/icons/EditIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import { Button } from "@/components/ui/Button";
import { format } from "date-fns";
import { EyeIcon } from "lucide-react";
import React from "react";

interface BlogType {
  id: number;
  title: string;
  author: string;
  date: string;
  description: string;
  tags: string[];
  views: number;
  publishDate: string;
  status: string;
  image: string;
}

export default function BlogCard({ post }: { post: BlogType }) {
  return (
    <div className="gap-4 p-4 space-y-6 border rounded-lg border-black/10">
      <div className="bg-black rounded-lg h-44"></div>

      <div>
        <div className="flex items-center gap-3">
          <h5 className="flex-1 font-medium">{post.title}</h5>
          {post.status === "PUBLISHED" && (
            <CheckBrokenIcon className="size-4 text-success" />
          )}
          <span
            className={`px-3 py-1 text-sm rounded-lg ${
              post.status === "PUBLISHED"
                ? "text-success bg-success/10"
                : "text-info-text bg-info/15"
            }`}
          >
            {post.status === "PUBLISHED" ? "Published" : "Scheduled"}
          </span>
        </div>
        <p className="mt-2 text-xs text-secondary-700/70">
          by {post.author} • {post.date}
        </p>
      </div>

      <p className="text-xs text-secondary-700/70">{post.description}</p>

      <div className="flex gap-1">
        {post.tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-3 py-1 text-sm border rounded-lg border-black/10"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm font-medium text-secondary-700/70">
        <p className="flex items-center">
          <EyeIcon className="mr-2 size-4" />
          {post.views} {post.views === 1 ? "view" : "views"}
        </p>
        <p className="flex items-center">
          <CalendarIcon className="mr-2 size-4" />
          {format(post.publishDate, "d MMMM yyyy")}
        </p>
      </div>

      <div className="flex *:flex-1 gap-4">
        <Button
          variant={"secondary-outline"}
          size={"2xs"}
          className="flex items-center justify-center gap-1 border-black/10"
        >
          <EyeIcon className="size-4" />
          Preview
        </Button>
        <Button
          variant={"secondary-outline"}
          size={"2xs"}
          className="flex items-center justify-center gap-1 border-black/10"
        >
          <EditIcon className="size-4" />
          Edit
        </Button>
        <Button
          variant={"destructive"}
          size={"2xs"}
          className="flex items-center justify-center gap-1"
        >
          <TrashIcon className="size-4" />
          Delete
        </Button>
      </div>
    </div>
  );
}
