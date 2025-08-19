import Select from "@/components/ui/Select";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

export default function StaffOverviewView() {
  return (
    <div className="grid grid-cols-2">
      <StaffBox
        name="Maria Garcia"
        rating={4.9}
        jobsCompleted={159}
        todaysJobs={3}
        complaints={1}
        specialties={["Office clean", "Commercial"]}
      />
    </div>
  );
}

function StaffBox({
  name
}: {
  name: string;
  rating: number;
  jobsCompleted: number;
  todaysJobs: number;
  complaints: number;
  specialties: string[];
}) {
  const options = [
    { value: "available", label: "Available" },
    { value: "unavailable", label: "Unavailable" },
    { value: "busy", label: "Busy" }
  ];
  const [status, setStatus] = useState(options[0]);
  return (
    <div className="p-4 border border-black/10 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="rounded-full p-2 h-13.5 aspect-square bg-gray-100 font-medium flex items-center justify-center">
          {name
            .split(" ")
            .map((i) => i[0])
            .join("")}
        </div>
        <h3 className="font-medium text-xl">{name}</h3>
        <Select
          options={options}
          value={status}
          onChange={(status) => setStatus(status)}
          accent="secondary"
          className="ml-auto text-sm"
          buttonClassName={cn(
            "py-2 px-3 gap-2 border-none",
            status.value === "available"
              ? "bg-success/10 *:text-success"
              : status.value === "unavailable"
                ? "bg-error/10 *:text-error"
                : status.value === "busy"
                  ? "bg-info/20 *:text-info-text"
                  : ""
          )}
        />
      </div>
    </div>
  );
}
