import React, { useState } from "react";
import ListItem from "../_components/ListItem";
import { Booking, BookingsResponse } from "@/app/admin/types";
import { cn } from "@/lib/utils";
import EditBooking from "../_components/EditBooking";
import AssignCleaner from "../_components/AssignCleaner";

export default function ListView({
  bookingsResponse
}: {
  bookingsResponse: BookingsResponse;
}) {
  const bookings = bookingsResponse.data;
  const [editBooking, setEditBooking] = useState<Booking | null>(null);
  const [assignCleaners, setAssignCleaners] = useState<Booking | null>(null);

  const statuses = [
    { label: "Pending", value: "PENDING" },
    { label: "In Progress", value: "INPROGRESS" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Cancelled", value: "CANCELLED" }
  ];

  return (
    <div className="relative">
      {editBooking && (
        <div className="sticky left-0 top-0 flex flex-col items-center pt-4">
          <EditBooking
            booking={editBooking}
            onClose={() => setEditBooking(null)}
          />
        </div>
      )}
      {assignCleaners && (
        <div className="sticky left-0 top-0 flex flex-col items-center pt-4">
          <AssignCleaner
            booking={assignCleaners}
            onClose={() => setAssignCleaners(null)}
          />
        </div>
      )}
      <div
        className={cn(
          "mt-8 lg:p-6 lg:border border-black/10 rounded-lg",
          (editBooking || assignCleaners) && "invisible"
        )}
      >
        <h4 className="text-heading-5">
          Booking List ({bookingsResponse.total} Booking
          {bookings.length !== 1 ? "s" : ""})
        </h4>

        <div className="mt-8 space-y-4">
          {bookings.map((booking) => (
            <ListItem
              key={booking.id}
              status={
                statuses.find((i) => i.value === booking.status) || statuses[0]
              }
              booking={booking}
              setEditBooking={setEditBooking}
              setAssignCleaners={setAssignCleaners}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
