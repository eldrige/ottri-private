import React from "react";
import ListItem from "../_components/ListItem";
import { BookingsResponse } from "@/app/admin/types";
import { cn } from "@/lib/utils";

export default function ListView({
  bookingsResponse
}: {
  bookingsResponse: BookingsResponse;
}) {
  const bookings = bookingsResponse.data;

  const statuses = [
    { label: "Pending", value: "PENDING" },
    { label: "In Progress", value: "INPROGRESS" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Cancelled", value: "CANCELLED" }
  ];

  return (
    <div className="relative">
      <div className={cn("mt-8 lg:p-6 lg:border border-black/10 rounded-lg")}>
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}
