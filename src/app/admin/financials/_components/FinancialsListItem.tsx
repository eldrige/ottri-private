"use client";
import CallIcon from "@/components/icons/CallIcon";
import EditIcon from "@/components/icons/EditIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import { Button } from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface StatusType {
  label: string;
  value: string;
}

export default function FinancialsListItem({
  statuses,
  initialStatus,
  bookingName,
  bookingNumber,
  service,
  dateTime,
  cleaners,
  address,
  phone,
  price,
  notes
}: {
  statuses: StatusType[];
  initialStatus: StatusType;
  bookingName: string;
  bookingNumber: number;
  service: string;
  dateTime: string;
  cleaners?: string;
  address: string;
  phone: string;
  price: number;
  notes?: string;
}) {
  const [status, setStatus] = useState(initialStatus);

  return (
    <div className="p-4 border border-black/10 rounded-lg flex flex-col lg:flex-row justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <span className="font-medium">{bookingName}</span>
          <Select
            accent="secondary"
            options={statuses}
            buttonClassName={cn(
              "py-1.5 px-3 gap-2",
              status.value === "pending"
                ? "bg-warning/20 *:text-warning-text"
                : status.value === "in-progress"
                  ? "bg-info/20 *:text-info-text"
                  : status.value === "completed"
                    ? "bg-success/10 *:text-success"
                    : status.value === "cancelled"
                      ? "bg-error/10 *:text-error"
                      : ""
            )}
            // activeClassName='bg-black/30 text-secondary-700'
            className="text-sm"
            placeholder="In Progress"
            value={status}
            onChange={(newStatus) => {
              setStatus(newStatus);
            }}
          />
          <span className="text-xs text-secondary-700/70">
            #{bookingNumber.toString().padStart(3, "0")}
          </span>
        </div>

        <div className="mt-4 lg:mt-6 text-xs flex flex-wrap gap-x-8 gap-y-4">
          <div className="space-y-1">
            <p>
              <span className="font-medium mr-2">Service:</span>
              <span>{service}</span>
            </p>
            <p>
              <span className="font-medium mr-2">Date & Time:</span>
              <span>{dateTime}</span>
            </p>
            <p>
              <span className="font-medium mr-2">Cleaners:</span>
              {cleaners ? (
                <span>{cleaners}</span>
              ) : (
                <span className="text-error">Unassigned</span>
              )}
            </p>
            {notes && (
              <p className="mt-2 text-xs text-secondary-700/70">
                <span className="font-medium mr-2">Notes:</span>
                <span>{notes}</span>
              </p>
            )}
          </div>
          <div className="space-y-1">
            <p>
              <span className="font-medium mr-2">Address:</span>
              <span>{address}</span>
            </p>
            <p>
              <span className="font-medium mr-2">Phone:</span>
              <span>{phone}</span>
            </p>
            <p>
              <span className="font-medium mr-2">Price:</span>
              <span>${price}</span>
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
            Edit
          </Button>
          <Button
            size="2xs"
            variant={"secondary-outline"}
            className="text-xs flex items-center justify-center gap-1 border-black/10"
          >
            <CallIcon className="size-4" />
            Call
          </Button>
          <Button
            size="2xs"
            variant={"destructive"}
            className="text-xs flex items-center justify-center gap-1 border-black/10"
          >
            <TrashIcon className="size-4" />
            Delete
          </Button>
        </div>
        {!cleaners && (
          <div className="mt-4 lg:mt-6 flex justify-end *:flex-1 lg:*:flex-0">
            <Button size={"2xs"} variant={"secondary"}>
              Assign Cleaner
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
