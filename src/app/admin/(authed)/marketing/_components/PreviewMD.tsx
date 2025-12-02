import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import React from "react";
import ModalWrapper from "@/components/common/ModalWrapper";
import ReactMarkdown from "react-markdown";

export default function PreviewMD({
  content,
  onClose
}: {
  content: string;
  onClose: () => void;
}) {
  return (
    <ModalWrapper onClose={onClose}>
      <div className="border border-black/10 text-secondary-700 rounded-lg p-8 w-full max-w-4xl bg-white max-h-[90vh] overflow-auto">
        <div className="flex justify-end items-center mb-4">
          <button onClick={onClose}>
            <X className="size-8 text-secondary-700/70" />
          </button>
        </div>

        {/* Markdown Content Only */}
        <div className="prose max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end">
          <Button
            type="button"
            variant="secondary"
            className="px-6 py-3 bg-[#2D3648] text-white rounded-lg"
            onClick={onClose}
          >
            Close Preview
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
