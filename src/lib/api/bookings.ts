// import { serverFetch } from "../serverFetch";
import { serverRequest } from "../serverRequest";

export function getBookings(searchParams: URLSearchParams) {
  console.log(`bookings?${searchParams.toString()}`);
  return serverRequest(`bookings?${searchParams.toString()}`, "GET");
  // return serverFetch(`bookings?${searchParams.toString()}`, "GET")
}
