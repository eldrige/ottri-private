import React, { useState } from "react";
import { Booking, BookingStatusLabels } from "../../types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import BookingActions from "./BookingActions";
import BookingDetails from "../bookings/_components/BookingDetails";

export default function OverviewItem({ booking }: { booking: Booking }) {
  const [showDetails, setShowDetails] = useState(false);

  const formattedFrom = format(
    new Date().setHours(booking.timeSlot.startTime, 0, 0, 0),
    "hh:mm aa"
  );
  const formattedTo = format(
    new Date().setHours(booking.timeSlot.endTime, 0, 0, 0),
    "hh:mm aa"
  );
  return (
    <>
      <div className="border border-black/10 rounded-lg py-2 px-4 flex items-start gap-3 justify-between">
        <div className="space-y-1 self-start">
          <p>
            <span className="font-medium">
              {booking.guest?.fullName ||
                booking.user?.personalInformation.fullName}
            </span>
            <span
              className={cn(
                `text-sm py-1 px-4 ml-3 rounded-lg`,
                booking.status === "INPROGRESS" && "bg-info/20 text-info-text",
                booking.status === "COMPLETED" && "bg-success/20 text-success",
                (booking.status === "PENDING" || booking.status === "UNPAID") &&
                  "bg-warning/20 text-warning-text",
                booking.status === "CANCELLED" && "bg-error/20 text-error"
              )}
            >
              {BookingStatusLabels[booking.status]}
            </span>
          </p>
          <p className="text-xs text-secondary-700/70 capitalize">
            {booking.serviceType.name}
            <span className="h-2 w-2 bg-surface-300 inline-block rounded-full mx-2" />
            {formattedFrom} - {formattedTo}
          </p>
          <p className="text-xs text-secondary-700/70">
            Cleaner:
            <span className="ml-2">
              {booking.cleaners.map((i) => i.fullName).join(", ") || "N/A"}
            </span>
          </p>
        </div>
        <div className="flex items-end ml-auto justify-end">
          <BookingActions booking={booking} />
        </div>
      </div>
      {showDetails && (
        <BookingDetails
          bookingId={booking.id}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
}
