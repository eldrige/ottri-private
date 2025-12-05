"use client";
import React, { useState } from "react";
import { useCreateJobPositionMutation } from "../../_services/mutations";
import ModalWrapper from "@/components/common/ModalWrapper";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useForm } from "react-hook-form";
import { X, Save, Loader2, XCircle, Eye } from "lucide-react";
import { AxiosError } from "axios";
import PreviewMD from "../../marketing/_components/PreviewMD";

interface JobPositionFormData {
  title: string;
  description: string;
  applicationDeadline: string;
}

export default function CreateJobPositionModal({
  onClose
}: {
  onClose: () => void;
}) {
  const {
    mutateAsync: create,
    isPending,
    error
  } = useCreateJobPositionMutation();
  const [showPreview, setShowPreview] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<JobPositionFormData>({
    mode: "onChange",
    defaultValues: {
      applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
    }
  });

  const description = watch("description");

  const onSubmit = async (data: JobPositionFormData) => {
    try {
      await create(data);
      onClose();
    } catch (error) {
      console.error("Failed to create job position:", error);
    }
  };

  return (
    <ModalWrapper onClose={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Create New Job Position
            </h2>
            <Button
              type="button"
              variant="ghost-secondary"
              size="xs"
              onClick={onClose}
              disabled={isPending}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="border border-red-200 bg-red-50 rounded-lg p-4 flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-800 mb-1">
                  Failed to Create Job Position
                </h3>
                <p className="text-sm text-red-700">
                  {error instanceof AxiosError
                    ? error.response?.data.message
                    : error instanceof Error
                      ? error.message
                      : "An error occurred while creating the job position. Please try again."}
                </p>
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Job Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Job Title <span className="text-red-500">*</span>
              </label>
              <Input
                id="title"
                type="text"
                {...register("title", {
                  required: "Job title is required",
                  minLength: {
                    value: 3,
                    message: "Job title must be at least 3 characters"
                  }
                })}
                placeholder="e.g., House Cleaner"
                disabled={isPending}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Application Deadline */}
            <div>
              <label
                htmlFor="applicationDeadline"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Application Deadline <span className="text-red-500">*</span>
              </label>
              <Input
                id="applicationDeadline"
                type="date"
                {...register("applicationDeadline", {
                  required: "Application deadline is required",
                  validate: (value) => {
                    const selectedDate = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return (
                      selectedDate >= today ||
                      "Deadline must be today or in the future"
                    );
                  }
                })}
                disabled={isPending}
                className={errors.applicationDeadline ? "border-red-500" : ""}
              />
              {errors.applicationDeadline && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.applicationDeadline.message}
                </p>
              )}
            </div>

            {/* Job Description */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Description (Markdown){" "}
                  <span className="text-red-500">*</span>
                </label>
                <Button
                  type="button"
                  variant="ghost-secondary"
                  size="xs"
                  onClick={() => setShowPreview(true)}
                  disabled={isPending || !description}
                  className="flex items-center gap-1"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
              </div>
              <Textarea
                id="description"
                {...register("description", {
                  required: "Job description is required",
                  minLength: {
                    value: 50,
                    message: "Description must be at least 50 characters"
                  }
                })}
                rows={15}
                placeholder="Enter job description in Markdown format...

Example:
## About the Role
We are looking for a dedicated house cleaner...

## Responsibilities
- Clean and sanitize rooms
- Vacuum and mop floors

## Requirements
- Previous cleaning experience
- Attention to detail"
                disabled={isPending}
                className={`font-mono text-sm ${errors.description ? "border-red-500" : ""}`}
              />
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.description.message}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Use Markdown syntax to format the job description. This will be
                displayed on the job application page.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="secondary"
              disabled={isPending || !isValid}
              className="flex items-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Create Job Position
                </>
              )}
            </Button>
          </div>
        </form>

        {showPreview && (
          <PreviewMD
            content={description}
            onClose={() => setShowPreview(false)}
          />
        )}
      </div>
    </ModalWrapper>
  );
}
