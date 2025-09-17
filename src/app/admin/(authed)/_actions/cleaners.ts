/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverRequest } from "@/lib/serverRequest";

export async function cleanersChangeStatus({
  status,
  cleanerId
}: {
  status: "AVAILABLE" | "UNAVAILABLE";
  cleanerId: number;
}) {
  try {
    const cleaner = await serverRequest(`cleaners/${cleanerId}`, "PATCH", {
      status
    });
    return cleaner.data;
  } catch (err: any) {
    console.log(err.response);
    throw err;
  }
}
