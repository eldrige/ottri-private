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

  const reviews = await Promise.all(
    completedBookings.map(async (booking) => {
      try {
        return await getBookingReview(booking.id);
      } catch (error) {
        if (
          error &&
          typeof error === "object" &&
          "status" in error &&
          error.status === 404
        ) {
          return undefined;
        }
        console.error(`Failed to get review for booking ${booking.id}:`, error);
        return undefined;
      }
    })
  );
  let averageRating = reviews.reduce(
    (total, review) => total + (review?.rating || 0),
    0
  );

  averageRating /= completedBookings.length;

  return (
    <div className="flex flex-col mt-15 lg:mt-0 gap-6 lg:mx-6">
      <ServiceHistorySection1 />
      <ServiceHistorySection2
        totalServices={totalServices}
        averageRating={averageRating}
        totalSpent={totalSpent}
      />
      <ServiceHistorySection3
        reviews={reviews}
        historyServices={completedBookings}
      />
    </div>
  );
}
