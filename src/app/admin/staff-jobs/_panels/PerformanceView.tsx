import StarIcon from "@/components/icons/StarIcon";
import { Button } from "@/components/ui/Button";
import React from "react";

const perfMetrics = [
  {
    name: "Maria Gracia",
    rating: 4.9,
    completionRate: 0.99,
    jobs: 159,
    earnings: 10537,
    issues: 1
  },
  {
    name: "John Smith",
    rating: 4.7,
    completionRate: 0.97,
    jobs: 156,
    earnings: 12537,
    issues: 3
  },
  {
    name: "Liza Brown",
    rating: 4.8,
    completionRate: 1,
    jobs: 139,
    earnings: 15537,
    issues: 0
  }
];

export default function PerformanceView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:p-6 md:border border-black/10 rounded-lg">
        <h4 className="text-heading-5">Performance Metrics</h4>
        <div className="mt-4 space-y-6">
          {perfMetrics.map((staff, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-black/10 space-y-4"
            >
              <div className="flex items-center gap-4">
                <p className="text-heading-5">{staff.name}</p>
                <span className="flex gap-1 items-center text-xs">
                  <StarIcon className="size-4" />
                  {staff.rating}
                </span>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p>Job Completion Rate</p>
                  <p>{staff.completionRate * 100}%</p>
                </div>
                <div className="mt-2 h-2.5 w-full rounded-full overflow-hidden bg-secondary-700/10">
                  <div
                    style={{ width: `${staff.completionRate * 100}%` }}
                    className="bg-secondary-700 h-full rounded-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-sm space-y-2">
                  <p className="font-medium">Jobs:</p>
                  <p>{staff.jobs}</p>
                </div>
                <div className="text-sm space-y-2">
                  <p className="font-medium">Earnings:</p>
                  <p>${staff.earnings.toLocaleString()}</p>
                </div>
                <div className="text-sm space-y-2">
                  <p className="font-medium">Issues:</p>
                  <p>{staff.issues}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="md:p-6 md:border border-black/10 rounded-lg">
        <h4 className="text-heading-5">Assignment Rules</h4>

        <div className="mt-4 space-y-4">
          <div className="p-4 rounded-lg border border-black/10 space-y-4">
            <h5>Auto-Assignment Settings</h5>
            <div className="flex items-center justify-between gap-3">
              <p>By availabilty</p>
              <Button
                className="border-black/10"
                size={"2xs"}
                variant={"secondary-outline"}
              >
                Enable
              </Button>
            </div>
            <div className="flex items-center justify-between gap-3">
              <p>By specialty match</p>
              <Button
                className="border-black/10"
                size={"2xs"}
                variant={"secondary-outline"}
              >
                Enable
              </Button>
            </div>
            <div className="flex items-center justify-between gap-3">
              <p>By customer rating</p>
              <Button
                className="border-black/10"
                size={"2xs"}
                variant={"secondary-outline"}
              >
                Enable
              </Button>
            </div>
          </div>
          <div className="p-4 rounded-lg border border-black/10 space-y-4">
            <h5>Performance Thresholds</h5>
            <div className="flex items-center justify-between gap-3">
              <p>Minimum Rating: </p>
              <p className="flex items-center gap-1">
                <StarIcon className="size-4" />
                4.9
              </p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <p>Max complaints/month: </p>
              <p>3</p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <p>Min completion rate:</p>
              <p>90%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
