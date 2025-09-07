import React, { useState } from "react";
import ListItem from "../_components/ListItem";
import { Booking, BookingsResponse, ServiceOption } from "@/app/admin/types";
import { cn } from "@/lib/utils";
import EditBooking from "../_components/EditBooking";
import AssignCleaner from "../_components/AssignCleaner";

// const statuses = [
//   { label: "Pending", value: "pending" },
//   { label: "In Progress", value: "in-progress" },
//   { label: "Completed", value: "completed" },
//   { label: "Cancelled", value: "cancelled" }
// ];

// Booking data array
// const bookingsData = [
//   {
//     id: 1,
//     status: statuses[1], // In Progress
//     name: "Sara Johnson",
//     bookingNumber: 1,
//     service: "Deep Cleaning",
//     dateTime: "25-07-2025 at 9:00 AM",
//     cleaners: "Maria Gracia",
//     address: "123 Oak Street",
//     phone: "(555) 123-4567",
//     price: 150,
//     notes: "Pet-friendly cleaning request"
//   },
//   {
//     id: 2,
//     status: statuses[0], // Pending
//     name: "Sara Johnson",
//     bookingNumber: 2,
//     service: "Deep Cleaning",
//     dateTime: "25-07-2025 at 9:00 AM",
//     cleaners: undefined, // This was commented out in the original
//     address: "123 Oak Street",
//     phone: "(555) 123-4567",
//     price: 150,
//     notes: "Key under Mat"
//   },
//   {
//     id: 3,
//     status: statuses[2], // Completed
//     name: "Sara Johnson",
//     bookingNumber: 3,
//     service: "Deep Cleaning",
//     dateTime: "25-07-2025 at 9:00 AM",
//     cleaners: "Maria Gracia",
//     address: "123 Oak Street",
//     phone: "(555) 123-4567",
//     price: 150,
//     notes: "Complete apartment cleaning"
//   },
//   {
//     id: 4,
//     status: statuses[3], // Cancelled
//     name: "Sara Johnson",
//     bookingNumber: 4,
//     service: "Deep Cleaning",
//     dateTime: "25-07-2025 at 9:00 AM",
//     cleaners: "Maria Gracia",
//     address: "123 Oak Street",
//     phone: "(555) 123-4567",
//     price: 150
//   }
// ];

export default function ListView({
  bookingsResponse,
  servicesOptions
}: {
  bookingsResponse: BookingsResponse;
  servicesOptions: ServiceOption[];
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
            servicesOptions={servicesOptions}
            onClose={() => setEditBooking(null)}
          />
        </div>
      )}
      {assignCleaners && (
        <div className="sticky left-0 top-0 flex flex-col items-center pt-4">
          <AssignCleaner
            booking={assignCleaners}
            cleaners={[]}
            onClose={() => setAssignCleaners(null)}
          />
        </div>
      )}
      <div
        className={cn(
          "mt-8 lg:p-6 lg:border border-black/10 rounded-lg",
          editBooking || (assignCleaners && "invisible")
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
              statuses={statuses}
              initialStatus={
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
