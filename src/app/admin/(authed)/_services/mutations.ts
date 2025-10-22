import {
  QueryClient,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import {
  BookingsResponse,
  ServiceArea,
  Cleaner,
  Booking,
  AddCleanerForm
} from "@/app/admin/types";
import axios from "axios";
import { TimeSlot } from "@/app/(landings)/booking/new/types";
import { clientAxios } from "@/lib/axios";
import { getSlotBody } from "../_utils/timeSlots";
import { TimeSlotFormDataType } from "@/lib/types";
import { OrderFormValues } from "@/app/(landings)/booking/new/schema";

// Assign cleaner
async function assignCleaner({
  bookingId,
  cleanerId
}: {
  bookingId: string;
  cleanerId: string;
}) {
  const booking = await clientAxios.post(`bookings/${bookingId}/assign`, {
    cleanerId: +cleanerId
  });
  return booking.data as Booking;
}
export function useAssignCleanerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: assignCleaner,
    onSuccess: (data) => {
      updateBookingHelper(queryClient, data);
    }
  });
}

// Bookings
export async function cancelBooking({ bookingId }: { bookingId: number }) {
  const booking = await clientAxios.delete(`bookings/${bookingId}`);
  return booking.data;
}
export function useCancelBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: (data) => {
      updateBookingHelper(queryClient, data);
    }
  });
}

async function startBooking({ bookingId }: { bookingId: number }) {
  const booking = await clientAxios.post(`bookings/${bookingId}/start`);
  return booking.data;
}
export function useStartBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: startBooking,
    onSuccess: (data) => {
      updateBookingHelper(queryClient, data);
    }
  });
}

async function completeBooking({ bookingId }: { bookingId: number }) {
  console.log({ bookingId });
  const booking = await clientAxios.post(`bookings/${bookingId}/complete`);
  return booking.data;
}
export function useCompleteBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: completeBooking,
    onSuccess: (data) => {
      updateBookingHelper(queryClient, data);
    }
  });
}

async function updateBooking({
  bookingId,
  ...data
}: { bookingId: number } & Partial<OrderFormValues>) {
  const booking = await clientAxios.patch<Booking>(
    `bookings/${bookingId}`,
    data
  );
  return booking.data;
}
export function useUpdateBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBooking,
    onSuccess: (data) => {
      updateBookingHelper(queryClient, data);
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

async function rescheduleBooking({
  bookingId,
  ...data
}: {
  bookingId: number;
  timeSlotId: number;
  date: string;
}) {
  const booking = await clientAxios.patch<Booking>(
    `bookings/${bookingId}/reschedule`,
    data
  );
  return booking.data;
}
export function useRescheduleBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rescheduleBooking,
    onSuccess: (data) => {
      updateBookingHelper(queryClient, data);
    }
  });
}

// Service Areas

async function deleteServiceAreas({
  serviceAreaIds
}: {
  serviceAreaIds: number[];
}) {
  const res = await Promise.all(
    serviceAreaIds.map((id) =>
      clientAxios.delete<ServiceArea>(`service-areas/${id}`)
    )
  );
  return res.map((i) => i.data);
}
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

async function createServiceAreas({
  newServiceAreas
}: {
  newServiceAreas: Pick<
    ServiceArea,
    "location" | "name" | "popular" | "nickName"
  >[];
}) {
  const res = await Promise.all(
    newServiceAreas.map((newSA) =>
      clientAxios.post<ServiceArea>(`service-areas`, newSA)
    )
  );
  return res.map((i) => i.data);
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

async function updateServiceAreas({
  serviceAreasData: serviceAreaData
}: {
  serviceAreasData: Partial<
    Pick<ServiceArea, "id" | "location" | "name" | "popular" | "nickName">
  >[];
}) {
  const res = await Promise.all(
    serviceAreaData.map(({ id, ...serviceArea }) =>
      clientAxios.patch<ServiceArea>(`service-areas/${id}`, serviceArea)
    )
  );

  return res.map((i) => i.data);
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
async function updateTimeSlot({
  timeSlotId,
  ...data
}: { timeSlotId: number } & Partial<TimeSlotFormDataType>) {
  const body = getSlotBody(data);
  const timeSlot = await clientAxios.patch(`timeslots/${timeSlotId}`, body);
  return timeSlot.data as TimeSlot;
}
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

async function addTimeSlot(data: TimeSlotFormDataType) {
  const body = getSlotBody(data);
  const timeSlot = await clientAxios.post<TimeSlot>(`timeslots`, body);
  return timeSlot.data;
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

async function deleteTimeSlot({ timeSlotId }: { timeSlotId: number }) {
  await clientAxios.delete(`timeslots/${timeSlotId}`);
  return { id: timeSlotId };
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
const updateCleaner = async ({
  cleanerId,
  ...cleanerData
}: Partial<Cleaner> & { cleanerId: number }) => {
  const cleaner = await clientAxios.patch<Cleaner>(
    `cleaners/${cleanerId}`,
    cleanerData
  );
  return cleaner.data;
};

export function useUpdateCleanerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCleaner,
    onSuccess: (data) => {
      updateCleanerHelper(queryClient, data);
    }
  });
}

const addCleaner = async (cleanerData: AddCleanerForm) => {
  const res = await clientAxios.post<Cleaner>(`cleaners`, cleanerData);
  return res.data;
};
export function useAddCleanerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCleaner,
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
function updateBookingHelper(queryClient: QueryClient, newBooking: Booking) {
  queryClient.setQueriesData(
    { queryKey: ["bookings"] },
    (queryData?: BookingsResponse) => {
      if (queryData) {
        const newBookings = queryData.data.map((b) =>
          b.id === newBooking.id ? newBooking : b
        );
        const newData = { ...queryData, data: newBookings } as BookingsResponse;
        return newData;
      }

      return queryData;
    }
  );
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

  const newCleaners = [...queryData, newCleaner];

  queryClient.setQueryData(["cleaners"], newCleaners);
}

function deleteCleanerHelper(queryClient: QueryClient, cleanerId: number) {
  const queryData = queryClient.getQueryData(["cleaners"]) as Cleaner[];
  if (!queryData) return;

  const newCleaners = queryData.filter((i) => i.id !== cleanerId);

  queryClient.setQueryData(["cleaners"], newCleaners);
}
