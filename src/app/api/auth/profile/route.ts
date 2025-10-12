import { getUserProfile } from "@/lib/api/user";
import { NextResponse } from "next/server";

export async function GET() {
  const userProfile = await getUserProfile();

  console.log(userProfile);
  return NextResponse.json(userProfile.data);
}
