import { serverRequest } from "../serverRequest";

export async function getUserProfile() {
  return serverRequest("auth/profile", "GET");
}

export async function getUserById(userId: number) {
  return serverRequest(`users/${userId}`, "GET");
}
