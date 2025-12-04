"use client";
import { Button } from "@/components/ui/Button";

interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  appliedDate: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
}

interface ApplicationsListPanelProps {
  onSelectApplication: (id: string) => void;
}

export default function ApplicationsListPanel({
  onSelectApplication
}: ApplicationsListPanelProps) {
  // Mock data - replace with actual API call
  const applications: Application[] = [
    {
      id: "1",
      fullName: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 8900",
      appliedDate: "2024-12-01",
      status: "pending"
    },
    {
      id: "2",
      fullName: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 234 567 8901",
      appliedDate: "2024-11-28",
      status: "reviewed"
    }
  ];

  const getStatusColor = (status: Application["status"]) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      reviewed: "bg-blue-100 text-blue-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800"
    };
    return colors[status];
  };

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
            {applications.filter((a) => a.status === "pending").length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">Reviewed</div>
          <div className="text-2xl font-medium mt-1 text-info-text">
            {applications.filter((a) => a.status === "reviewed").length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">Accepted</div>
          <div className="text-2xl font-medium mt-1 text-success">
            {applications.filter((a) => a.status === "accepted").length}
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
              onClick={() => onSelectApplication(application.id)}
            >
              <div className="col-span-3">
                <div className="text-sm font-medium text-gray-900">
                  {application.fullName}
                </div>
              </div>
              <div className="col-span-3">
                <div className="text-sm text-gray-900">{application.email}</div>
                <div className="text-sm text-gray-500">{application.phone}</div>
              </div>
              <div className="col-span-2 text-sm text-gray-500">
                {new Date(application.appliedDate).toLocaleDateString()}
              </div>
              <div className="col-span-2">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}
                >
                  {application.status.charAt(0).toUpperCase() +
                    application.status.slice(1)}
                </span>
              </div>
              <div className="col-span-2">
                <Button
                  variant="ghost-secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectApplication(application.id);
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
