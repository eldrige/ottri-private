/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBookings } from "@/lib/api/bookings";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const bookings = await getBookings(req.nextUrl.searchParams);
    return NextResponse.json(bookings.data);
  } catch (error: any) {
    return new NextResponse(JSON.stringify(error.response.data), {
      ...error.response
    });
  }
}
