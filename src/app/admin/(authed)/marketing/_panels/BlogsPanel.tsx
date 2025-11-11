import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Filter, PlusIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import BlogCard from "../_components/BlogCard";
import CreateBlog from "../_components/CreateBlog";
import { useArticlesQuery } from "../../_services/queries";

const filterOptions = [
  { value: "", label: "All Status" },
  { value: "PUBLISHED", label: "Published" },
  { value: "DRAFT", label: "Draft" },
  { value: "ARCHIVED", label: "Archived" }
];

export default function BlogsPanel() {
  const [showAdd, setShowAdd] = useState(false);
  const { data: articles } = useArticlesQuery();
  return (
    <div>
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
        <div className="flex items-center justify-start pl-4 text-sm rounded-lg bg-gray-50">
          <Filter className="size-4" />
          <Select
            options={filterOptions}
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
        <Button
          size={"2xs"}
          variant={"secondary"}
          className="flex items-center justify-center gap-2 text-base ml-auto w-full lg:w-auto"
          onClick={() => setShowAdd(true)}
        >
          <PlusIcon className="size-4" /> Create Blog Post
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
        {articles?.map((post) => (
          <BlogCard key={post.id} article={post} />
        ))}
      </div>
      {showAdd && <CreateBlog onClose={() => setShowAdd(false)} />}
    </div>
  );
}
