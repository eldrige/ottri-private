/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverRequest } from "@/lib/serverRequest";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const bookingId = data.bookingId as string;
  const cleanerId = +data.cleanerId as number;

  console.log({ bookingId, cleanerId });
  try {
    await serverRequest(`bookings/${bookingId}/assign`, "POST", { cleanerId });

    revalidatePath("/admin/bookings");

    return NextResponse.json({
      success: true,
      message: "Cleaner assigned successfully"
    });
  } catch (err: any) {
    console.log(err.response);
    throw err;
  }
}
