import { Booking, Cleaner } from "@/app/admin/types";
import ClockIcon2 from "@/components/icons/ClockIcon2";
import StarIcon from "@/components/icons/StarIcon";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { X } from "lucide-react";
import React from "react";

export default function AssignCleaner({
  booking,
  cleaners,
  onClose
}: {
  booking: Booking;
  cleaners: Cleaner[];
  onClose: () => void;
}) {
  const dateTime = format(
    new Date(booking.timeSlot.date),
    "dd-MM-yyyy 'at' h:mm a"
  );

  return (
    <div className="border border-black/10 rounded-lg p-4 w-full max-w-2xl space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-heading-5 font-bold">Assign Cleaner</p>
        <button onClick={onClose}>
          <X className="size-8 text-secondary-700/70" />
        </button>
      </div>

      <p>
        Select a new cleaner for this booking. The system will recommend the
        best matches based on availability and specialty.
      </p>

      <div className="p-4 bg-secondary-700/5 text-xs rounded-lg">
        <div className="space-y-1">
          <p>
            <span className="font-medium mr-2">Client:</span>
            <span className="capitalize">
              {booking.customer?.personalInformation.fullName}
            </span>
          </p>
          <p>
            <span className="font-medium mr-2">Service:</span>
            <span className="capitalize">{booking.serviceType.name}</span>
          </p>
          <p>
            <span className="font-medium mr-2">Cleaners:</span>
            {booking.cleaners?.length ? (
              booking.cleaners.map((cleaner) => (
                <span key={cleaner}>{cleaner}</span>
              ))
            ) : (
              <span className="text-error">Unassigned</span>
            )}
          </p>
        </div>
        <div className="mt-4 space-y-1">
          <p>
            <span className="font-medium mr-2">Date & Time:</span>
            <span className="capitalize">{dateTime}</span>
          </p>
          <p>
            <span className="font-medium mr-2">Address:</span>
            <span className="capitalize">{booking.address}</span>
          </p>
          <p>
            <span className="font-medium mr-2">Price:</span>
            <span className="capitalize">{booking.price}</span>
          </p>
        </div>
      </div>

      <p className="font-semibold">Available Cleaners</p>

      <div>
        {cleaners.length &&
          cleaners.map((cleaner) => (
            <div key={cleaner.id} className="p-4 border border-black/10">
              <div className="flex items-center justify-between font-medium">
                <p className="capitalize">{cleaner.fullName}</p>
                <p>159 Jobs</p>
              </div>
              <div className="mt-2 text-sm flex items-center gap-4">
                <p className="flex gap-2">
                  <StarIcon className="size-4" />
                  4.9
                </p>
                <p className="flex gap-2">
                  <ClockIcon2 className="size-4 text-black/25" />
                  {cleaner.status === "AVAILABLE" ? (
                    <span className="text-success">available</span>
                  ) : (
                    <span className="text-error">unavailable</span>
                  )}
                </p>
                <p className="text-secondary-700/70 ml-auto">1 Complaints</p>
              </div>

              <div className="mt-4 flex gap-2.5">
                {cleaner.preferences.map((pref, idx) => (
                  <p
                    key={"pref"}
                    className={cn(
                      "text-xs py-1 px-2 rounded-lg",
                      idx % 2 === 0
                        ? "border text-info-text bg-info/10 border-info/20"
                        : "bg-secondary-700/10"
                    )}
                  >
                    {pref}
                  </p>
                ))}
              </div>
            </div>
          ))}
      </div>

      <div className="mt-4 space-y-4">
        <div className="mt-8 flex gap-8 *:flex-1">
          <Button variant={"secondary-outline"} size={"xs"} onClick={onClose}>
            Cancel
          </Button>
          <Button variant={"secondary"} size={"xs"}>
            Assign Cleaner
          </Button>
        </div>
      </div>
    </div>
  );
}
