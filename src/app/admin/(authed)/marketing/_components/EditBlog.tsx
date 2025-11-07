/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import React, { useState } from "react";
import ModalWrapper from "@/components/common/ModalWrapper";
import { ArticleType } from "@/app/(landings)/booking/new/types";
import { useUpdateArticleMutation } from "../../_services/mutations";
import BlogForm from "./BlogForm";
import { ImageListType } from "react-images-uploading";
import { uploadImage } from "@/utils/uploadImage";

interface AddBlogForm {
  title: string;
  category: string;
  excerpt: string;
  author: string;
  isPublished: boolean;
  thumbnail: string;
  content: string;
  tags: string[];
  isFeatured: boolean;
  publicationDate: string;
}

export default function EditBlog({
  onClose,
  article
}: {
  onClose: () => void;
  article: ArticleType;
}) {
  const { mutateAsync } = useUpdateArticleMutation();

  // Store initial article data to compare against changes
  const initialBlogData: AddBlogForm = {
    title: article.title,
    category: article.category,
    excerpt: article.excerpt,
    author: article.author,
    isPublished: article.isPublished,
    thumbnail: article.thumbnail,
    content: article.content,
    tags: article.tags,
    isFeatured: article.isFeatured,
    publicationDate: article.publicationDate
  };

  const [blogData, setBlogData] = useState<AddBlogForm>({
    ...initialBlogData
  });

  const [image, setImage] = useState<ImageListType>([]);
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setField = (key: keyof typeof blogData, value: any) => {
    setBlogData((prev) => ({ ...prev, [key]: value }));
    // Clear error when field is updated
    if (errors[key]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    }
  };

  // Helper function to check if a field has been changed
  const isFieldChanged = (field: keyof typeof blogData): boolean => {
    if (field === "thumbnail") {
      return image.length > 0;
    }

    // Handle array comparisons
    if (
      Array.isArray(blogData[field]) &&
      Array.isArray(initialBlogData[field])
    ) {
      const currentArray = blogData[field] as any[];
      const initialArray = initialBlogData[field] as any[];

      if (currentArray.length !== initialArray.length) return true;

      // For simple arrays (like tags)
      if (
        typeof currentArray[0] === "string" ||
        typeof currentArray[0] === "number"
      ) {
        return (
          currentArray.some((item) => !initialArray.includes(item)) ||
          initialArray.some((item) => !currentArray.includes(item))
        );
      }

      return JSON.stringify(currentArray) !== JSON.stringify(initialArray);
    }

    // Default comparison for other fields
    return blogData[field] !== initialBlogData[field];
  };

  // Function to check if any field has changed
  const hasChanges = (): boolean => {
    return (
      Object.keys(blogData).some((key) =>
        isFieldChanged(key as keyof typeof blogData)
      ) || image.length > 0
    );
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!blogData.title) newErrors.title = "Title is required";
    if (!blogData.category) newErrors.category = "Category is required";
    if (!blogData.excerpt) newErrors.excerpt = "Excerpt is required";
    if (!blogData.author) newErrors.author = "Author is required";
    if (!blogData.content) newErrors.content = "Content is required";

    // Thumbnail validation
    if (!blogData.thumbnail) {
      newErrors.thumbnail = "Featured image is required";
    } else {
      try {
        new URL(blogData.thumbnail);
      } catch {
        newErrors.thumbnail = "Please enter a valid URL";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) return;

    setIsPending(true);

    try {
      // Handle image change
      let imageUrl = blogData.thumbnail;
      if (image[0]?.file && imageUrl === article.thumbnail) {
        const imageData = await uploadImage(image[0].file);
        setBlogData((prev) => ({ ...prev, thumbnail: imageData.data.url }));
        imageUrl = imageData.data.url;
      }

      // Initialize an empty object for formData
      const formData: Record<string, any> = {};

      // Only add fields that have changed to the formData object
      if (isFieldChanged("title")) formData.title = blogData.title;
      if (isFieldChanged("category")) formData.category = blogData.category;
      if (isFieldChanged("excerpt")) formData.excerpt = blogData.excerpt;
      if (isFieldChanged("author")) formData.author = blogData.author;
      if (isFieldChanged("isPublished"))
        formData.isPublished = blogData.isPublished;
      if (isFieldChanged("thumbnail")) formData.thumbnail = imageUrl;
      if (isFieldChanged("content")) formData.content = blogData.content;
      if (isFieldChanged("isFeatured"))
        formData.isFeatured = blogData.isFeatured;
      if (isFieldChanged("publicationDate"))
        formData.publicationDate = blogData.publicationDate;

      // Handle arrays separately
      if (isFieldChanged("tags")) formData.tags = blogData.tags;

      // Only send request if there are changes
      if (Object.keys(formData).length > 0) {
        // Send data to the API
        await mutateAsync({ articleId: article.id, ...formData });
        onClose();
      } else {
        // No changes to save, just close
        onClose();
      }
    } catch (error: any) {
      console.error("Failed to update blog post:", error);

      setErrors((prev) => ({
        ...prev,
        form:
          error?.response?.data?.message || "Network error. Please try again."
      }));
    } finally {
      setIsPending(false);
    }
  };

  return (
    <ModalWrapper onClose={onClose}>
      <div className="border border-black/10 text-secondary-700 rounded-lg p-8 w-full max-w-2xl bg-white max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-secondary-700">
              Edit Blog Post
            </h2>
            <p className="text-secondary-500 mt-1">
              Update the details of your blog post.
            </p>
          </div>
          <button onClick={onClose}>
            <X className="size-8 text-secondary-700/70" />
          </button>
        </div>

        <BlogForm
          formData={blogData}
          setField={setField}
          errors={errors}
          image={image}
          setImage={setImage}
        />

        {errors.form && (
          <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-md text-red-600">
            {errors.form}
          </div>
        )}

        <div className="mt-10 grid grid-cols-2 gap-6">
          <Button
            type="button"
            variant="secondary-outline"
            className="w-full py-3 border border-[#2D3648] rounded-lg"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            type="button"
            variant="secondary"
            className="w-full py-3 bg-[#2D3648] text-white rounded-lg"
            disabled={isPending || !hasChanges()}
          >
            {isPending
              ? "Saving..."
              : hasChanges()
                ? "Save Changes"
                : "No Changes"}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
