import { User } from "../_utils/types";
import { clientAxios } from "@/lib/axios";

export async function updateProfile({
  imageUrl,
  fullName,
  phoneNumber,
  address,
  userId
}: {
  imageUrl?: string;
  fullName?: string;
  phoneNumber?: string;
  address?: string;
  userId: string;
}) {
  try {
    console.log("there is something going on here");
    const response = await clientAxios.patch(`/users/${userId}/profile`, {
      imageUrl,
      fullName,
      phoneNumber,
      address
    });
    return response.data as User;
  } catch (error) {
    console.error("Error updating user profile", error);
    throw error;
  }
}

export async function updateUserSettings({
  userId,
  bookingReminder,
  currency,
  language,
  promotionalEmails,
  shareMyLocation,
  timezone,
  twoFactorAuth
}: {
  userId: string;
  bookingReminder?: boolean;
  currency?: string;
  language?: string;
  promotionalEmails?: boolean;
  shareMyLocation?: boolean;
  timezone?: string;
  twoFactorAuth?: boolean;
}) {
  try {
    const response = await clientAxios.patch(`/users/${userId}/settings`, {
      bookingReminder,
      currency,
      language,
      promotionalEmails,
      shareMyLocation,
      timezone,
      twoFactorAuth
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user settings", error);
    throw error;
  }
}

export async function updatePassword({
  userId,
  oldPassword,
  newPassword
}: {
  userId: string;
  oldPassword?: string;
  newPassword?: string;
}) {
  try {
    const response = await clientAxios.patch(`/users/${userId}/password`, {
      oldPassword,
      newPassword
    });
    return response.data;
  } catch (error) {
    console.error("Error updating password", error);
    throw error;
  }
}
