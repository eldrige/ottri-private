import {
  ArticleType,
  ServiceAddOn,
  TimeSlot
} from "@/app/(landings)/booking/new/types";
import {
  Booking,
  BookingsResponse,
  BookingStats,
  Cleaner,
  MapBookingsResponse,
  ServiceArea,
  ServiceOption
} from "@/app/admin/types";
import { axiosInstance, clientAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type GBQParamsType = {
  statusFilter?: string;
  limit?: number;
  startDate?: string;
  endDate?: string;
  page?: number;
  enabled?: boolean;
};
export function useGetBookingsQuery({
  statusFilter = "",
  limit = 50,
  startDate,
  endDate,
  page = 0,
  enabled = true
}: GBQParamsType) {
  const sp = new URLSearchParams();
  if (limit) sp.append("limit", String(limit));
  if (statusFilter) sp.append("status", statusFilter);
  if (startDate) sp.append("startDate", startDate);
  if (endDate) sp.append("endDate", endDate);
  if (page) sp.append("page", String(page));

  return useQuery({
    queryKey: ["bookings", { statusFilter, limit, startDate, endDate, page }],
    queryFn: () =>
      clientAxios
        .get(`/bookings?${sp}`)
        .then((i) => i.data) as Promise<BookingsResponse>,
    enabled: enabled
  });
}

export function useGetBookingQuery(bookingId: string | number) {
  return useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () =>
      clientAxios
        .get(`/bookings/${bookingId}`)
        .then((i) => i.data) as Promise<Booking>
  });
}

export function useMapBookingsQuery({
  statusFilter = ""
}: {
  statusFilter?: string;
}) {
  const sp = new URLSearchParams();
  if (statusFilter) sp.append("status", statusFilter);

  return useQuery({
    queryKey: ["bookings", "map", { statusFilter }],
    queryFn: () =>
      clientAxios
        .get(`bookings/map?${sp}`)
        .then((i) => i.data) as Promise<MapBookingsResponse>
  });
}

export function useStatsQuery({
  statusFilter,
  startDate,
  endDate
}: Pick<GBQParamsType, "startDate" | "endDate" | "statusFilter">) {
  const sp = new URLSearchParams();
  if (statusFilter) sp.append("status", statusFilter);
  if (startDate) sp.append("startDate", startDate);
  if (endDate) sp.append("endDate", endDate);
  return useQuery({
    queryKey: ["bookings-stats", { statusFilter, startDate, endDate }],
    queryFn: () => {
      return axios
        .get(`/api/proxy?path=/bookings/stats?${sp}`)
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
export function useCleanersQuery({
  archived,
  limit = 50
}: {
  archived?: boolean;
  limit?: number;
}) {
  const sp = new URLSearchParams();
  if (limit) sp.append("limit", String(limit));
  if (archived) sp.append("archived", "true");
  return useQuery({
    queryKey: ["cleaners", archived && "archived"].filter((i) => i),
    queryFn: () =>
      clientAxios.get(`cleaners?${sp}`).then((i) => i.data) as Promise<
        Cleaner[]
      >
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

// Blogs
export function useArticlesQuery() {
  return useQuery({
    queryKey: ["articles"],
    queryFn: () =>
      clientAxios.get<ArticleType[]>("articles").then((i) => i.data)
  });
}
