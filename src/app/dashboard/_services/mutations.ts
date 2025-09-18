import { serverRequest } from "@/lib/serverRequest";
import { Booking, Review, User } from "../_utils/types";
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

// '/api/v1/users/{id}'

async function updateProfile({
  fullName,
  phoneNumber,
  address,
  userId
}: {
  fullName: string;
  phoneNumber: string;
  address: string;
  userId: string;
}) {
  try {
    console.log("there is something going on here");
    const response = await serverRequest(`/users/profile/${userId}`, "PATCH", {
      fullName,
      phoneNumber,
      address
    });
    return response.data as User;
  } catch (error) {
    console.error("Error updating user profile", error);
  }
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-profile"]
      });
    }
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/auth/logout`);
      return response.json() as Promise<{ message: string }>;
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["user-profile"]
      });
    }
  });
}
