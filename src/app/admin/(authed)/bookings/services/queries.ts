import { BookingsResponse } from "@/app/admin/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetBookingsQuery(statusFilter: string = "", limit = 50) {
  return useQuery({
    queryKey: ["bookings", statusFilter],
    queryFn: () =>
      axios
        .get(`/api/bookings?limit=${limit}&status=${statusFilter}`)
        .then((i) => i.data) as Promise<BookingsResponse>
  });
}
