"use client";
import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import { Filter, PlusIcon } from "lucide-react";
import BookingCard from "./BookingCard";
import { useGetBookingsQuery } from "../../_services/queries";
import Link from "next/link";
import Select from "@/components/ui/Select";
import { useSearchParams } from "next/navigation";

export default function MyBookingSection3() {
  const searchParams = useSearchParams();
  console.log(searchParams.get("status"));
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || ""
  );
  const filterOptions = [
    { label: "Upcoming", value: "upcoming" },
    { label: "Today", value: "today" }
  ];
  const { data: bookings, isLoading: bookingsIsLoading } =
    useGetBookingsQuery();

  if (!bookings) return null;
  const upcomingBookings = bookings.data.filter((booking) => {
    const bookingDate = new Date(booking.timeSlot.date);
    const today = new Date();
    return bookingDate >= today;
  });
  const filteredBookingsFinalBookings =
    statusFilter === "today"
      ? upcomingBookings.filter((booking) => {
          const bookingDate = new Date(booking.timeSlot.date);
          const today = new Date();
          return (
            bookingDate.getDate() === today.getDate() &&
            bookingDate.getMonth() === today.getMonth() &&
            bookingDate.getFullYear() === today.getFullYear()
          );
        })
      : upcomingBookings;
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-8">
        <div className=" lg:p-6 lg:border border-surface-500/30 rounded-lg flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full">
            <div>
              <h3 className="flex text-secondary-700 items-center gap-2.5 font-medium text-lg">
                Upcoming Appointments
              </h3>
              <h3 className="text-caption text-secondary-800">
                Your scheduled cleaning sessions
              </h3>
            </div>
            <div className="md:justify-end">
              <div className="flex h-fit text-caption text-secondary-700 items-center bg-surface-50 pl-4 rounded-lg">
                <Filter className="size-4" />
                <Select
                  options={filterOptions}
                  value={
                    statusFilter
                      ? filterOptions.find((i) => i.value === statusFilter)
                      : filterOptions[0]
                  }
                  onChange={(option) => {
                    setStatusFilter(option.value);
                  }}
                  placeholder="All Bookings"
                  buttonClassName="border-none gap-2 font-medium"
                  accent="secondary"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {filteredBookingsFinalBookings.map((booking) => (
              <BookingCard key={booking.id} service={{ ...booking }} />
            ))}
            {bookingsIsLoading && <p>Loading...</p>}
            {filteredBookingsFinalBookings.length === 0 && (
              <p className="text-secondary-700 text-center">
                No upcoming bookings found.
              </p>
            )}
          </div>
          <Link href="/booking/new">
            <Button
              size={"xs"}
              className="w-full flex justify-center gap-3 "
              variant={"outline"}
            >
              <PlusIcon />
              <p>Add Booking</p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
