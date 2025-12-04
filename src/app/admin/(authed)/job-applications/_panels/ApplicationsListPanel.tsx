"use client";
import { Button } from "@/components/ui/Button";
import { useJobApplicationsQuery } from "../../_services/queries";
import { useState } from "react";
import { JobApplicationType } from "@/app/admin/types";
import ApplicationDetailsModal from "../modals/ApplicationDetailModal";
import { Loader2, FileQuestion } from "lucide-react";

export default function ApplicationsListPanel() {
  const { data: applications, isLoading, error } = useJobApplicationsQuery();

  const [selectedApplication, setSelectedApplication] =
    useState<JobApplicationType | null>(null);

  const getStatusColor = (status: JobApplicationType["status"]) => {
    const colors = {
      PENDING: "bg-warning/10 text-warning-text",
      APPROVED: "bg-success/10 text-success",
      REJECTED: "bg-error/10 text-error"
    };
    return colors[status];
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-gray-600">Loading applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-800 font-medium mb-2">
          Failed to load applications
        </p>
        <p className="text-red-600 text-sm">
          {error instanceof Error
            ? error.message
            : "An error occurred while fetching applications"}
        </p>
      </div>
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
        <FileQuestion className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          No Applications Yet
        </h3>
        <p className="text-gray-600">
          There are no job applications at the moment. Applications will appear
          here once candidates apply.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">Total Applications</div>
          <div className="text-2xl font-medium mt-1">{applications.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">Pending</div>
          <div className="text-2xl font-medium mt-1 text-warning-text">
            {applications.filter((a) => a.status === "PENDING").length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">Approved</div>
          <div className="text-2xl font-medium mt-1 text-success">
            {applications.filter((a) => a.status === "APPROVED").length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">Rejected</div>
          <div className="text-2xl font-medium mt-1 text-error">
            {applications.filter((a) => a.status === "REJECTED").length}
          </div>
        </div>
      </div>

      {/* Applications Grid */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div className="col-span-3">Applicant</div>
          <div className="col-span-3">Contact</div>
          <div className="col-span-2">Applied Date</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Actions</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-200">
          {applications.map((application) => (
            <div
              key={application.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors items-center"
              onClick={() => setSelectedApplication(application)}
            >
              <div className="col-span-3">
                <div className="text-sm font-medium text-gray-900">
                  {application.fullName}
                </div>
              </div>
              <div className="col-span-3">
                <div className="text-sm text-gray-900">{application.email}</div>
                <div className="text-sm text-gray-500">
                  {application.phoneNumber}
                </div>
              </div>
              <div className="col-span-2 text-sm text-gray-500">
                {new Date(application.createdAt).toLocaleDateString()}
              </div>
              <div className="col-span-2">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}
                >
                  {application.status.charAt(0).toUpperCase() +
                    application.status.slice(1).toLowerCase()}
                </span>
              </div>
              <div className="col-span-2">
                <Button
                  variant="ghost-secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedApplication(application);
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedApplication && (
        <ApplicationDetailsModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </div>
  );
}
