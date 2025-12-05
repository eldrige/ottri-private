import { JobPositionType } from "@/app/admin/types";
import { Button } from "@/components/ui/Button";
import { Calendar, Edit, FileText, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useDeleteJobPositionMutation } from "../../_services/mutations";
import ConfirmModal from "@/components/common/ConfirmModal";
import JobDescriptionModal from "../_modals/JobDescriptionModal";
import { cleanMD } from "@/lib/utils";

export default function JobPositionCard({
  position
}: {
  position: JobPositionType;
}) {
  const { mutateAsync: deleteJobPosition, isPending: isDeleting } =
    useDeleteJobPositionMutation();

  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [jobPositionToDelete, setJobPositionToDelete] = useState<number | null>(
    null
  );

  const handleDeleteClick = (jobPositionId: number) => {
    setJobPositionToDelete(jobPositionId);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!jobPositionToDelete) return;

    try {
      await deleteJobPosition({ id: jobPositionToDelete });
      setShowDeleteConfirm(false);
      setJobPositionToDelete(null);
    } catch (error) {
      console.error("Failed to delete job position:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setJobPositionToDelete(null);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {position.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <Calendar className="w-4 h-4" />
            <span>
              Deadline:{" "}
              {new Date(position.applicationDeadline).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <FileText className="w-4 h-4" />
          <span>Description Preview</span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-3">
          {cleanMD(position.description).substring(0, 120)}...
        </p>
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-200 mt-auto">
        <Button
          variant="secondary"
          size="xs"
          onClick={() => setShowEdit(true)}
          className="flex-1 flex items-center justify-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="xs"
          onClick={() => handleDeleteClick(position.id)}
          className="flex items-center justify-center gap-2"
          disabled={isDeleting}
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </Button>
      </div>

      {showEdit && (
        <JobDescriptionModal
          jobPosition={position}
          onClose={() => setShowEdit(false)}
        />
      )}

      {showDeleteConfirm && (
        <ConfirmModal
          open={showDeleteConfirm}
          title={`Delete "${position.title}"?`}
          description={`This will permanently delete this job position and all associated applications. This action cannot be undone.`}
          confirmText="Yes, Delete"
          cancelText="Cancel"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          loading={isDeleting}
          accent="destructive"
        />
      )}
    </div>
  );
}
