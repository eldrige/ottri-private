import {
  QueryClient,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import {
  assignCleaner,
  cancelBooking,
  completeBooking,
  startBooking
} from "../_actions/bookings";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { Booking, BookingsResponse } from "@/app/admin/types";

// Assign cleaner
export function useAssignCleanerMutation() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  return useMutation({
    mutationFn: assignCleaner,
    onSuccess: (data) => {
      updateBookingHelper(searchParams, queryClient, data);
    }
  });
}

export function useCancelBookingMutation() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: (data) => {
      updateBookingHelper(searchParams, queryClient, data);
    }
  });
}

export function useStartBookingMutation() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  return useMutation({
    mutationFn: startBooking,
    onSuccess: (data) => {
      updateBookingHelper(searchParams, queryClient, data);
    }
  });
}

export function useCompleteBookingMutation() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  return useMutation({
    mutationFn: completeBooking,
    onSuccess: (data) => {
      updateBookingHelper(searchParams, queryClient, data);
    }
  });
}

// Helpers
function updateBookingHelper(
  searchParams: ReadonlyURLSearchParams,
  queryClient: QueryClient,
  newBooking: Booking
) {
  const statusFilter = searchParams.get("status") || "";
  const queryData = queryClient.getQueryData([
    "bookings",
    statusFilter
  ]) as BookingsResponse;
  if (!queryData) return;

  const newBookings = queryData.data.map((b) =>
    b.id === newBooking.id ? newBooking : b
  );

  const newData = { ...queryData, data: newBookings } as BookingsResponse;

  queryClient.setQueryData(["bookings", statusFilter], newData);
}

// function removeBookingHelper(
//   searchParams: ReadonlyURLSearchParams,
//   queryClient: QueryClient,
//   booking: Booking
// ) {
//   const statusFilter = searchParams.get("status") || "";
//   const queryData = queryClient.getQueryData([
//     "bookings",
//     statusFilter
//   ]) as BookingsResponse;
//   if (!queryData) return;

//   const newBookings = queryData.data.filter((i) => i.id !== booking.id);

//   const newData = { ...queryData, data: newBookings } as BookingsResponse;

//   queryClient.setQueryData(["bookings", statusFilter], newData);
// }
