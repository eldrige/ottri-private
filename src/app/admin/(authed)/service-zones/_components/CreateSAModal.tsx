import { Input } from "@/components/ui/Input";
import { XIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface Feature {
  id?: number | string;
  type: string;
  properties: {
    id: string | number;
    kind: string;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
  name?: string;
}

type CreateSAModalProps = {
  feature: Feature;
  open: boolean;
  onClose: () => void;
  onSave?: (data: {
    zoneName: string;
    minBookingValue: string;
  }) => Promise<void>;
};

export default function CreateSAModal({
  feature,
  open,
  onClose,
  onSave
}: CreateSAModalProps) {
  const [zoneName, setZoneName] = useState("");
  const [minBookingValue, setMinBookingValue] = useState("");
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let root = document.getElementById("modal-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "modal-root";
      document.body.appendChild(root);
    }
    setModalRoot(root);
  }, []);

  if (!open || !modalRoot) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (onSave) {
      setPending(true);
      try {
        await onSave({ zoneName, minBookingValue });
        onClose();
      } finally {
        setPending(false);
      }
    } else {
      onClose();
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-30">
      <div className="text-secondary-700 bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <div className="flex items-start justify-between mb-2">
          {/* Title */}
          <h3 className="text-xl font-bold">Configure New Zone</h3>
          {/* Close Button */}
          <button
            className="text-gray-400 hover:text-secondary-700/70"
            onClick={onClose}
            aria-label="Close"
            disabled={pending}
          >
            <XIcon size={24} />
          </button>
        </div>
        <p className="text-secondary-700/70 mb-2">
          Set up the details for your newly created zone
        </p>
        {/* Form */}
        <form className="space-y-4 py-4" onSubmit={handleSubmit}>
          {/* Zone Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Zone Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              className="w-full bg-gray-100 rounded-lg px-4 py-3 focus:outline-none"
              placeholder="Zone Name"
              value={zoneName}
              onChange={(e) => setZoneName(e.target.value)}
            />
          </div>
          {/* Zone Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Zone Type <span className="text-red-500">*</span>
            </label>
            <div className="w-full bg-gray-100 rounded-lg px-4 py-3 focus:outline-none capitalize">
              {feature.properties.kind}
            </div>
          </div>
          {/* Min Booking Value & Max Distance */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">
                Min Booking Value <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                className="w-full bg-gray-100 rounded-lg px-4 py-3 focus:outline-none"
                placeholder="$50"
                value={minBookingValue}
                onChange={(e) => setMinBookingValue(e.target.value)}
              />
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-medium"
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2 rounded-lg bg-secondary-700 text-white font-medium hover:bg-gray-700 flex items-center justify-center ${pending ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={pending}
            >
              {pending ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : null}
              Add Zone
            </button>
          </div>
        </form>
      </div>
    </div>,
    modalRoot
  );
}
