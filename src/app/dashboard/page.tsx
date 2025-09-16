"use client";
import React from "react";
import DashboardSection1 from "./_components/DashboardSection1";
import DashboardSection2 from "./_components/DashboardSection2";
import DashboardSection3 from "./_components/DashboardSection3";
import DashboardSection4 from "./_components/DashboardSection4";
import { formatHour24To12, nextCleaningDate } from "./_utils/helpers";
import { useGetBookingsQuery } from "./_services/queries";

export default function DashboardPage() {
  // const { data: userInfo } = useGetUserProfile();
  // const { data: user } = useGetUserDetails(userInfo.id);
  const { data: bookings } = useGetBookingsQuery();
  const amountSpent = bookings
    ? bookings.data.reduce((acc, booking) => acc + booking.price, 0)
    : 0;
  const totalCleanings = bookings?.data.length;
  const nextCleaning =
    bookings && bookings.data.length > 0
      ? {
          date: nextCleaningDate(bookings.data[0].timeSlot.date),
          time:
            formatHour24To12(bookings.data[0].timeSlot.startTime) +
            " - " +
            formatHour24To12(bookings.data[0].timeSlot.endTime)
        }
      : {
          date: "No upcoming cleanings",
          time: ""
        };
  return (
    <div className="flex flex-col mt-15 lg:mt-0 gap-6 lg:mx-6">
      <DashboardSection1 />
      <DashboardSection2
        amountSpent={amountSpent}
        nextCleaningInfo={nextCleaning}
        totalCleanings={totalCleanings}
      />
      <DashboardSection3 />
      <DashboardSection4 />
    </div>
  );
}
