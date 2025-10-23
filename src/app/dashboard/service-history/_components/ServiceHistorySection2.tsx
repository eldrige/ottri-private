import React from "react";
import StatCard from "../../_components/StatCard";
import { Button } from "@/components/ui/Button";
import { CalendarIcon, Download, StarIcon } from "lucide-react";
import MoneyIcon from "@/components/icons/MoneyIcon";
import { useGetBookingsQuery } from "../../_services/queries";

export default function ServiceHistorySection2() {
  const { data: bookingsCompleted, isLoading: isLoadingCompleted } =
    useGetBookingsQuery("COMPLETED");
  const { data: bookings, isLoading: isLoadingAll } = useGetBookingsQuery();
  const completedBookings = bookingsCompleted?.data || [];
  const loading = isLoadingCompleted || isLoadingAll;

  const totalServices = bookings?.total || 0;
  const totalSpent =
    bookings?.data?.reduce((total, booking) => total + booking.price, 0) || 0;
  const averageRating =
    completedBookings.reduce((cum, booking) => {
      return cum + (booking.review?.rating || 0);
    }, 0) / (completedBookings.filter((b) => b.review).length || 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard
        title="Total Services"
        content="Since joining"
        value={loading ? "Loading..." : totalServices.toString()}
        Icon={CalendarIcon}
      />
      <StatCard
        title="Average Rating"
        value={loading ? "Loading..." : averageRating.toFixed(1)}
        content="Out of 5 stars"
        Icon={StarIcon}
      />
      <StatCard
        title="Total Spent"
        value={loading ? "Loading..." : `$${totalSpent.toFixed(2)}`}
        content="All Spent"
        Icon={MoneyIcon}
      />
      <Button
        className="md:hidden flex justify-center py-2.25 gap-2 px-3 items-center h-fit"
        size={"xs"}
      >
        <Download />
        Export PDF
      </Button>
    </div>
  );
}
