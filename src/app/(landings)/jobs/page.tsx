"use client";

import { useJobPositionsQuery } from "@/services/queries";
import {
  Loader2,
  AlertCircle,
  Briefcase,
  Calendar,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function JobOpeningsPage() {
  const { data: jobPositions, isLoading, error } = useJobPositionsQuery();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-gray-600">Loading job positions...</p>
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
            Failed to load job positions
          </p>
          <p className="text-red-600 text-sm">
            {error instanceof Error
              ? error.message
              : "An error occurred while fetching job positions. Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  if (!jobPositions || jobPositions.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            No Job Openings
          </h3>
          <p className="text-gray-600">
            There are no job positions available at the moment. Please check
            back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Join Our Team</h1>
        <p className="text-lg text-gray-600">
          Explore our current job openings and find your perfect role
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobPositions.map((position) => (
          <Link
            key={position.id}
            href={`/jobs/${position.id}`}
            className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-primary transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                  {position.title}
                </h3>
              </div>
              <Briefcase className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Calendar className="w-4 h-4" />
              <span>
                Apply by{" "}
                {new Date(position.applicationDeadline).toLocaleDateString()}
              </span>
            </div>

            <p className="text-gray-600 line-clamp-3 mb-4">
              {position.description.substring(0, 150)}...
            </p>

            <div className="text-primary font-medium group-hover:underline flex items-center gap-1">
              View Details <ArrowRight size={20} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
