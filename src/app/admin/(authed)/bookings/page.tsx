import { serverRequest } from "@/lib/axios";
import ClientAdminBookingsPage from "./ClientAdminBookingsPage";
import { BookingsResponse } from "../../types";

export default async function AdminBookingsPage() {
  const res = await serverRequest("bookings", "GET");
  const bookings = res.data as BookingsResponse;

  console.log(bookings.data);
  return <ClientAdminBookingsPage bookings={bookings.data} />;
}
