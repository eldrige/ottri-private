"use server";
import { revalidatePath } from "next/cache";

export async function revalidatePathServerSide() {
  console.log("is revalidating path", window.location.pathname);
  revalidatePath("/dashboard/settings");
}
