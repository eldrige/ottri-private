"use client";
import { useJobPositionsQuery } from "@/services/queries";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Loader2, AlertCircle, Briefcase, Plus } from "lucide-react";
import CreateJobPositionModal from "../_modals/CreateJobPositionModal";
import { useDeleteJobPositionMutation } from "../../_services/mutations";
import { useJobApplicationsQuery } from "../../_services/queries";
import JobPositionCard from "../_components/JobPositionCard";

export default function JobPositionsPanel() {
  const { data: jobPositions, isLoading, error } = useJobPositionsQuery();
  const { data: applications } = useJobApplicationsQuery();
  useDeleteJobPositionMutation();

  const [showCreateModal, setShowCreateModal] = useState(false);

  const getApplicationCount = (jobPositionId: number) => {
    return (
      applications?.filter((app) => app.jobPositionId === jobPositionId)
        .length || 0
    );
  };

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
        {jobPositions.map((position) => {
          const appCount = getApplicationCount(position.id);
          return (
            <JobPositionCard
              key={position.id}
              position={position}
              appCount={appCount}
            />
          );
        })}
      </div>

      {showCreateModal && (
        <CreateJobPositionModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
