// import { serverFetch } from "../serverFetch";
import { serverRequest } from "../serverRequest";

export function getBookings(searchParams: URLSearchParams) {
  console.log(`booking?${searchParams.toString()}`);
  return serverRequest(`booking?${searchParams.toString()}`, "GET");
  // return serverFetch(`bookings?${searchParams.toString()}`, "GET")
}
