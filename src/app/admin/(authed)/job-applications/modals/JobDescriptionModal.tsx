"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Save, Edit, Loader2, XCircle, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useForm } from "react-hook-form";
import PreviewMD from "../../marketing/_components/PreviewMD";
import { useUpdateJobPositionMutation } from "../../_services/mutations";
import { AxiosError } from "axios";
import ModalWrapper from "@/components/common/ModalWrapper";
import { JobPositionType } from "@/app/admin/types";

interface JobDescriptionForm {
  description: string;
}

interface JDMProps {
  jobPosition: JobPositionType;
  onClose: () => void;
}

export default function JobDescriptionModal({
  jobPosition,
  onClose
}: JDMProps) {
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
  const hasDescChanged = newDescription !== jobPosition?.description;

  const [isPreview, setIspreview] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    try {
      await update({ description: newDescription, id: jobPosition.id });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update job description:", error);
    }
  };

  return (
    <ModalWrapper onClose={onClose}>
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl p-6">
        <button onClick={onClose} className="absolute p-2 right-2 top-4">
          <X className="w-6 h-6" />
        </button>
        <div className="space-y-4">
          <div className="flex flex-wrap justify-between items-center border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold">Job Description Editor</h2>
            <div className="flex gap-2 flex-wrap pr-8">
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
                    disabled={isPending || !isValid || !hasDescChanged}
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
                <>
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
                </>
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
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
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
      </div>
    </ModalWrapper>
  );
}
