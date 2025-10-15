import { ServiceAddOn, TimeSlot } from "@/app/(landings)/booking/new/types";
import {
  BookingsResponse,
  BookingStats,
  Cleaner,
  ServiceArea,
  ServiceOption
} from "@/app/admin/types";
import { axiosInstance, clientAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type GBQParamsType = {
  statusFilter?: string;
  limit?: number;
  startTime?: string;
  endTime?: string;
};
export function useGetBookingsQuery({
  statusFilter = "",
  limit = 50,
  startTime,
  endTime
}: GBQParamsType) {
  const sp = new URLSearchParams();
  if (limit) sp.append("limit", String(limit));
  if (statusFilter) sp.append("status", statusFilter);
  if (startTime) sp.append("startTime", startTime);
  if (endTime) sp.append("endTime", endTime);

  return useQuery({
    queryKey: ["bookings", { statusFilter, limit, startTime, endTime }],
    queryFn: () =>
      axios
        .get(`/api/bookings?${sp}`)
        .then((i) => i.data) as Promise<BookingsResponse>
  });
}

export function useStatsQuery() {
  return useQuery({
    queryKey: ["booking-stats"],
    queryFn: () => {
      return axios
        .get("/api/proxy?path=/bookings/stats")
        .then((i) => i.data) as Promise<BookingStats>;
    }
  });
}

// Services
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
export function useCleanersQuery({ archive }: { archive?: boolean }) {
  const sp = new URLSearchParams();
  if (archive) sp.append("archive", "true");
  return useQuery({
    queryKey: ["cleaners", archive && "archive"].filter((i) => i),
    queryFn: () =>
      clientAxios
        .get(`cleaners?limit=50&archive=true`)
        .then((i) => i.data) as Promise<Cleaner[]>
  });
}

// Service Areas
export function useServiceAreasQuery() {
  return useQuery({
    queryKey: ["service-areas"],
    queryFn: () =>
      axiosInstance.get("service-areas").then((i) => i.data as ServiceArea[])
  });
}

// Timeslots
export function useTimeSlotsQuery() {
  return useQuery({
    queryKey: ["timeslots"],
    queryFn: () =>
      axiosInstance.get<TimeSlot[]>("timeslots").then((i) => i.data)
  });
}

// ServiceAddons
export function useServiceAddOnsQuery() {
  return useQuery({
    queryKey: ["add-ons"],
    queryFn: () =>
      axiosInstance.get<ServiceAddOn[]>("service-addons").then((i) => i.data)
  });
}
