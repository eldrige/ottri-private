"use client";
import MyBookingSection1 from "./_components/MyBookingSection1";
import MyBookingSection2 from "./_components/MyBookingSection2";
import MyBookingSection3 from "./_components/MyBookingSection3";
import MyBookingSection4 from "./_components/MyBookingSection4";
import { useGetBookingsQuery } from "../_services/queries";

export default function MyBookingPage() {
  const today = new Date().toISOString().split("T")[0];

  const { data: upCommingBookings } = useGetBookingsQuery(
    "",
    4,
    undefined,
    today
  );
  const { data } = useGetBookingsQuery();
  const bookings = data?.data || [];

  const totalUpcomingBookings = upCommingBookings?.data.length;

  const thisMonthTotalBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.createdAt);
    const today = new Date();
    return (
      bookingDate.getMonth() === today.getMonth() &&
      bookingDate.getFullYear() === today.getFullYear()
    );
  }).length;

  const totalSpentThisMonth = bookings
    .filter((booking) => {
      const bookingDate = new Date(booking.createdAt);
      const today = new Date();
      return (
        bookingDate.getMonth() === today.getMonth() &&
        bookingDate.getFullYear() === today.getFullYear()
      );
    })
    .reduce((acc, booking) => acc + booking.price, 0);

  return (
    <div className="flex flex-col mt-15 lg:mt-0 gap-6 lg:mx-6">
      <MyBookingSection1 />
      <MyBookingSection2
        upcomingBookings={totalUpcomingBookings || 0}
        thisMonthTotalBookings={thisMonthTotalBookings}
        totalSpentThisMonth={totalSpentThisMonth || 0}
      />
      <MyBookingSection3 />
      <MyBookingSection4 />
    </div>
  );
}
