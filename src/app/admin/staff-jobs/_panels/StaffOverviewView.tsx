import CallIcon from "@/components/icons/CallIcon";
import EditIcon from "@/components/icons/EditIcon";
import StarIcon from "@/components/icons/StarIcon";
import { Button } from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

export default function StaffOverviewView() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <StaffBox
        name="Maria Garcia"
        rating={4.9}
        jobsCompleted={159}
        todaysJobs={3}
        complaints={1}
        specialties={["Office clean", "Commercial"]}
        selectedStatus="available"
      />
      <StaffBox
        name="Lisa Brown"
        rating={4.9}
        jobsCompleted={159}
        todaysJobs={3}
        complaints={1}
        specialties={["Pet-friendly", "Deep clean", "move-out clean"]}
        selectedStatus="available"
      />
      <StaffBox
        name="John Smith"
        rating={4.5}
        jobsCompleted={89}
        todaysJobs={1}
        complaints={5}
        specialties={["Pet-friendly", "Deep clean", "move-out clean"]}
        selectedStatus="unavailable"
      />
      <StaffBox
        name="Carlos Martinez"
        rating={4.7}
        jobsCompleted={190}
        todaysJobs={2}
        complaints={0}
        specialties={["Pet-friendly", "Deep clean", "move-out clean"]}
        selectedStatus="busy"
      />
    </div>
  );
}

function StaffBox({
  name,
  rating,
  jobsCompleted,
  todaysJobs,
  complaints,
  specialties,
  selectedStatus
}: {
  name: string;
  rating: number;
  jobsCompleted: number;
  todaysJobs: number;
  complaints: number;
  specialties: string[];
  selectedStatus: "available" | "unavailable" | "busy";
}) {
  const options = [
    { value: "available", label: "Available" },
    { value: "unavailable", label: "Unavailable" },
    { value: "busy", label: "Busy" }
  ];
  const [status, setStatus] = useState(
    options.find((i) => i.value === selectedStatus) || options[0]
  );
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
      <div className="mt-6 space-y-3">
        <div className="flex justify-between">
          <span className="font-medium">Rating: </span>
          <span className="flex gap-2 items-center">
            <StarIcon className="size-4" />
            {rating}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Jobs Completed: </span>
          <span className="flex gap-2 items-center">{jobsCompleted}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Today&apos;s Jobs: </span>
          <span className="flex gap-2 items-center">{todaysJobs}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Complaints: </span>
          <span className="flex gap-2 items-center text-error">
            {complaints}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <p className="font-medium">Specialties: </p>
        <div className="mt-4 flex gap-2.5">
          {specialties.map((spec) => (
            <div
              key={spec}
              className="text-sm py-1 px-3 rounded-lg bg-secondary-700/10"
            >
              <span>{spec}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex gap-3 *:flex-1">
        <Button
          className="flex items-center justify-center gap-1 border-secondary-700/10"
          size={"2xs"}
          variant={"secondary-outline"}
        >
          <EditIcon className="size-4" /> Edit
        </Button>
        <Button
          className="flex items-center justify-center gap-1 border-secondary-700/10"
          size={"2xs"}
          variant={"secondary-outline"}
        >
          <CallIcon className="size-4" /> Call
        </Button>
      </div>
    </div>
  );
}
