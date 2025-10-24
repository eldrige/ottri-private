"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverRequest } from "@/lib/serverRequest";
import { Booking, Review } from "../_utils/types";

export async function cancelBooking({
  bookingId
}: {
  bookingId: number | string;
}) {
  console.log({ bookingId });
  try {
    const response = await serverRequest(`bookings/${bookingId}`, "DELETE");
    return response.data as Booking;
  } catch (err: any) {
    console.log(err.response);
    throw err;
  }
}

export async function rateBooking({
  bookingId,
  rating,
  comment,
  completionRate
}: Pick<Review, "bookingId" | "rating" | "comment" | "completionRate">) {
  console.log(bookingId, rating, comment, completionRate);
  try {
    const response = await serverRequest(
      `/bookings/${bookingId}/reviews`,
      "POST",
      {
        rating,
        comment,
        completionRate
      }
    );
    return response.data as Review;
  } catch (error) {
    console.error("Error rating booking:", error);
    throw error;
  }
}
