"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Save, Edit, Loader2, AlertCircle, XCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useJobPositionQuery } from "@/services/queries";
import { useForm } from "react-hook-form";
import PreviewMD from "../../marketing/_components/PreviewMD";
import { useUpdateJobPositionMutation } from "../../_services/mutations";
import { AxiosError } from "axios";

interface JobDescriptionForm {
  description: string;
}

export default function JobDescriptionPanel() {
  const {
    data: jobPosition,
    isLoading,
    error: jobPositionError
  } = useJobPositionQuery();
  const {
    mutateAsync: update,
    isPending,
    error: updateError
  } = useUpdateJobPositionMutation();
  const {
    register,
    watch,
    formState: { isValid }
  } = useForm<JobDescriptionForm>();
  const newDescription = watch("description");

  const [isPreview, setIspreview] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    try {
      await update({ description: newDescription });
      setIsEditing(false);
    } catch (error) {
      // Error is handled by updateError state
      console.error("Failed to update job description:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-gray-600">Loading job description...</p>
      </div>
    );
  }

  if (jobPositionError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
        <p className="text-red-800 font-medium mb-2">
          Failed to load job description
        </p>
        <p className="text-red-600 text-sm">
          {jobPositionError instanceof AxiosError
            ? jobPositionError.response?.data.message
            : jobPositionError instanceof Error
              ? jobPositionError.message
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
      <div className="space-y-4">
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
                  disabled={isPending}
                >
                  Preview
                </Button>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => setIsEditing(false)}
                  type="button"
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  size="xs"
                  className="flex items-center"
                  type="submit"
                  onClick={handleSave}
                  disabled={isPending || !isValid}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
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

        {updateError && (
          <div className="border border-red-200 bg-red-50 rounded p-4 flex items-start gap-3">
            <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-red-800 mb-1">
                Update Failed
              </h3>
              <p className="text-sm text-red-700">
                {updateError instanceof AxiosError
                  ? updateError.response?.data.message
                  : updateError instanceof Error
                    ? updateError.message
                    : "An error occurred while updating the job description. Please try again."}
              </p>
            </div>
          </div>
        )}

        {isEditing ? (
          <div>
            <Textarea
              {...register("description", { required: true })}
              defaultValue={jobPosition.description}
              rows={20}
              className="w-full font-mono text-sm"
              placeholder="Enter job description in Markdown format..."
              disabled={isPending}
            />
            <p className="text-sm text-gray-500 mt-2">
              Use Markdown syntax to format the job description. This will be
              displayed on the /apply/cleaner page.
            </p>
            {isPending && (
              <p className="text-sm text-gray-600 mt-2">Saving changes...</p>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="prose max-w-none prose-headings:text-gray-800 prose-strong:text-gray-800">
              <ReactMarkdown>{jobPosition.description}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
      {isPreview && (
        <PreviewMD
          content={newDescription}
          onClose={() => setIspreview(false)}
        />
      )}
    </>
  );
}
