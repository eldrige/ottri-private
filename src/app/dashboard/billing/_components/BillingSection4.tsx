"use client";
import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import { useGetBookingsQuery } from "../../_services/queries";
import { formatDate } from "@/lib/utils";
import { formatName } from "../../_utils/helpers";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BillingSection4() {
  const [page, setPage] = useState(0);
  const { data: bookings, isLoading: bookingsIsLoading } = useGetBookingsQuery(
    "",
    4,
    page
  );

  const totalPages = bookings ? Math.ceil(bookings.total / bookings.limit) : 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="lg:p-6 lg:border border-surface-500/30 rounded-lg flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full">
          <div>
            <h3 className="flex text-secondary-700 items-center gap-2.5 font-medium text-lg">
              Transaction History
            </h3>
            <h3 className="text-caption text-secondary-800">
              Your recent payments and credit
            </h3>
          </div>
        </div>
        <div className="space-y-4">
          {bookingsIsLoading ? (
            <p>Loading Bookings...</p>
          ) : (
            bookings?.data.map((booking) => (
              <TransactionCard
                key={booking.id}
                service={formatName(booking.serviceType.name)}
                cleaner={booking.cleaners[0]?.fullName || "No Cleaner"}
                amount={booking.price}
                date={formatDate(booking.timeSlot.date)}
                state={formatName(booking.status)}
              />
            ))
          )}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <Button
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
              disabled={page === 0}
              size={"2xs"}
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
  );
}

type TransactionCardProps = {
  service: string;
  cleaner: string;
  date: string;
  amount: number;
  state: string;
};

function TransactionCard({
  service,
  cleaner,
  date,
  amount,
  state
}: TransactionCardProps) {
  return (
    <div className="flex  px-4 py-2 rounded-lg border border-surface-500/30  flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1 h-full justify-between">
          <h2 className="text-secondary-700 gap-2.5 font-semibold text-lg">
            {service} - {cleaner}
          </h2>
          <p className="text-caption text-secondary-800">{date}</p>
          <p className="text-red-500 py-2 text-nowrap md:hidden">
            -${amount.toFixed(2)}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="hidden md:block text-red-500 text-nowrap">
            -${amount.toFixed(2)}
          </p>
          <Button
            size={"xs"}
            className="w-full hidden md:flex text-caption text-secondary-700 justify-center gap-3 "
            variant={"outline"}
          >
            {state}
          </Button>
        </div>
      </div>
      <Button
        size={"xs"}
        className="w-full md:hidden text-caption text-secondary-700 flex justify-center gap-3 "
        variant={"outline"}
      >
        {state}
      </Button>
    </div>
  );
}
