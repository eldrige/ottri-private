import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { SearchIcon } from "lucide-react";
import React from "react";

export default function BlogHero() {
  return (
    <section className="pt-8 lg:pt-24 space-y-8">
      <div className="text-center flex flex-col justify-center items-center space-y-4">
        <Badge className="w-fit" variant="default" mode="outline">
          Ottri Blog
        </Badge>
        <h2 className="text-heading-3 md:text-heading-2 font-semibold">
          Cleaning Tips, Tricks & Expert Advice
        </h2>
        <p className="text-subtitle text-surface-500 max-w-6xl mx-auto">
          Get the latest insights from our professional cleaning experts. From
          deep cleaning guides to eco-friendly solutions, we share the knowledge
          that keeps your home sparkling.
        </p>
        <div className="flex relative w-full lg:min-w-sm lg:w-fit lg:mx-auto flex-col gap-4">
          <Input
            placeholder="Search articles..."
            className="placeholder:text-surface-500 text-caption border rounded-lg pl-10 pr-5 py-2 border-surface-500/20"
          />
          <SearchIcon className="absolute left-4 size-4 top-1/2 transform -translate-y-1/2 text-surface-500" />
        </div>
      </div>
    </section>
  );
}
