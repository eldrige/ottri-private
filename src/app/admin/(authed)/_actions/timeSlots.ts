/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { TimeSlot } from "@/app/(landings)/booking/new/types";
import { serverRequest } from "@/lib/serverRequest";

export async function updateTimeSlot({
  timeSlotId,
  ...data
}: { timeSlotId: number } & Partial<any>) {
  try {
    const timeSlot = await serverRequest(
      `timeslots/${timeSlotId}`,
      "PATCH",
      data
    );
    return timeSlot.data as TimeSlot;
  } catch (err: any) {
    console.log(err.response);
    throw err.response.data;
  }
}
