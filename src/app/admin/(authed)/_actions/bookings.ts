"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverRequest } from "@/lib/serverRequest";
import { Booking } from "../../types";
import { OrderFormValues } from "@/app/(landings)/booking/new/schema";
// import { NextResponse } from "next/server";

// export async function assignCleaner(bookingId: string, cleanerId: string) {
export async function assignCleaner({
  bookingId,
  cleanerId
}: {
  bookingId: string;
  cleanerId: string;
}) {
  console.log({ bookingId, cleanerId });
  try {
    const booking = await serverRequest(
      `bookings/${bookingId}/assign`,
      "POST",
      {
        cleanerId: +cleanerId
      }
    );
    console.log(booking.data);
    return booking.data as Booking;
  } catch (err: any) {
    console.log(err.response);
    throw err;
  }
}

export async function cancelBooking({ bookingId }: { bookingId: number }) {
  console.log({ bookingId });
  try {
    const booking = await serverRequest(`bookings/${bookingId}`, "DELETE");
    return booking.data;
  } catch (err: any) {
    console.log(err.response);
    throw err;
  }
}

export async function startBooking({ bookingId }: { bookingId: number }) {
  console.log({ bookingId });
  try {
    const booking = await serverRequest(`bookings/${bookingId}/start`, "POST");
    return booking.data;
  } catch (err: any) {
    console.log(err.response);
    throw err;
  }
}

export async function completeBooking({ bookingId }: { bookingId: number }) {
  console.log({ bookingId });
  try {
    const booking = await serverRequest(
      `bookings/${bookingId}/complete`,
      "POST"
    );
    return booking.data;
  } catch (err: any) {
    console.log(err.response);
    throw err;
  }
}

export async function updateBooking({
  bookingId,
  ...data
}: { bookingId: number } & Partial<OrderFormValues>) {
  console.log({ bookingId });
  try {
    const booking = await serverRequest(`bookings/${bookingId}`, "PATCH", data);
    return booking.data;
  } catch (err: any) {
    console.log(err.response);
    throw err.response.data;
  }
}

export async function rescheduleBooking({
  bookingId,
  ...data
}: {
  bookingId: number;
  timeSlotId: number;
  date: string;
}) {
  console.log({ bookingId });
  try {
    const booking = await serverRequest(
      `bookings/${bookingId}/reschedule`,
      "PATCH",
      data
    );
    return booking.data;
  } catch (err: any) {
    console.log(err.response);
    throw err.response.data;
  }
}
