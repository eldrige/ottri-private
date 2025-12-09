"use client";
import React, { useState } from "react";
import BookingCard from "./BookingCard";
import { ChevronLeft, ChevronRight, Filter, Loader2 } from "lucide-react";
import RatingPopUp from "./RatingPopUp";
import { Booking } from "../../_utils/types";
import { useGetBookingsQuery } from "../../_services/queries";
import { useSearchParams } from "next/navigation";
import Select from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import ModalWrapper from "@/components/common/ModalWrapper";

export default function MyBookingSection4() {
  const searchParams = useSearchParams();

  const today = new Date().toISOString().split("T")[0];
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || ""
  );
  const [page, setPage] = useState(0);

  const { data: bookings, isLoading } = useGetBookingsQuery(
    statusFilter,
    4,
    page,
    "",
    today
  );

  const pastBookings = bookings?.data || [];

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
    { label: "Unpaid", value: "UNPAID" },
    { label: "In Progress", value: "INPROGRESS" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Cancelled", value: "CANCELLED" }
  ];

  const totalPages = bookings ? Math.ceil(bookings.total / bookings.limit) : 0;

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
                <div className="flex h-fit text-caption text-secondary-700 items-center bg-surface-50 px-3 rounded-lg">
                  <Filter className="size-4" />
                  <Select
                    options={filterOptions}
                    value={
                      statusFilter
                        ? filterOptions.find((i) => i.value === statusFilter)
                        : filterOptions[0]
                    }
                    onChange={(option) => {
                      setPage(0); // Reset to first page when filter changes
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
                    buttonClassName="border-none gap-0 font-medium"
                    accent="secondary"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              {pastBookings.length > 0
                ? pastBookings.map((service, index) => (
                    <BookingCard
                      key={service.id || index}
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
                <div className="text-caption w-full flex items-center justify-center text-center text-secondary-800">
                  <Loader2 className="animate-spin w-4 h-4" />
                </div>
              )}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4">
                <Button
                  onClick={() => setPage((old) => Math.max(old - 1, 0))}
                  disabled={page === 0}
                  size="2xs"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <span className="text-sm text-secondary-700">
                  Page {page + 1} of {totalPages}
                </span>
                <Button
                  onClick={() => setPage((old) => old + 1)}
                  disabled={page >= totalPages - 1}
                  size="2xs"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <ModalWrapper onClose={() => setIsOpen(false)}>
          <RatingPopUp
            onClose={() => setIsOpen(false)}
            booking={bookedServiceOnRating}
          />
        </ModalWrapper>
      )}
    </>
  );
}
