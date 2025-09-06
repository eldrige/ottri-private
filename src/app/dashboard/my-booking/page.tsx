import React from "react";
import MyBookingSection1 from "./_components/MyBookingSection1";
import MyBookingSection2 from "./_components/MyBookingSection2";
import MyBookingSection3 from "./_components/MyBookingSection3";
import MyBookingSection4 from "./_components/MyBookingSection4";
import { getBookings } from "../_utils/queries";

export default async function MyBookingPage() {
  const bookings = await getBookings();
  const upCommingBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.timeSlot.date);
    const today = new Date();
    const in30Days = new Date();
    in30Days.setDate(today.getDate() + 30);
    return bookingDate >= today && bookingDate <= in30Days;
  });

  const pastBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.timeSlot.date);
    const today = new Date();
    return bookingDate < today;
  });

  const totalUpcomingBookings = upCommingBookings.length;

  const thisMonthTotalBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.timeSlot.date);
    const today = new Date();
    return (
      bookingDate.getMonth() === today.getMonth() &&
      bookingDate.getFullYear() === today.getFullYear()
    );
  }).length;

  const totalSpentThisMonth = bookings
    .filter((booking) => {
      const bookingDate = new Date(booking.timeSlot.date);
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
        upcomingBookings={totalUpcomingBookings}
        thisMonthTotalBookings={thisMonthTotalBookings}
        totalSpentThisMonth={totalSpentThisMonth || 0}
      />
      <MyBookingSection3 upcomingBookings={upCommingBookings} />
      <MyBookingSection4 pastBookings={pastBookings} />
    </div>
  );
}
