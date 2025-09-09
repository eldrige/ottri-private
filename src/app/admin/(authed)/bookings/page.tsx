import { axios } from "@/lib/axios";
import { serverRequest } from "@/lib/serverRequest";
import ClientAdminBookingsPage from "./ClientAdminBookingsPage";
import { BookingsResponse, Cleaner, ServiceOption } from "../../types";

export default async function AdminBookingsPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const filter = (await searchParams).filter;

  const res = await Promise.all([
    serverRequest(
      `bookings?limit=30${filter ? `&status=${filter}` : ""}`,
      "GET"
    ),
    axios.get("services"),
    axios.get("cleaners?limit=50")
  ]);
  const bookings = res[0].data as BookingsResponse;
  const servicesOptions = res[1].data as ServiceOption[];
  const cleaners = res[2].data as Cleaner[];

  return (
    <ClientAdminBookingsPage
      bookingsResponse={bookings}
      servicesOptions={servicesOptions}
      cleaners={cleaners}
    />
  );
}
