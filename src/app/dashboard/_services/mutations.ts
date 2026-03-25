import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelBooking, rateBooking } from "../_actions/bookings";
import {
  updateProfile,
  updateUserSettings,
  updatePassword
} from "../_actions/users";
import axios from "axios";

export function useCancelBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["bookings"]
      });
    }
  });
}

export function useRateBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rateBooking,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["bookings"],
        exact: true
      });
    }
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user-profile"]
      });
    }
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await axios.get(`/api/auth/logout`);
      return response.data as Promise<{ message: string }>;
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["user-profile"]
      });
    }
  });
}

export function useUpdateSettingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserSettings,
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["user-profile"]
      });
    }
  });
}

export function useUpdatePasswordMutation() {
  return useMutation({
    mutationFn: updatePassword
  });
}
