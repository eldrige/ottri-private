import { cn } from "@/lib/utils";
import ModalWrapper from "./ModalWrapper";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
  accent?: "primary" | "secondary" | "destructive";
};

export default function ConfirmModal({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
  accent = "primary"
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <ModalWrapper onClose={onCancel}>
      <div className="text-secondary-700 bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        {description && (
          <p className="text-secondary-700/70 mb-6">{description}</p>
        )}
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded font-medium bg-gray-100 text-secondary-700/70 hover:bg-gray-200 transition"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            className={cn(
              "px-4 py-2 rounded font-medium text-white transition disabled:opacity-60",
              accent === "primary" && "bg-primary-700 hover:bg-primary-900",
              accent === "secondary" &&
                "bg-secondary-700 hover:bg-secondary-900",
              accent === "destructive" && "bg-error hover:bg-red-500"
            )}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
