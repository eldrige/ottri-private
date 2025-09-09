import { serverRequest } from "@/lib/serverRequest";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const payload = await req.json();
    const bookingId = payload.bookingId as string;

    await serverRequest(`bookings/${bookingId}`, "DELETE");

    // revalidatePath("/admin/bookings")

    NextResponse.json({
      success: true,
      message: "Booking cancelled successfully"
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(error, { status: 400 });
  }
}
