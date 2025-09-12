import { serverRequest } from "@/lib/serverRequest";
import { Booking } from "./types";

export async function cancelBooking(bookingId: number) {
  const response = await serverRequest(`/bookings/${bookingId}`, "DELETE");
  return response.data as Booking;
}
