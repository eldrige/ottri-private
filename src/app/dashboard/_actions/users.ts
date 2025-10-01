"use server";
import { serverRequest } from "@/lib/serverRequest";
import { User } from "../_utils/types";

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
