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
import {
  createServiceAreas,
  deleteServiceAreas,
  updateServiceAreas
} from "../_actions/ServiceAreas";

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
    mutationFn: deleteServiceAreas,
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
    mutationFn: createServiceAreas,
    onSuccess: (data) => {
      createSAHelper(queryClient, data);
    }
  });
}

export function useUpdateServiceAreaMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateServiceAreas,
    onSuccess: (data) => {
      updateSAHelper(queryClient, data);
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
function deleteSAHelper(queryClient: QueryClient, SAs: { id: number }[]) {
  const queryData = queryClient.getQueryData([
    "service-areas"
  ]) as ServiceArea[];
  if (!queryData) return;

  const ids = SAs.map((i) => i.id);

  const newServiceAreas = queryData.filter((i) => !ids.includes(i.id));

  queryClient.setQueryData(["service-areas"], newServiceAreas);
}

function createSAHelper(queryClient: QueryClient, newSAs: ServiceArea[]) {
  const queryData = queryClient.getQueryData([
    "service-areas"
  ]) as ServiceArea[];
  if (!queryData) return;

  const newServiceAreas = [...queryData, ...newSAs];

  queryClient.setQueryData(["service-areas"], newServiceAreas);
}

function updateSAHelper(queryClient: QueryClient, newSAs: ServiceArea[]) {
  const queryData = queryClient.getQueryData([
    "service-areas"
  ]) as ServiceArea[];
  if (!queryData) return;

  const newServiceAreas = queryData.map(
    (i) => newSAs.find((j) => j.id === i.id) || i
  );

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
