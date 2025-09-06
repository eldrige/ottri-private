import React from "react";
import JobListItem from "../components/JobListItem";

const statuses = [
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" }
];

// Booking data array
const bookingsData = [
  {
    id: 1,
    status: statuses[1], // In Progress
    name: "Sara Johnson",
    jobId: 1,
    service: "Deep Cleaning",
    dateTime: "25-07-2025 at 9:00 AM",
    cleaner: "Maria Gracia",
    address: "123 Oak Street, Downtown",
    duration: "2 Hours"
  },
  {
    id: 2,
    status: statuses[0], // Pending
    name: "Mike Chen",
    jobId: 2,
    service: "Deep Cleaning",
    dateTime: "25-07-2025 at 9:00 AM",
    cleaner: "John Smith",
    address: "456 pine Avenue, Middletown",
    duration: "2 Hours"
  },
  {
    id: 3,
    status: statuses[0],
    name: "David Lee",
    jobId: 7,
    service: "Deep Cleaning",
    dateTime: "25-07-2025 at 9:00 AM",
    cleaner: "Carlos Martinez",
    address: "321 Business Blvd, Corporate",
    duration: "2 Hours"
  }
];

export default function JobAssignmentView() {
  return (
    <div className="lg:p-6 lg:border border-black/10 rounded-lg">
      <h4 className="text-heading-5">
        Current Job Assignments ({bookingsData.length})
      </h4>
      <div className="mt-4 space-y-4">
        {bookingsData.map((booking) => (
          <JobListItem
            key={booking.id}
            initialStatus={booking.status}
            bookingName={booking.name}
            bookingNumber={booking.jobId}
            service={booking.service}
            dateTime={booking.dateTime}
            cleaner={booking.cleaner}
            address={booking.address}
            duration={booking.duration || ""}
          />
        ))}
      </div>
    </div>
  );
}
