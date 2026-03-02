"use client";
import React from "react";
import StatCard from "../../_components/StatCard";
import { Button } from "@/components/ui/Button";
import { PlusIcon } from "lucide-react";
import { useGetBookingsQuery } from "../../_services/queries";

export default function BillingSection2() {
  const { data: bookingsData } = useGetBookingsQuery();
  const totalSpent =
    bookingsData?.data.reduce((acc, booking) => acc + booking.price, 0) || 0;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StatCard
        title="This month"
        content={`$${totalSpent.toFixed(2)}`}
        value="Total Spent"
      />
      <StatCard title="Next Payment" value="Aug 15" content="Auto-renewal" />
      <Button
        className="md:hidden flex justify-center py-2.25 gap-2 px-3 items-center h-fit"
        size={"xs"}
      >
        <PlusIcon />
        Add Booking
      </Button>
    </div>
  );
}
