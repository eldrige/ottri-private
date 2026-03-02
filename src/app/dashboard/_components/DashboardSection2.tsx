import React from "react";
import StatCard from "./StatCard";
import BroomSparkleIcon from "@/components/icons/BroomSparkleIcon";
import MoneyIcon from "@/components/icons/MoneyIcon";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useGetBookingsQuery } from "../_services/queries";
import { formatHour24To12, nextCleaningDate } from "../_utils/helpers";

export default function DashboardSection2() {
  // const { data: userInfo } = useGetUserProfile();
  // const { data: user } = useGetUserDetails(userInfo.id);
  const { data: bookings, isLoading } = useGetBookingsQuery();
  const amountSpent = bookings
    ? bookings.data.reduce((acc, booking) => acc + booking.price, 0)
    : 0;
  const totalCleanings = bookings?.data.length;
  const nextCleaning = bookings &&
    bookings.data.length > 0 && {
      date: nextCleaningDate(bookings?.data[0].timeSlot.date),
      time:
        formatHour24To12(bookings?.data[0].timeSlot.startTime) +
        " - " +
        formatHour24To12(bookings?.data[0].timeSlot.endTime)
    };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard
        title="Next Cleaning"
        content={
          isLoading && !bookings
            ? "Loading..."
            : nextCleaning
              ? nextCleaning.time
              : "Not scheduled"
        }
        value={
          isLoading && !bookings
            ? "Loading..."
            : nextCleaning
              ? nextCleaning.date
              : "No upcoming cleaning"
        }
        Icon={CalendarIcon}
      />
      <StatCard
        title="Total Cleanings"
        value={(totalCleanings || 0).toString()}
        content={`+${(totalCleanings || 0).toString()} this month`}
        Icon={BroomSparkleIcon}
      />
      <StatCard
        title="Amount Spent"
        value={`$${(amountSpent || 0).toFixed(2)}`}
        content={`+${(amountSpent || 0).toFixed(2)} this month`}
        Icon={MoneyIcon}
      />
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
