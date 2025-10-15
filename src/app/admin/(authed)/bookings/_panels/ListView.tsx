import React from "react";
import ListItem from "../_components/ListItem";
import { cn } from "@/lib/utils";
import { useGetBookingsQuery } from "../../_services/queries";
import { useClientSearchParams } from "@/hooks/useClientSearchParams";
import { Loader2 } from "lucide-react";
import ErrorComponent from "@/app/_components/ErrorComponent";

export default function ListView() {
  const statusFilter = useClientSearchParams().searchParams.get("status") || "";
  const getBookingsQuery = useGetBookingsQuery({ statusFilter });
  const bookingsResponse = getBookingsQuery.data;

  if (getBookingsQuery.error)
    return (
      <ErrorComponent
        error={getBookingsQuery.error}
        reset={getBookingsQuery.refetch}
      />
    );

  if (!bookingsResponse)
    return <Loader2 className="animate-spin size-6 mx-auto my-8" />;

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
