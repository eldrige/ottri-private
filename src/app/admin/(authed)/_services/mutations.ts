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
import {
  Booking as serviceArea,
  BookingsResponse,
  ServiceArea
} from "@/app/admin/types";
import { createServiceArea, deleteServiceArea } from "../_actions/ServiceAreas";

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

// Service Areas
export function useDeleteServiceAreaMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteServiceArea,
    onSettled: (data) => {
      console.log(data);
    },
    onSuccess: (data) => {
      console.log(data);
      deleteSAHelper(queryClient, data);
    }
  });
}

export function useCreateServiceAreaMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createServiceArea,
    onSuccess: (data) => {
      createSAHelper(queryClient, data);
    }
  });
}

// Helpers
function updateBookingHelper(
  searchParams: ReadonlyURLSearchParams,
  queryClient: QueryClient,
  newBooking: serviceArea
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

// ServiceAreas
function deleteSAHelper(queryClient: QueryClient, { id }: { id: number }) {
  const queryData = queryClient.getQueryData([
    "service-areas"
  ]) as ServiceArea[];
  if (!queryData) return;

  const newServiceAreas = queryData.filter((i) => i.id !== id);

  queryClient.setQueryData(["service-areas"], newServiceAreas);
}

function createSAHelper(queryClient: QueryClient, newServiceArea: ServiceArea) {
  const queryData = queryClient.getQueryData([
    "service-areas"
  ]) as ServiceArea[];
  if (!queryData) return;

  const newServiceAreas = [...queryData, newServiceArea];

  queryClient.setQueryData(["service-areas"], newServiceAreas);
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
