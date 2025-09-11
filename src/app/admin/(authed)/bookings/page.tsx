import { axios } from "@/lib/axios";
import ClientAdminBookingsPage from "./ClientAdminBookingsPage";
import { BookingsResponse, Cleaner, ServiceOption } from "../../types";
import { getBookings } from "@/lib/api/bookings";
import { Suspense } from "react";

export default async function AdminBookingsPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  // const filter = (await searchParams).filter;

  const res = await Promise.all([
    getBookings(new URLSearchParams(await searchParams)),
    axios.get("services"),
    axios.get("cleaners?limit=50")
  ]);
  const bookings = res[0].data as BookingsResponse;
  const servicesOptions = res[1].data as ServiceOption[];
  const cleaners = res[2].data as Cleaner[];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientAdminBookingsPage
        initialBookingsResponse={bookings}
        servicesOptions={servicesOptions}
        cleaners={cleaners}
      />
    </Suspense>
  );
}
