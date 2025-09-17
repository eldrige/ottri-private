import { getBookings } from "@/lib/api/bookings";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const bookings = await getBookings(req.nextUrl.searchParams);

  // console.log(bookings);
  return NextResponse.json(bookings.data);
}
