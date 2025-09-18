/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverRequest } from "@/lib/serverRequest";
import { Cleaner } from "../../types";

export async function updateCleaner({
  cleanerId,
  ...cleanerData
}: Partial<Cleaner> & { cleanerId: number }) {
  try {
    const cleaner = await serverRequest(
      `cleaners/${cleanerId}`,
      "PATCH",
      cleanerData
    );
    return cleaner.data;
  } catch (err: any) {
    console.log(err.response);
    throw err;
  }
}
