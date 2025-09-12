import { getBookingDetails } from "@/lib/api/bookings";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  const { bookingId } = await params;
  const bookingDetails = await getBookingDetails(bookingId);

  console.log(bookingDetails);
  return NextResponse.json(bookingDetails);
}
