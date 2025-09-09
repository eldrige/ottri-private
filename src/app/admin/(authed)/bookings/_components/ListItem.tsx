"use client";
import { cancelBooking } from "@/app/admin/_actions/bookings";
import { Booking } from "@/app/admin/types";
import CallIcon from "@/components/icons/CallIcon";
import EditIcon from "@/components/icons/EditIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface StatusType {
  label: string;
  value: string;
}

export default function ListItem({
  status,
  booking,
  setEditBooking,
  setAssignCleaners
}: {
  status: StatusType;
  booking: Booking;
  setEditBooking: (booking: Booking) => void;
  setAssignCleaners: (booking: Booking) => void;
}) {
  const router = useRouter();
  // const [status, setStatus] = useState(initialStatus);
  const [cancelling, setCancelling] = useState(false);

  const bookingName = booking.customer?.personalInformation?.fullName || "";
  const bookingNumber = booking.id;
  const service = booking.serviceType.name;
  const dateTime = format(
    new Date(booking.timeSlot.date),
    "dd-MM-yyyy 'at' h:mm a"
  );
  const cleaners = booking.cleaners;
  const address = booking.address;
  const phone = booking.customer?.personalInformation?.phoneNumber || "";
  const price = booking.price || 0;
  const notes = [
    booking.otherAddOns,
    booking.petsInstructions,
    booking.entryInstructions
  ]
    .filter((i) => i)
    .join(", ");

  return (
    <div className="p-4 border border-black/10 rounded-lg flex flex-col lg:flex-row justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <span className="font-medium">{bookingName || "Guest"}</span>
          <div
            className={cn(
              "py-1.5 px-3 text-sm rounded-md inline-flex items-center",
              status.value === "PENDING"
                ? "bg-warning/20 text-warning-text"
                : status.value === "INPROGRESS"
                  ? "bg-info/20 text-info-text"
                  : status.value === "COMPLETED"
                    ? "bg-success/10 text-success"
                    : status.value === "CANCELLED"
                      ? "bg-error/10 text-error"
                      : ""
            )}
          >
            {status.label}
          </div>
          <span className="text-xs text-secondary-700/70">
            #{bookingNumber.toString().padStart(3, "0")}
          </span>
        </div>

        <div className="mt-4 lg:mt-6 text-xs flex flex-wrap gap-x-8 gap-y-4">
          <div className="space-y-1">
            <p>
              <span className="font-medium mr-2">Service:</span>
              <span className="capitalize">{service}</span>
            </p>
            <p>
              <span className="font-medium mr-2">Date & Time:</span>
              <span>{dateTime}</span>
            </p>
            <p>
              <span className="font-medium mr-2">Cleaners:</span>
              {cleaners?.length ? (
                cleaners.map((cleaner) => (
                  <span key={cleaner.id}>{cleaner.fullName}</span>
                ))
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
            onClick={() => setEditBooking(booking)}
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
          {status.value !== "CANCELLED" && (
            <Button
              disabled={cancelling}
              size="2xs"
              variant={"destructive"}
              className="text-xs flex items-center justify-center gap-1 border-black/10"
              onClick={async () => {
                setCancelling(true);
                await cancelBooking(booking.id);
                router.refresh();
                setCancelling(false);
              }}
            >
              <TrashIcon className="size-4" />
              {cancelling ? "Cancelling" : "Cancel"}
            </Button>
          )}
        </div>
        {!cleaners.length && (
          <div className="mt-4 lg:mt-6 flex justify-end *:flex-1 lg:*:flex-0">
            <Button
              size={"2xs"}
              variant={"secondary"}
              onClick={() => setAssignCleaners(booking)}
            >
              Assign Cleaner
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
