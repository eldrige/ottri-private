/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import React, { useState } from "react";
import ModalWrapper from "@/components/common/ModalWrapper";
import BlogForm from "./BlogForm";
import { ImageListType } from "react-images-uploading";
import { uploadImage } from "@/utils/uploadImage";

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

export default function CreateBlog({ onClose }: { onClose: () => void }) {
  const [blogData, setBlogData] = useState<AddBlogForm>({
    title: "",
    feature: "",
    excerpt: "",
    author: "",
    status: "draft",
    featuredImage: "",
    content: "",
    tags: []
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
      delete updated["featuredImage"];
      return updated;
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!blogData.title) newErrors.title = "Title is required";
    if (!blogData.feature) newErrors.feature = "Feature is required";
    if (!blogData.excerpt) newErrors.excerpt = "Excerpt is required";
    if (!blogData.author) newErrors.author = "Author is required";
    if (!blogData.content) newErrors.content = "Content is required";

    // Featured image validation
    if (image.length === 0 && !blogData.featuredImage) {
      newErrors.featuredImage = "Featured image is required";
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
      let imageUrl = blogData.featuredImage;
      if (image[0]?.file && !imageUrl) {
        const imageData = await uploadImage(image[0].file);
        setField("featuredImage", imageData.data.url);
        imageUrl = imageData.data.url;
      }

      // Format the data according to the expected API structure
      const formData = {
        ...blogData,
        featuredImage: imageUrl
      };

      // Send data to the API (replace with actual blog creation mutation)
      console.log("Creating blog post:", formData);
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
