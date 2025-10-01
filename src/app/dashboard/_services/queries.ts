import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Booking, Review, User } from "../_utils/types";

export function useGetBookingsQuery(statusFilter: string = "", limit = 50) {
  return useQuery({
    queryKey: ["bookings", statusFilter],
    queryFn: () =>
      axios
        .get(`/api/bookings?limit=${limit}&status=${statusFilter}`)
        .then((i) => i.data) as Promise<{
        limit: number;
        page: number;
        total: number;
        data: Booking[];
      }>
  });
}

export function useGetInfiniteBookingsQuery(
  statusFilter: string = "",
  limit = 5
) {
  return useInfiniteQuery({
    queryKey: ["bookings-infinite", statusFilter, limit],
    queryFn: ({ pageParam }) =>
      axios
        .get(
          `/api/bookings?limit=${limit}&page=${pageParam}&status=${statusFilter}`
        )
        .then((i) => i.data) as Promise<{
        limit: number;
        page: number;
        total: number;
        data: Booking[];
      }>,
    getNextPageParam: (lastPage) => {
      const hasMore = lastPage.page * lastPage.limit < lastPage.total;
      return hasMore ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 0
  });
}

export function useGetUserProfile() {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: () =>
      axios.get("/api/auth/profile").then((i) => i.data) as Promise<User>
  });
}

export function useGetUserDetails(userId: string | number) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () =>
      axios.get(`/users/${userId}`).then((i) => i.data) as Promise<User>
  });
}

export function useGetBookingReview(bookingId: string) {
  return useQuery({
    queryKey: ["booking-review", bookingId],
    queryFn: () =>
      axios
        .get(`/api/bookings/${bookingId}/reviews`)
        .then((i) => i.data) as Promise<Review>
  });
}
