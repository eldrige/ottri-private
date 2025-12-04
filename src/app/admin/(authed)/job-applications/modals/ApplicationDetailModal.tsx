"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  Download,
  Mail,
  X,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import ModalWrapper from "@/components/common/ModalWrapper";
import { JobApplicationType } from "@/app/admin/types";
import { useUpdateJobApplicationStatusMutation } from "../../_services/mutations";
import ConfirmModal from "@/components/common/ConfirmModal";
import { AxiosError } from "axios";

interface ApplicationDetailsModalProps {
  application: JobApplicationType;
  onClose: () => void;
}

export default function ApplicationDetailsModal({
  application,
  onClose
}: ApplicationDetailsModalProps) {
  const {
    mutateAsync: update,
    isPending,
    error
  } = useUpdateJobApplicationStatusMutation();
  const [status, setStatus] = useState<JobApplicationType["status"]>(
    application.status
  );
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = async () => {
    try {
      await update({ id: application.id, status });
      setShowConfirm(false);
      onClose();
    } catch (error) {
      console.error("Failed to update status:", error);
      setShowConfirm(false);
    }
  };

  const isPendingStatus = application.status === "PENDING";
  const hasStatusChanged = status !== application.status;

  const getStatusLabel = () => {
    if (status === "APPROVED") return "Accept";
    if (status === "REJECTED") return "Reject";
    return "Pending";
  };

  return (
    <ModalWrapper onClose={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 space-y-6">
        {/* Header with Close Button */}
        <div className="flex justify-between items-center border-b border-black/10 pb-4">
          <div>
            <h2 className="text-2xl font-bold">{application.fullName}</h2>
            <p className="text-gray-500 mt-1">
              Applied on {new Date(application.createdAt).toLocaleDateString()}{" "}
              at {new Date(application.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <div className="flex gap-2">
            <a href={`mailto:${application.email}`}>
              <Button variant="outline" size="xs" className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
            </a>
            <Button variant="ghost-secondary" size="xs" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="border border-red-200 bg-red-50 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-red-800 mb-1">
                Failed to Update Status
              </h3>
              <p className="text-sm text-red-700">
                {error instanceof AxiosError
                  ? error.response?.data.message
                  : error instanceof Error
                    ? error.message
                    : "An error occurred while updating the application status. Please try again."}
              </p>
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Email</div>
              <div className="text-gray-900">{application.email}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Phone</div>
              <div className="text-gray-900">{application.phoneNumber}</div>
            </div>
          </div>
        </div>

        {/* Cover Letter */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Cover Letter
          </h3>
          <p className="text-gray-700 whitespace-pre-wrap">
            {application.coverLetter}
          </p>
        </div>

        {/* Resume */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Resume/CV</h3>
              <p className="text-sm text-gray-500 mt-1">
                Click to download the applicant&apos;s resume
              </p>
            </div>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center"
              onClick={() => window.open(application.cvLink, "_blank")}
            >
              <Download className="w-4 h-4 mr-2" />
              View Resume
            </Button>
          </div>
        </div>

        {/* Status Update */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Application Status
          </h3>

          {isPendingStatus ? (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant={status === "APPROVED" ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setStatus("APPROVED")}
                  className="flex items-center"
                  disabled={isPending}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Accept
                </Button>
                <Button
                  variant={status === "REJECTED" ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => setStatus("REJECTED")}
                  className="flex items-center"
                  disabled={isPending}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>

              {hasStatusChanged && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowConfirm(true)}
                  className="w-full"
                  disabled={isPending}
                >
                  Save Status Change
                </Button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1.5 text-sm font-semibold rounded-full ${
                  application.status === "APPROVED"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {application.status === "APPROVED" ? "Accepted" : "Rejected"}
              </span>
              <p className="text-sm text-gray-500">
                This application has already been processed and cannot be
                changed.
              </p>
            </div>
          )}
        </div>
      </div>

      {showConfirm && (
        <ConfirmModal
          open={showConfirm}
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleSave}
          title={`${getStatusLabel()} Application`}
          description={`Are you sure you want to ${getStatusLabel().toLowerCase()} this application? This action cannot be undone and the applicant will be notified.`}
          confirmText={`Yes, ${getStatusLabel()}`}
          accent="secondary"
          loading={isPending}
        />
      )}
    </ModalWrapper>
  );
}
