import ClockIcon2 from "@/components/icons/ClockIcon2";
import { Button } from "@/components/ui/Button";
import React from "react";
import FinancialsListItem from "../_components/FinancialsListItem";

const statuses = [
  { label: "Paid", value: "paid" },
  { label: "Unpaid", value: "unpaid" },
  { label: "Overdue", value: "overdue" }
];

const bookingsData = [
  {
    id: 1,
    status: statuses[1], // In Progress
    name: "Sara Johnson",
    bookingNumber: 1,
    service: "Deep Cleaning",
    dateTime: "25-07-2025 at 9:00 AM",
    cleaners: "Maria Gracia",
    address: "123 Oak Street",
    phone: "(555) 123-4567",
    price: 150,
    notes: "Pet-friendly cleaning request"
  }
];

export default function InvoiceManagementPanel() {
  return (
    <div className="border border-black/10 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <h5 className="text-subtitle ">Invoice Management (4 total)</h5>
        <Button
          variant={"secondary"}
          size={"2xs"}
          className="flex items-center gap-1"
        >
          <ClockIcon2 className="size-4" />
          Send All Reminders
        </Button>
      </div>
      <div className="mt-8">
        {bookingsData.map((booking) => (
          <FinancialsListItem
            key={booking.id}
            statuses={statuses}
            initialStatus={booking.status}
            bookingName={booking.name}
            bookingNumber={booking.bookingNumber}
            service={booking.service}
            dateTime={booking.dateTime}
            cleaners={booking.cleaners}
            address={booking.address}
            phone={booking.phone}
            price={booking.price}
            notes={booking.notes}
          />
        ))}
      </div>
    </div>
  );
}
