"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverRequest } from "@/lib/serverRequest";
// import { NextResponse } from "next/server";

export async function assignCleaner(bookingId: string, cleanerId: string) {
  console.log({ bookingId, cleanerId });
  try {
    await serverRequest(`bookings/${bookingId}/assign`, "POST", {
      cleanerId: +cleanerId
    });
  } catch (err: any) {
    console.log(err.response);
    throw err;
  }
}

export async function cancelBooking(bookingId: number) {
  console.log({ bookingId });
  try {
    await serverRequest(`bookings/${bookingId}`, "DELETE");
  } catch (err: any) {
    console.log(err.response);
    throw err;
  }
}
