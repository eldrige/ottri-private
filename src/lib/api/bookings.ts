// import { serverFetch } from "../serverFetch";
import { serverRequest } from "../serverRequest";

export function getBookings(searchParams: URLSearchParams) {
  return serverRequest(`bookings?${searchParams.toString()}`, "GET");
  // return serverFetch(`bookings?${searchParams.toString()}`, "GET")
}

export function getBookingDetails(bookingId: string) {
  return serverRequest(`bookings/${bookingId}`, "GET");
  // return serverFetch(`bookings/${bookingId}`, "GET")
}

export async function getBookingReview(bookingId: number) {
  return serverRequest(`bookings/${bookingId}/reviews`, "GET");
}
