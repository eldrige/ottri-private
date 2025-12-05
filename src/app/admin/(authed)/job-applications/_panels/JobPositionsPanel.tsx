"use client";
import { useJobPositionsQuery } from "@/services/queries";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  Loader2,
  AlertCircle,
  Briefcase,
  Calendar,
  Edit,
  FileText,
  Plus
} from "lucide-react";
import JobDescriptionModal from "../_modals/JobDescriptionModal";
import CreateJobPositionModal from "../_modals/CreateJobPositionModal";

export default function JobPositionsPanel() {
  const { data: jobPositions, isLoading, error } = useJobPositionsQuery();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedJobPositionId, setSelectedJobPositionId] = useState<
    number | null
  >(null);

  const selectedJobPosition = jobPositions?.find(
    (i) => i.id === selectedJobPositionId
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-gray-600">Loading job positions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
        <p className="text-red-800 font-medium mb-2">
          Failed to load job positions
        </p>
        <p className="text-red-600 text-sm">
          {error instanceof Error
            ? error.message
            : "An error occurred while fetching job positions"}
        </p>
      </div>
    );
  }

  if (!jobPositions || jobPositions.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Job Position
          </Button>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            No Job Positions
          </h3>
          <p className="text-gray-600 mb-4">
            There are no job positions available. Create one to get started.
          </p>
          <Button
            variant="secondary"
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 mx-auto"
          >
            <Plus className="w-4 h-4" />
            Create Your First Job Position
          </Button>
        </div>

        {showCreateModal && (
          <CreateJobPositionModal onClose={() => setShowCreateModal(false)} />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Manage Job Positions
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Click on any position to edit its description and details
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Job Position
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobPositions.map((position) => (
          <div
            key={position.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {position.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Deadline:{" "}
                    {new Date(
                      position.applicationDeadline
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <Briefcase className="w-6 h-6 text-gray-400" />
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <FileText className="w-4 h-4" />
                <span>Description Preview</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-3">
                {position.description.substring(0, 120)}...
              </p>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedJobPositionId(position.id)}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Description
              </Button>
            </div>
          </div>
        ))}
      </div>

      {selectedJobPosition && (
        <JobDescriptionModal
          jobPosition={selectedJobPosition}
          onClose={() => setSelectedJobPositionId(null)}
        />
      )}

      {showCreateModal && (
        <CreateJobPositionModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
