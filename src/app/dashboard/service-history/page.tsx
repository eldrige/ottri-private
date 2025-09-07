import React from "react";
import ServiceHistorySection1 from "./_components/ServiceHistorySection1";
import ServiceHistorySection2 from "./_components/ServiceHistorySection2";
import ServiceHistorySection3 from "./_components/ServiceHistorySection3";
import { getBookingReview, getBookings } from "../_utils/queries";

export default async function ServiceHistoryPage() {
  const bookings = await getBookings();
  const completedBookings = bookings.filter(
    (booking) => booking.status === "COMPLETED"
  );

  const totalServices = completedBookings.length;
  const totalSpent = completedBookings.reduce(
    (total, booking) => total + booking.price,
    0
  );

  let averageRating = 0;
  for (const booking of completedBookings) {
    try {
      const review = await getBookingReview(booking.id);
      if (review) {
        averageRating += review.rating;
      }
    } catch (error) {
      console.error(`Error fetching review for booking ${booking.id}:`, error);
    }
  }

  averageRating /= completedBookings.length;

  return (
    <div className="flex flex-col mt-15 lg:mt-0 gap-6 lg:mx-6">
      <ServiceHistorySection1 />
      <ServiceHistorySection2
        totalServices={totalServices}
        averageRating={averageRating}
        totalSpent={totalSpent}
      />
      <ServiceHistorySection3 />
    </div>
  );
}
