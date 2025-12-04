"use client";

import { useJobPositionQuery } from "@/services/queries";
import { Loader2, AlertCircle, Calendar, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useParams, useRouter } from "next/navigation";
import ApplyForm from "./components/ApplyForm";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = Number(params.id);

  const {
    data: jobPosition,
    isLoading,
    error
  } = useJobPositionQuery({ id: jobId });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-red-800 font-medium mb-2">
            Failed to load job details
          </p>
          <p className="text-red-600 text-sm">
            {error instanceof Error
              ? error.message
              : "An error occurred while fetching the job details. Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  if (!jobPosition) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Job Position Not Found
          </h3>
          <p className="text-gray-600">
            This job position could not be found. Please check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 text-secondary-700">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Job Openings
      </button>

      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {jobPosition.title}
        </h1>

        <div className="flex items-center gap-2 text-gray-600 mb-6">
          <Calendar className="w-5 h-5" />
          <span>
            Application Deadline:{" "}
            <span className="font-medium">
              {new Date(jobPosition.applicationDeadline).toLocaleDateString()}
            </span>
          </span>
        </div>

        <div className="prose max-w-none prose-headings:text-secondary-700 prose-strong:text-secondary-700">
          <ReactMarkdown>{jobPosition.description}</ReactMarkdown>
        </div>
      </div>

      <ApplyForm jobPositionId={jobPosition.id} />
    </div>
  );
}
