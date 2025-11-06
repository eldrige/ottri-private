import { Input } from "@/components/ui/Input";
import React from "react";
import Select from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { ImageUpload } from "@/app/_components/ImageUpload";
import { ImageListType } from "react-images-uploading";
import { TagInput } from "@/components/ui/TagInput";

interface AddBlogForm {
  title: string;
  feature: string;
  excerpt: string;
  author: string;
  status: string;
  featuredImage: string;
  content: string;
  tags: string[];
}

interface BlogFormProps {
  formData: AddBlogForm;
  setField: (field: keyof AddBlogForm, value: unknown) => void;
  errors: {
    [key in keyof AddBlogForm]?: string;
  };
  image: ImageListType;
  setImage: (value: ImageListType) => void;
}

// Feature options
const featureOptions = [
  { label: "Home Cleaning", value: "home-cleaning" },
  { label: "Deep Cleaning", value: "deep-cleaning" },
  { label: "Office Cleaning", value: "office-cleaning" },
  { label: "Spring Cleaning", value: "spring-cleaning" },
  { label: "Move-in/Move-out", value: "move-cleaning" }
];

// Status options
const statusOptions = [
  { label: "Draft", value: "draft" },
  { label: "Published", value: "published" },
  { label: "Scheduled", value: "scheduled" }
];

export default function BlogForm({
  formData,
  setField,
  errors,
  image,
  setImage
}: BlogFormProps) {
  return (
    <form className="space-y-6">
      {/* Title and Feature */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium text-secondary-700">
            Title *
          </label>
          <Input
            placeholder="Enter blog post title..."
            value={formData.title}
            onChange={(e) => setField("title", e.target.value)}
            className="w-full p-4 rounded-lg bg-gray-50"
            error={errors.title}
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-secondary-700">
            Feature *
          </label>
          <Select
            accent="secondary"
            placeholder="Select blog feature"
            options={featureOptions}
            value={featureOptions.find((i) => i.value === formData.feature)}
            onChange={(value) => setField("feature", value.value)}
            className="w-full"
            error={errors.feature}
          />
        </div>
      </div>

      {/* Excerpt */}
      <div>
        <label className="block mb-2 font-medium text-secondary-700">
          Excerpt *
        </label>
        <Textarea
          placeholder="Brief description of the blog post"
          value={formData.excerpt}
          onChange={(e) => setField("excerpt", e.target.value)}
          className="w-full p-4 rounded-lg bg-gray-50"
          rows={3}
          error={errors.excerpt}
        />
      </div>

      {/* Author and Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium text-secondary-700">
            Author *
          </label>
          <Input
            placeholder="Author name"
            value={formData.author}
            onChange={(e) => setField("author", e.target.value)}
            className="w-full p-4 rounded-lg bg-gray-50"
            error={errors.author}
          />
        </div>
        <div>
          <label className="block mb-2 font-medium text-secondary-700">
            Status *
          </label>
          <Select
            accent="secondary"
            placeholder="Draft"
            options={statusOptions}
            value={statusOptions.find((i) => i.value === formData.status)}
            onChange={(value) => setField("status", value.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Featured Image */}
      <div>
        <label className="block mb-2 font-medium text-secondary-700">
          Featured Image *
        </label>
        <div className="space-y-4">
          <ImageUpload
            image={image}
            setImage={setImage}
            placeholderImageUrl={formData.featuredImage}
            error={errors.featuredImage}
          />
        </div>
      </div>

      {/* Content */}
      <div>
        <label className="block mb-2 font-medium text-secondary-700">
          Content *
        </label>
        <Textarea
          placeholder="Write your blog content here"
          value={formData.content}
          onChange={(e) => setField("content", e.target.value)}
          className="w-full p-4 rounded-lg bg-gray-50"
          rows={8}
          error={errors.content}
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block mb-2 font-medium text-secondary-700">
          Tags *
        </label>
        <TagInput
          tags={formData.tags}
          setTags={(value) => setField("tags", value)}
          placeholder="Add a Tag..."
          error={errors.tags}
        />
      </div>
    </form>
  );
}
