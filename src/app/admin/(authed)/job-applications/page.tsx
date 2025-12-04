"use client";
import React, { useState } from "react";
import PanelViewer from "../_components/PanelViewer";
import ApplicationsListPanel from "./_panels/ApplicationsListPanel";
import JobDescriptionPanel from "./_panels/JobDescriptionPanel";
import ApplicationDetailsModal from "./modals/ApplicationDetailModal";

export default function JobApplicationsPage() {
  const [selectedApplicationId, setSelectedApplicationId] = useState<
    string | null
  >(null);
  const [activeView, setActiveView] = useState("applications");

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Job Applications</h1>
        <p className="text-gray-600 mt-2">
          Manage cleaner job applications and job description
        </p>
      </div>

      <PanelViewer
        views={[
          {
            viewName: "applications",
            content: "Applications"
          },
          {
            viewName: "job-description",
            content: "Job Description"
          }
        ]}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      <div className="mt-4">
        {activeView === "applications" && (
          <ApplicationsListPanel
            onSelectApplication={setSelectedApplicationId}
          />
        )}
        {activeView === "job-description" && <JobDescriptionPanel />}
      </div>
      {selectedApplicationId && (
        <ApplicationDetailsModal
          applicationId={selectedApplicationId!}
          onClose={() => setSelectedApplicationId(null)}
        />
      )}
    </div>
  );
}
