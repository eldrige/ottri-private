/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { serverRequest } from "@/lib/serverRequest";
import { Booking } from "@/app/dashboard/_utils/types";
import { revalidatePath } from "next/cache";

export async function DELETE(req: NextRequest) {
  try {
    const { bookingId } = await req.json();

    // Validate inputs
    if (!bookingId) {
      return NextResponse.json(
        { message: "Booking ID is required" },
        { status: 400 }
      );
    }

    // Add error handling for the server request
    try {
      const response = await serverRequest(`/bookings/${bookingId}`, "DELETE");
      console.log(response);

      // Check if response exists and has data
      if (!response) {
        throw new Error("No response received from server");
      }

      // Handle empty response data
      if (!response.data) {
        return NextResponse.json(
          {
            success: true,
            message: "Booking cancelled successfully"
          },
          { status: 200 }
        );
      }

      const cancelResponse: Booking = response.data;

      // Revalidate the path after successful cancellation
      revalidatePath("/dashboard/my-booking");

      return NextResponse.json(
        {
          success: true,
          message: "Booking cancelled successfully",
          data: cancelResponse
        },
        { status: 200 }
      );
    } catch (serverError: any) {
      // Handle specific server request errors
      if (serverError.response?.status === 404) {
        return NextResponse.json(
          {
            success: false,
            message: "Booking not found"
          },
          { status: 404 }
        );
      }

      throw serverError; // Re-throw for general error handling
    }
  } catch (error: any) {
    console.error("Booking cancellation error:", error);

    // Handle different types of errors
    if (error.response) {
      return NextResponse.json(
        {
          success: false,
          message:
            error.response.data?.message || "Booking cancellation failed",
          error: error.response.data
        },
        { status: error.response.status || 500 }
      );
    }

    // Generic error response
    return NextResponse.json(
      {
        success: false,
        message:
          error.message || "An error occurred while cancelling the booking",
        error: typeof error === "string" ? error : error.toString()
      },
      { status: 500 }
    );
  }
}
