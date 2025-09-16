import { serverRequest } from "@/lib/serverRequest";
import { Booking, Review } from "../_utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

async function cancelBooking(bookingId: number) {
  const response = await serverRequest(`/bookings/${bookingId}`, "DELETE");
  return response.data as Booking;
}

export function useCancelBookingMutation() {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings", searchParams.get("status") || ""]
      });
    }
  });
}

async function rateBooking({
  bookingId,
  rating,
  comment,
  completionRate
}: Pick<Review, "bookingId" | "rating" | "comment" | "completionRate">) {
  console.log(bookingId, rating, comment, completionRate);
  try {
    const response = await serverRequest(
      `/bookings/${bookingId}/reviews`,
      "POST",
      {
        rating,
        comment,
        completionRate
      }
    );
    return response.data as Review;
  } catch (error) {
    console.error("Error rating booking:", error);
  }
}

export function useRateBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rateBooking,
    onSuccess: (review) => {
      queryClient.invalidateQueries({
        queryKey: ["booking-review", review?.bookingId],
        exact: true
      });
    }
  });
}
