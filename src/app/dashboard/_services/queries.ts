import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Booking, Review, User } from "../_utils/types";

export function useGetBookingsQuery(
  statusFilter: string = "",
  limit = 4,
  page = 0
) {
  return useQuery({
    queryKey: ["bookings", statusFilter, limit, page],
    queryFn: () =>
      axios
        .get(`/api/bookings?limit=${limit}&status=${statusFilter}&page=${page}`)
        .then((i) => i.data) as Promise<{
        limit: number;
        page: number;
        total: number;
        data: Booking[];
      }>
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
