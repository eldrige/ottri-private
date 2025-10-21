"use server";
import { User } from "../_utils/types";
import { clientAxios } from "@/lib/axios";

export async function updateProfile({
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
    const response = await clientAxios.patch(`/users/profile/${userId}`, {
      fullName,
      phoneNumber,
      address
    });
    return response.data as User;
  } catch (error) {
    console.error("Error updating user profile", error);
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
  }
}
