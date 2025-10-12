/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverRequest } from "@/lib/serverRequest";
import { AddCleanerForm, Cleaner } from "../../types";

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
    throw String(err.response.data);
  }
}

export async function addCleaner(cleanerData: AddCleanerForm) {
  try {
    const cleaner = await serverRequest(`cleaners`, "POST", cleanerData);
    return { data: cleaner.data as Cleaner };
  } catch (err: any) {
    console.log(err.response);
    return { error: err.response.data.message };
  }
}
