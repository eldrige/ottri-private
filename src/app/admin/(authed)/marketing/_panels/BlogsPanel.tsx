import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Filter, PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const filterOptions = [
  { value: "all", label: "All Status" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
  { value: "archived", label: "Archived" }
];

export default function BlogsPanel() {
  return (
    <div>
      <div className="flex items-center gap-8">
        <div className="flex items-center justify-start text-sm bg-gray-50 rounded-lg pl-4">
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
            className="flex gap-2 items-center text-base justify-center"
          >
            <PlusIcon className="size-4" /> Create Blog Post
          </Button>
        </Link>
      </div>
    </div>
  );
}
