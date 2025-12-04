"use client";
import React, { useState } from "react";
import PanelViewer from "../_components/PanelViewer";
import ApplicationsListPanel from "./_panels/ApplicationsListPanel";
import JobDescriptionPanel from "./_panels/JobDescriptionPanel";

export default function JobApplicationsPage() {
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
        {activeView === "applications" && <ApplicationsListPanel />}
        {activeView === "job-description" && <JobDescriptionPanel />}
      </div>
    </div>
  );
}
