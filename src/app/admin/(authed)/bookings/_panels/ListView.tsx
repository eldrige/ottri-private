import React from "react";
import ListItem from "../_components/ListItem";
import { Booking } from "@/app/admin/types";

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

export default function ListView({ bookings }: { bookings: Booking[] }) {
  const statuses = [
    { label: "Pending", value: "pending" },
    { label: "In Progress", value: "in-progress" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" }
  ];
  return (
    <div className="mt-8 lg:p-6 lg:border border-black/10 rounded-lg">
      <h4 className="text-heading-5">
        Booking List ({bookings.length} Booking
        {bookings.length !== 1 ? "s" : ""})
      </h4>

      <div className="mt-8 space-y-4">
        {bookings.map((booking) => (
          <ListItem
            key={booking.id}
            statuses={statuses}
            initialStatus={
              statuses[Math.floor(Math.random() * statuses.length)]
            }
            booking={booking}
          />
        ))}
      </div>
    </div>
  );
}
