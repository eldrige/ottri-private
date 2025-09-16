"use client";
import React, { useState } from "react";
import BookingCard from "./BookingCard";
import { Filter, Loader2 } from "lucide-react";
import RatingPopUp from "./RatingPopUp";
import { Booking } from "../../_utils/types";
import { useGetBookingsQuery } from "../../_services/queries";
import { useSearchParams } from "next/navigation";
import Select from "@/components/ui/Select";

export default function MyBookingSection4() {
  const searchParams = useSearchParams();
  console.log(searchParams.get("status"));
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || ""
  );
  const { data: bookings, isLoading } = useGetBookingsQuery(statusFilter);
  const pastBookings = bookings
    ? bookings.data.filter(
        (booking) => booking.timeSlot.date < new Date().toISOString()
      )
    : [];
  const [isOpen, setIsOpen] = useState(false);
  const [bookedServiceOnRating, setBookedServiceOnRating] = useState<
    Pick<
      Booking,
      | "id"
      | "serviceType"
      | "timeSlot"
      | "address"
      | "cleaners"
      | "status"
      | "price"
    >
  >({ ...pastBookings[0] });
  const filterOptions = [
    { label: "All Bookings", value: "all-bookings" },
    { label: "Pending", value: "PENDING" },
    { label: "In Progress", value: "INPROGRESS" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Cancelled", value: "CANCELLED" }
  ];

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-8">
          <div className=" lg:p-6 lg:border border-surface-500/30 rounded-lg flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full">
              <div>
                <h3 className="flex text-secondary-700 items-center gap-2.5 font-medium text-lg">
                  Past Appointments
                </h3>
                <h3 className="text-caption text-secondary-800">
                  Your past cleaning sessions
                </h3>
              </div>
              <div className="justify-end">
                <div className="flex h-fit text-caption text-secondary-700 items-center gap-3 bg-surface-50 px-4 rounded-lg">
                  <Filter className="size-4" />
                  <Select
                    options={filterOptions}
                    value={
                      statusFilter
                        ? filterOptions.find((i) => i.value === statusFilter)
                        : filterOptions[0]
                    }
                    onChange={(option) => {
                      if (option.value === "all-bookings") {
                        window.history.pushState(
                          {},
                          "",
                          "/dashboard/my-bookings"
                        );
                        setStatusFilter("");
                      } else {
                        window.history.pushState(
                          {},
                          "",
                          `/dashboard/my-bookings?status=${option.value}`
                        );
                        setStatusFilter(option.value);
                      }
                    }}
                    placeholder="All Bookings"
                    buttonClassName="border-none gap-2 font-medium"
                    accent="secondary"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              {pastBookings.length > 0
                ? pastBookings.map((service, index) => (
                    <BookingCard
                      key={index}
                      service={service}
                      setIsOpen={setIsOpen}
                      setBookedServiceOnRating={setBookedServiceOnRating}
                    />
                  ))
                : !isLoading &&
                  pastBookings.length === 0 && (
                    <div className="text-caption w-full text-center text-secondary-800">
                      No past appointments
                    </div>
                  )}
              {isLoading && (
                <div className="text-caption w-full text-center text-secondary-800">
                  <Loader2 className="animate-spin " />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <RatingPopUp
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        booking={bookedServiceOnRating}
      />
    </>
  );
}
