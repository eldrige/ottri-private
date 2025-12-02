import { getUserById } from "@/lib/api/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  const { params } = context;
  const { userId } = await params;
  const userProfile = await getUserById(Number(userId));

  console.log(userProfile);
  return NextResponse.json(userProfile.data);
}
