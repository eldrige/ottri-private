/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserProfile } from "@/lib/api/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userProfile = await getUserProfile();

    console.log(userProfile);
    return NextResponse.json(userProfile.data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.response.data },
      { status: err.status }
    );
  }
}
