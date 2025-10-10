/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { TimeSlot } from "@/app/(landings)/booking/new/types";
import { serverRequest } from "@/lib/serverRequest";
import { FormDataType } from "../bookings/slots/types";

const getSlotBody = (formData: FormDataType) => ({
  startTime: Number(formData.startTime?.split(":")[0]),
  endTime: Number(formData.startTime?.split(":")[0]) + 2, // Assuming 2-hour slots
  instances: Number(formData.maxCapacity),
  serviceIds: formData.serviceIds,
  weekDays: formData.daysOfWeek,
  isActive: formData.isActive
});

export async function updateTimeSlot({
  timeSlotId,
  ...data
}: { timeSlotId: number } & FormDataType) {
  try {
    const body = getSlotBody(data);
    const timeSlot = await serverRequest(
      `timeslots/${timeSlotId}`,
      "PATCH",
      body
    );
    return timeSlot.data as TimeSlot;
  } catch (err: any) {
    console.log(err.response);
    throw String(err.response.data.message);
  }
}

export async function addTimeSlot(data: FormDataType) {
  try {
    const body = getSlotBody(data);
    const timeSlot = await serverRequest(`timeslots`, "POST", body);
    return timeSlot.data as TimeSlot;
  } catch (err: any) {
    console.log(err.response);
    throw String(err.response.data.message);
  }
}

export async function deleteTimeSlot({ timeSlotId }: { timeSlotId: number }) {
  try {
    await serverRequest(`timeslots/${timeSlotId}`, "DELETE");
    return { id: timeSlotId };
  } catch (err: any) {
    console.log(err.response);
    throw err.response.data;
  }
}
