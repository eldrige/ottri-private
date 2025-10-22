"use server";
import { serverRequest } from "@/lib/serverRequest";
import { User } from "../_utils/types";

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
    const response = await serverRequest(`/users/profile/${userId}`, "PATCH", {
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
    const response = await serverRequest(`/users/${userId}/settings`, "PATCH", {
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
