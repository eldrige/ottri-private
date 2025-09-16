import { axiosInstance } from "@/lib/axios";
import ClientAdminBookingsPage from "./ClientAdminBookingsPage";
import { BookingsResponse, Cleaner, ServiceOption } from "../../types";
import { getBookings } from "@/lib/api/bookings";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";

export default async function AdminBookingsPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sPs = await searchParams;
  const queryClient = new QueryClient();

  const prefetcher = queryClient.prefetchQuery({
    queryKey: ["bookings", sPs.status || ""],
    queryFn: () =>
      getBookings(new URLSearchParams(sPs)).then(
        (i) => i.data
      ) as Promise<BookingsResponse>
  });

  const res = await Promise.all([
    prefetcher,
    axiosInstance.get("services"),
    axiosInstance.get("cleaners?limit=50")
  ]);

  const servicesOptions = res[1].data as ServiceOption[];
  const cleaners = res[2].data as Cleaner[];

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientAdminBookingsPage
        servicesOptions={servicesOptions}
        cleaners={cleaners}
      />
    </HydrationBoundary>
  );
}
