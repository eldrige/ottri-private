import { serverRequest } from "@/lib/axios";
import { Booking, Profile, User } from "./types";

export async function getUserProfile() {
  const { data: userInfo } = await serverRequest("/auth/profile");
  return userInfo as Profile;
}

export async function getUserDetails(userId: number) {
  const { data: userDetails } = await serverRequest(`/users/${userId}`);
  return userDetails as User;
}

export async function getBookings(status?: string) {
  const { data: bookings } = await serverRequest(
    `/bookings?${status ? `status=${status}` : ""}`
  );
  return bookings.data as Booking[];
}
