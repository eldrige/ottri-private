import axios from "@/lib/axios";

export async function getUserInformation() {
  const { data: userInfo } = await axios.get("/auth/profile");
  return userInfo;
}
