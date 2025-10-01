import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  cancelBooking,
  rateBooking,
  updateProfile
} from "../_actions/bookings";

export function useCancelBookingMutation(status?: string | null) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings", status || ""]
      });
    }
  });
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
