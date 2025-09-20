"use client";
import React from "react";
import ServiceHistorySection1 from "./_components/ServiceHistorySection1";
import ServiceHistorySection2 from "./_components/ServiceHistorySection2";
import ServiceHistorySection3 from "./_components/ServiceHistorySection3";
import { useGetBookingsQuery } from "../_services/queries";

export default function ServiceHistoryPage() {
  const { data } = useGetBookingsQuery();
  const bookings = data?.data || [];
  const completedBookings = bookings.filter(
    (booking) => booking.status === "COMPLETED"
  );

  const totalServices = completedBookings.length;
  const totalSpent = completedBookings.reduce(
    (total, booking) => total + booking.price,
    0
  );

  return (
    <div className="flex flex-col mt-15 lg:mt-0 gap-6 lg:mx-6">
      <ServiceHistorySection1 />
      <ServiceHistorySection2
        totalServices={totalServices}
        averageRating={0}
        totalSpent={totalSpent}
      />
      <ServiceHistorySection3 historyServices={completedBookings} />
    </div>
  );
}
