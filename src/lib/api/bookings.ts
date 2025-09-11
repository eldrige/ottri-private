import { serverRequest } from "../serverRequest";

export function getBookings(searchParams: URLSearchParams) {
  console.log(`bookings?${searchParams.toString()}`);
  return serverRequest(`bookings?${searchParams.toString()}`, "GET");
}
