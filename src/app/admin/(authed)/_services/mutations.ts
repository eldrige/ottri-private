import {
  QueryClient,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import {
  assignCleaner,
  cancelBooking,
  completeBooking,
  rescheduleBooking,
  startBooking,
  updateBooking
} from "../_actions/bookings";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import {
  Booking as serviceArea,
  BookingsResponse,
  ServiceArea,
  Cleaner
} from "@/app/admin/types";
import {
  createServiceAreas,
  deleteServiceAreas,
  updateServiceAreas
} from "../_actions/ServiceAreas";
import axios from "axios";
import {
  addTimeSlot,
  deleteTimeSlot,
  updateTimeSlot
} from "../_actions/timeSlots";
import { TimeSlot } from "@/app/(landings)/booking/new/types";
import { addCleaner, updateCleaner } from "../_actions/cleaners";
import { clientAxios } from "@/lib/axios";

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

// Bookings
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

export function useUpdateBookingMutation() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  return useMutation({
    mutationFn: updateBooking,
    onSuccess: (data) => {
      updateBookingHelper(searchParams, queryClient, data);
    }
  });
}

export function useAddBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: ({ formData }: any) =>
      axios.post("/api/submit-order", formData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["bookings"] });
    }
  });
}

export function useRescheduleBookingMutation() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  return useMutation({
    mutationFn: rescheduleBooking,
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

// TimeSlots
export function useUpdateTimeSlotMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTimeSlot,
    onSuccess: (data) => {
      updateTimeSlotHelper(queryClient, data);
      queryClient.invalidateQueries({ queryKey: ["timeslots"] });
    }
  });
}
export function useAddTimeSlotMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTimeSlot,
    onSuccess: (data) => {
      addTimeSlotHelper(queryClient, data);
      queryClient.invalidateQueries({ queryKey: ["timeslots"] });
    }
  });
}
export function useDeleteTimeSlotMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTimeSlot,
    onSuccess: (data) => {
      deleteTimeSlotHelper(queryClient, data);
    }
  });
}

// Cleaners
export function useUpdateCleanerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCleaner,
    onSuccess: (data) => {
      updateCleanerHelper(queryClient, data);
    }
  });
}

export function useAddCleanerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (...data: Parameters<typeof addCleaner>) => {
      const res = await addCleaner(...data);
      if (res.error || !res.data) throw await Promise.reject(res.error);

      return res.data;
    },
    onSuccess: (data) => {
      addCleanerHelper(queryClient, data);
    }
  });
}

export function useDeleteCleanerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ cleanerId }: { cleanerId: number }) => {
      await clientAxios.delete(`cleaners/${cleanerId}`);
      return cleanerId;
    },
    onSuccess: (data) => {
      deleteCleanerHelper(queryClient, data);
    }
  });
}

// HELPERS

// Bookings Helpers
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

// ServiceAreas helpers
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

// TimeSlots Helpers
function updateTimeSlotHelper(queryClient: QueryClient, newTimeSlot: TimeSlot) {
  const queryData = queryClient.getQueryData(["timeslots"]) as TimeSlot[];
  if (!queryData) return;

  const newTimeSlots = queryData.map((b) =>
    b.id === newTimeSlot.id ? newTimeSlot : b
  );

  queryClient.setQueryData(["timeslots"], newTimeSlots);
}

function addTimeSlotHelper(queryClient: QueryClient, newTimeSlot: TimeSlot) {
  const queryData = queryClient.getQueryData(["timeslots"]) as TimeSlot[];
  if (!queryData) return;

  const newTimeSlots = [newTimeSlot, ...queryData];

  queryClient.setQueryData(["timeslots"], newTimeSlots);
}

function deleteTimeSlotHelper(
  queryClient: QueryClient,
  { id }: { id: number }
) {
  const queryData = queryClient.getQueryData(["timeslots"]) as TimeSlot[];
  if (!queryData) return;

  const newTimeSlots = queryData.filter((i) => i.id !== id);

  queryClient.setQueryData(["timeslots"], newTimeSlots);
}

// Cleaners Helpers
function updateCleanerHelper(queryClient: QueryClient, newCleaner: Cleaner) {
  const queryData = queryClient.getQueryData(["cleaners"]) as Cleaner[];
  if (!queryData) return;

  const newCleaners = queryData.map((b) =>
    b.id === newCleaner.id ? newCleaner : b
  );

  queryClient.setQueryData(["cleaners"], newCleaners);
}

function addCleanerHelper(queryClient: QueryClient, newCleaner: Cleaner) {
  const queryData = queryClient.getQueryData(["cleaners"]) as Cleaner[];
  if (!queryData) return;

  const newCleaners = [newCleaner, ...queryData];

  queryClient.setQueryData(["cleaners"], newCleaners);
}

function deleteCleanerHelper(queryClient: QueryClient, cleanerId: number) {
  const queryData = queryClient.getQueryData(["cleaners"]) as Cleaner[];
  if (!queryData) return;

  const newCleaners = queryData.filter((i) => i.id !== cleanerId);

  queryClient.setQueryData(["cleaners"], newCleaners);
}
