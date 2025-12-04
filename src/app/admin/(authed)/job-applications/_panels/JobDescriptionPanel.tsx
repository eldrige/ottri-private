"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Save, Edit, Loader2, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useJobPositionQuery } from "../../_services/queries";
import { useForm } from "react-hook-form";
import PreviewMD from "../../marketing/_components/PreviewMD";

interface JobDescriptionForm {
  description: string;
}

export default function JobDescriptionPanel() {
  const { data: jobPosition, isLoading, error } = useJobPositionQuery();
  const { register, handleSubmit, watch } = useForm<JobDescriptionForm>();
  const newDescription = watch("description");

  const [isPreview, setIspreview] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (data: JobDescriptionForm) => {
    console.log(data);
    // TODO: Save to API
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-gray-600">Loading job description...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
        <p className="text-red-800 font-medium mb-2">
          Failed to load job description
        </p>
        <p className="text-red-600 text-sm">
          {error instanceof Error
            ? error.message
            : "An error occurred while fetching the job description"}
        </p>
      </div>
    );
  }

  if (!jobPosition) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
        <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          No Job Position Found
        </h3>
        <p className="text-gray-600">
          The job position data could not be found. Please contact support.
        </p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Job Description Editor</h2>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="secondary-outline"
                  size="xs"
                  onClick={() => setIspreview(true)}
                  type="button"
                >
                  Preview
                </Button>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => setIsEditing(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  size="xs"
                  className="flex items-center"
                  type="submit"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                variant="secondary"
                size="xs"
                onClick={() => setIsEditing(true)}
                className="flex items-center"
                type="button"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
        </div>

        {isEditing ? (
          <div>
            <Textarea
              {...register("description")}
              defaultValue={jobPosition.description}
              rows={20}
              className="w-full font-mono text-sm"
              placeholder="Enter job description in Markdown format..."
            />
            <p className="text-sm text-gray-500 mt-2">
              Use Markdown syntax to format the job description. This will be
              displayed on the /apply/cleaner page.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="prose max-w-none prose-headings:text-gray-800 prose-strong:text-gray-800">
              <ReactMarkdown>{jobPosition.description}</ReactMarkdown>
            </div>
          </div>
        )}
      </form>
      {isPreview && (
        <PreviewMD
          content={newDescription}
          onClose={() => setIspreview(false)}
        />
      )}
    </>
  );
}
