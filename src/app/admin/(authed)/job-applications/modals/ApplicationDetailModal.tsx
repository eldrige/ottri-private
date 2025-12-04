"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Download, Mail, Phone, X } from "lucide-react";
import ModalWrapper from "@/components/common/ModalWrapper";
import { JobApplicationType } from "@/app/admin/types";

interface ApplicationDetailsModalProps {
  application: JobApplicationType;
  onClose: () => void;
}

export default function ApplicationDetailsModal({
  application,
  onClose
}: ApplicationDetailsModalProps) {
  const [status, setStatus] = useState<
    "pending" | "reviewed" | "accepted" | "rejected"
  >("pending");

  const handleStatusUpdate = (
    newStatus: "pending" | "reviewed" | "accepted" | "rejected"
  ) => {
    setStatus(newStatus);
    // TODO: Update status via API
  };

  return (
    <ModalWrapper onClose={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 space-y-6">
        {/* Header with Close Button */}
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {application.fullName}
            </h2>
            <p className="text-gray-500 mt-1">
              Applied on {new Date(application.createdAt).toLocaleDateString()}{" "}
              at {new Date(application.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="xs" className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
            <Button variant="outline" size="xs" className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button variant="ghost-secondary" size="xs" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

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
            <Button size="sm" variant="secondary" className="flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
          </div>
        </div>

        {/* Status Update */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Application Status
          </h3>
          <div className="flex gap-2">
            <Button
              variant={status === "pending" ? "secondary" : "outline"}
              size="sm"
              onClick={() => handleStatusUpdate("pending")}
            >
              Pending
            </Button>
            <Button
              variant={status === "reviewed" ? "secondary" : "outline"}
              size="sm"
              onClick={() => handleStatusUpdate("reviewed")}
            >
              Reviewed
            </Button>
            <Button
              variant={status === "accepted" ? "secondary" : "outline"}
              size="sm"
              onClick={() => handleStatusUpdate("accepted")}
            >
              Accept
            </Button>
            <Button
              variant={status === "rejected" ? "secondary" : "outline"}
              size="sm"
              onClick={() => handleStatusUpdate("rejected")}
            >
              Reject
            </Button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
