"use client";
import { Button } from "@/components/ui/Button";
import { useJobApplicationsQuery } from "../../_services/queries";
import { useState, useMemo } from "react";
import { JobApplicationType } from "@/app/admin/types";
import ApplicationDetailsModal from "../_modals/ApplicationDetailModal";
import { Loader2, FileQuestion, Briefcase, Mail } from "lucide-react";
import { useJobPositionsQuery } from "@/services/queries";

export default function ApplicationsListPanel() {
  const { data: jobPositions, isLoading: isJobPositionsLoading } =
    useJobPositionsQuery();
  const {
    data: applications,
    isLoading: isApplicationsLoading,
    error: isApplicationsError
  } = useJobApplicationsQuery();

  const [selectedApplication, setSelectedApplication] =
    useState<JobApplicationType | null>(null);
  const [selectedJobPositionId, setSelectedJobPositionId] = useState<
    number | "all"
  >("all");

  // Group applications by job position
  const groupedApplications = useMemo(() => {
    if (!applications || !jobPositions) return {};

    const grouped: Record<number, JobApplicationType[]> = {};

    applications.forEach((app) => {
      if (!grouped[app.jobPositionId]) {
        grouped[app.jobPositionId] = [];
      }
      grouped[app.jobPositionId].push(app);
    });

    return grouped;
  }, [applications, jobPositions]);

  // Filter applications based on selected job position
  const filteredApplications = useMemo(() => {
    if (!applications) return [];
    if (selectedJobPositionId === "all") return applications;
    return applications.filter(
      (app) => app.jobPositionId === selectedJobPositionId
    );
  }, [applications, selectedJobPositionId]);

  // Calculate stats for filtered applications
  const stats = useMemo(() => {
    return {
      total: filteredApplications.length,
      pending: filteredApplications.filter((a) => a.status === "PENDING")
        .length,
      approved: filteredApplications.filter((a) => a.status === "APPROVED")
        .length,
      rejected: filteredApplications.filter((a) => a.status === "REJECTED")
        .length
    };
  }, [filteredApplications]);

  const getStatusColor = (status: JobApplicationType["status"]) => {
    const colors = {
      PENDING: "bg-warning/10 text-warning-text",
      APPROVED: "bg-success/10 text-success",
      REJECTED: "bg-error/10 text-error"
    };
    return colors[status];
  };

  const getJobPositionTitle = (jobPositionId: number) => {
    return (
      jobPositions?.find((jp) => jp.id === jobPositionId)?.title ||
      "Unknown Position"
    );
  };

  if (isApplicationsLoading || isJobPositionsLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-gray-600">Loading applications...</p>
      </div>
    );
  }

  if (isApplicationsError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-800 font-medium mb-2">
          Failed to load applications
        </p>
        <p className="text-red-600 text-sm">
          {isApplicationsError instanceof Error
            ? isApplicationsError.message
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
    <div className="space-y-6">
      {/* Job Position Filter Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-wrap items-center gap-4">
        <h3 className="text-sm font-medium text-gray-700">
          Filter by Job Position
        </h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedJobPositionId === "all" ? "secondary" : "outline"}
            size="2xs"
            onClick={() => setSelectedJobPositionId("all")}
          >
            All Positions ({applications.length})
          </Button>
          {jobPositions?.map((position) => {
            const count = groupedApplications[position.id]?.length || 0;
            return (
              <Button
                key={position.id}
                variant={
                  selectedJobPositionId === position.id
                    ? "secondary"
                    : "outline"
                }
                size="2xs"
                onClick={() => setSelectedJobPositionId(position.id)}
                className="flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4" />
                <span className="hidden sm:inline">{position.title}</span>
                <span className="sm:hidden">
                  {position.title.substring(0, 15)}...
                </span>
                ({count})
              </Button>
            );
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">Total Applications</div>
          <div className="text-2xl font-medium mt-1">{stats.total}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">Pending</div>
          <div className="text-2xl font-medium mt-1 text-warning-text">
            {stats.pending}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">Approved</div>
          <div className="text-2xl font-medium mt-1 text-success">
            {stats.approved}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">Rejected</div>
          <div className="text-2xl font-medium mt-1 text-error">
            {stats.rejected}
          </div>
        </div>
      </div>

      {/* Applications Grid */}
      {filteredApplications.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <FileQuestion className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            No Applications for This Position
          </h3>
          <p className="text-gray-600">
            There are no applications for the selected job position yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredApplications.map((application) => (
            <div
              key={application.id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedApplication(application)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {application.fullName}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                    <Briefcase className="w-3 h-3" />
                    {getJobPositionTitle(application.jobPositionId)}
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(application.status)}`}
                >
                  {application.status.charAt(0).toUpperCase() +
                    application.status.slice(1).toLowerCase()}
                </span>
              </div>

              <div className="space-y-2 text-sm mb-3">
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                  <span className="text-gray-700 break-all">
                    {application.email}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">📞</span>
                  <span className="text-gray-700">
                    {application.phoneNumber}
                  </span>
                </div>
                <div className="text-gray-500">
                  Applied:{" "}
                  {new Date(application.createdAt).toLocaleDateString()}
                </div>
              </div>

              <Button
                variant="ghost-secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedApplication(application);
                }}
                className="w-full"
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      )}

      {selectedApplication && jobPositions && (
        <ApplicationDetailsModal
          jobPosition={
            jobPositions.find(
              (i) => i.id === selectedApplication.jobPositionId
            ) || jobPositions[0]
          }
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </div>
  );
}
