/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import React, { useState } from "react";
import ModalWrapper from "@/components/common/ModalWrapper";
import BlogForm from "./BlogForm";
import { ImageListType } from "react-images-uploading";
import { uploadImage } from "@/utils/uploadImage";
import { useCreateArticleMutation } from "../../_services/mutations";
import { NewArticleType } from "@/app/(landings)/booking/new/types";
import { addDays } from "date-fns";

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

export default function CreateBlog({ onClose }: { onClose: () => void }) {
  const { mutateAsync } = useCreateArticleMutation();

  const [blogData, setBlogData] = useState<AddBlogForm>({
    title: "",
    category: "",
    excerpt: "",
    author: "",
    isPublished: false,
    thumbnail: "",
    content: "",
    tags: [],
    isFeatured: false,
    publicationDate: addDays(new Date(), 2).toISOString()
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

  const handleSetImage = (image: ImageListType) => {
    setImage(image);
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated["thumbnail"];
      return updated;
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!blogData.title) newErrors.title = "Title is required";
    if (!blogData.category) newErrors.category = "Category is required";
    if (!blogData.excerpt) newErrors.excerpt = "Excerpt is required";
    if (!blogData.author) newErrors.author = "Author is required";
    if (!blogData.content) newErrors.content = "Content is required";

    // Featured image validation
    if (image.length === 0 && !blogData.thumbnail) {
      newErrors.thumbnail = "Featured image is required";
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
      // Upload image
      let imageUrl = blogData.thumbnail;
      if (image[0]?.file && !imageUrl) {
        const imageData = await uploadImage(image[0].file);
        imageUrl = imageData.data.url;
      }

      // Format the data according to NewArticleType
      const formData: NewArticleType = {
        title: blogData.title,
        category: blogData.category,
        excerpt: blogData.excerpt,
        author: blogData.author,
        isPublished: blogData.isPublished,
        thumbnail: imageUrl,
        content: blogData.content,
        tags: blogData.tags,
        isFeatured: blogData.isFeatured,
        publicationDate: blogData.publicationDate
      };

      await mutateAsync(formData);
      onClose();
    } catch (error: any) {
      console.error("Failed to create blog post:", error);

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
              Create New Blog Post
            </h2>
            <p className="text-secondary-500 mt-1">
              Fill in the details below to create your blog post.
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
          setImage={handleSetImage}
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
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Add Blog Post"}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
