import { axios, serverRequest } from "@/lib/axios";
import ClientAdminBookingsPage from "./ClientAdminBookingsPage";
import { BookingsResponse, ServiceOption } from "../../types";

export default async function AdminBookingsPage() {
  const res = await Promise.all([
    serverRequest("bookings?limit=30", "GET"),
    axios.get("services")
  ]);
  const bookings = res[0].data as BookingsResponse;

  const servicesOptions = res[1].data as ServiceOption[];

  console.log(bookings.data);
  return (
    <ClientAdminBookingsPage
      bookingsResponse={bookings}
      servicesOptions={servicesOptions}
    />
  );
}
