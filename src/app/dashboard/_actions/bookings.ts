"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverRequest } from "@/lib/serverRequest";
import { Review, User } from "../_utils/types";

export async function cancelBooking({
  bookingId
}: {
  bookingId: number | string;
}) {
  console.log({ bookingId });
  try {
    const booking = await serverRequest(`bookings/${bookingId}`, "DELETE");
    return booking.data;
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
  }
}

export async function updateProfile({
  fullName,
  phoneNumber,
  address,
  userId
}: {
  fullName: string;
  phoneNumber: string;
  address: string;
  userId: string;
}) {
  try {
    console.log("there is something going on here");
    const response = await serverRequest(`/users/profile/${userId}`, "PATCH", {
      fullName,
      phoneNumber,
      address
    });
    return response.data as User;
  } catch (error) {
    console.error("Error updating user profile", error);
  }
}
