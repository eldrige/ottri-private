import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";

export function BasicConfirmationModal({
  setShowConfirmModal,
  isUpdating,
  handleSaveChanges,
  title,
  message,
  confirmationText = "Confirm",
  cancellationText = "Decline",
  isUpdatingText = "Precessing..."
}: {
  setShowConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdating: boolean;
  handleSaveChanges: () => Promise<void>;
  title: string;
  message: string;
  confirmationText?: string;
  cancellationText?: string;
  isUpdatingText?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => !isUpdating && setShowConfirmModal(false)}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 z-10">
        <button
          onClick={() => !isUpdating && setShowConfirmModal(false)}
          disabled={isUpdating}
          className="absolute top-4 right-4 text-surface-500 hover:text-secondary-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <h3 className="text-2xl font-medium text-secondary-700">{title}</h3>
          <p className="text-caption text-secondary-500 text-sm mt-2">
            {message}
          </p>
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            variant="destructive"
            onClick={() => setShowConfirmModal(false)}
            disabled={isUpdating}
            // size="sm"
            className=" flex items-center justify-center py-2 px-4 gap-3"
          >
            <p className="text-body">{cancellationText}</p>
          </Button>
          <Button
            onClick={handleSaveChanges}
            disabled={isUpdating}
            size="xs"
            variant="secondary"
            className="flex items-center justify-center py-2 px-4 gap-3"
          >
            <p className="text-body">
              {isUpdating ? isUpdatingText : confirmationText}
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
}
