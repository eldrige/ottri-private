"use client";
import EditIcon from "@/components/icons/EditIcon";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import React from "react";

interface StatusType {
  label: string;
  value: string;
}

export default function JobListItem({
  // statuses,
  initialStatus,
  bookingName,
  bookingNumber,
  service,
  dateTime,
  cleaner,
  address,
  duration
}: {
  // statuses: StatusType[];
  initialStatus: StatusType;
  bookingName: string;
  bookingNumber: number;
  service: string;
  dateTime: string;
  cleaner?: string;
  address: string;
  duration: string;
}) {
  const status = initialStatus;

  return (
    <div className="p-4 border border-black/10 rounded-lg flex flex-col lg:flex-row justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <span className="font-medium">{bookingName}</span>
          <button
            className={cn(
              "text-sm py-1 px-3 rounded-lg",
              status.value === "pending"
                ? "bg-warning/20 text-warning-text"
                : status.value === "in-progress"
                  ? "bg-info/20 text-info-text"
                  : status.value === "completed"
                    ? "bg-success/10 text-success"
                    : status.value === "cancelled"
                      ? "bg-error/10 text-error"
                      : ""
            )}
          >
            {status.label}
          </button>
          {/* <span className="text-xs text-secondary-700/70">
            #{bookingNumber.toString().padStart(3, "0")}
          </span> */}
        </div>

        <div className="mt-4 lg:mt-6 text-xs flex flex-wrap gap-x-8 gap-y-4">
          <div className="space-y-1">
            <p>
              <span className="font-medium mr-2">Cleaner:</span>
              {cleaner ? (
                <span>{cleaner}</span>
              ) : (
                <span className="text-error">Unassigned</span>
              )}
            </p>
            <p>
              <span className="font-medium mr-2">Service:</span>
              <span>{service}</span>
            </p>
            <p>
              <span className="font-medium mr-2">Date & Time:</span>
              <span>{dateTime}</span>
            </p>
          </div>
          <div className="space-y-1">
            <p>
              <span className="font-medium mr-2">Address:</span>
              <span>{address}</span>
            </p>
            <p>
              <span className="font-medium mr-2">Duration:</span>
              <span>{duration}</span>
            </p>
            <p>
              <span className="font-medium mr-2">Job ID:</span>
              <span>#{bookingNumber.toString().padStart(3, "0")}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-auto">
        <div className="flex items-start justify-end gap-3 *:flex-1 lg:*:flex-0">
          <Button
            size="2xs"
            variant={"secondary-outline"}
            className="text-xs flex items-center justify-center gap-1 border-black/10"
          >
            <EditIcon className="size-4" />
            Reassign
          </Button>
        </div>
      </div>
    </div>
  );
}
