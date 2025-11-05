import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Filter, PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import BlogCard from "../components/BlogCard";

const filterOptions = [
  { value: "all", label: "All Status" },
  { value: "PUBLISHED", label: "Published" },
  { value: "draft", label: "Draft" },
  { value: "archived", label: "Archived" }
];

const blogPosts = [
  {
    id: 1,
    title: "10 Essential Spring Cleaning Tips for Your Home",
    author: "Sarah Johnson",
    date: "Mar 14, 2025",
    description:
      "Discover the best spring cleaning tips to make your home sparkle this season.",
    tags: ["cleaning tips", "spring cleaning", "home care"],
    views: 1247,
    publishDate: "2025-08-14T22:00:00.000Z",
    status: "PUBLISHED",
    image: "/api/placeholder/400/176"
  },
  {
    id: 2,
    title: "10 Essential Spring Cleaning Tips for Your Home",
    author: "Sarah Johnson",
    date: "Mar 14, 2025",
    description:
      "Discover the best spring cleaning tips to make your home sparkle this season.",
    tags: ["cleaning tips", "spring cleaning", "home care"],
    views: 1247,
    publishDate: "2025-08-14T22:00:00.000Z",
    status: "PUBLISHED",
    image: "/api/placeholder/400/176"
  },
  {
    id: 3,
    title: "10 Essential Spring Cleaning Tips for Your Home",
    author: "Sarah Johnson",
    date: "Mar 14, 2025",
    description:
      "Discover the best spring cleaning tips to make your home sparkle this season.",
    tags: ["cleaning tips", "spring cleaning", "home care"],
    views: 0,
    publishDate: "2025-08-24T22:00:00.000Z",
    status: "SCHEDULED",
    image: "/api/placeholder/400/176"
  }
];

export default function BlogsPanel() {
  return (
    <div>
      <div className="flex items-center gap-8">
        <div className="flex items-center justify-start pl-4 text-sm rounded-lg bg-gray-50">
          <Filter className="size-4" />
          <Select
            options={filterOptions} // Use filterOptions here
            value={filterOptions[0]}
            placeholder="All Status"
            buttonClassName="border-none gap-2 font-medium"
            accent="secondary"
          />
        </div>
        <div>
          <Input
            placeholder="Search blogs"
            icon={<SearchIcon className="size-4" />}
          />
        </div>
        <Link className="ml-auto" href={"#"}>
          <Button
            size={"2xs"}
            variant={"secondary"}
            className="flex items-center justify-center gap-2 text-base"
          >
            <PlusIcon className="size-4" /> Create Blog Post
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
