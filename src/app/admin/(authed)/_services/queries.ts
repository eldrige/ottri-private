import { BookingsResponse, Cleaner, ServiceOption } from "@/app/admin/types";
import { axiosInstance } from "@/lib/axios";
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

export function useServicesQuery() {
  return useQuery({
    queryKey: ["services"],
    queryFn: () =>
      axiosInstance.get(`services`).then((i) => i.data) as Promise<
        ServiceOption[]
      >
  });
}

// Cleaners
export function useCleanersQuery() {
  return useQuery({
    queryKey: ["cleaners"],
    queryFn: () =>
      axiosInstance.get(`cleaners?limit=50`).then((i) => i.data) as Promise<
        Cleaner[]
      >
  });
}

// Service Areas
export function useServiceAreasQuery() {
  return useQuery({
    queryKey: ["service-areas"],
    queryFn: () => axiosInstance.get("service-areas").then((i) => i.data)
  });
}
