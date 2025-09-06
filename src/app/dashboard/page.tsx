import React from "react";
import DashboardSection1 from "./_components/DashboardSection1";
import DashboardSection2 from "./_components/DashboardSection2";
import DashboardSection3 from "./_components/DashboardSection3";
import DashboardSection4 from "./_components/DashboardSection4";
import { getBookings, getUserDetails, getUserProfile } from "./_utils/queries";
import { formatHour24To12, nextCleaningDate } from "./_utils/helpers";

export default async function DashboardPage() {
  const userInfo = await getUserProfile();
  const user = await getUserDetails(userInfo.id);
  const bookings = await getBookings();
  const amountSpent = bookings.reduce((acc, booking) => acc + booking.price, 0);
  const totalCleanings = bookings.length;
  const nextCleaning = {
    date: nextCleaningDate(bookings[0].timeSlot.date),
    time:
      formatHour24To12(bookings[0].timeSlot.startTime) +
      " - " +
      formatHour24To12(bookings[0].timeSlot.endTime)
  };
  return (
    <div className="flex flex-col mt-15 lg:mt-0 gap-6 lg:mx-6">
      <DashboardSection1 fullName={user.personalInformation.fullName} />
      <DashboardSection2
        amountSpent={amountSpent}
        nextCleaningInfo={nextCleaning}
        totalCleanings={totalCleanings}
      />
      <DashboardSection3 bookings={bookings} />
      <DashboardSection4 />
    </div>
  );
}
