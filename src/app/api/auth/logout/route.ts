import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function GET() {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/"
  });

  cookieStore.set("refreshToken", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/"
  });

  revalidatePath("/dashboard/");
  return NextResponse.json({
    message: "Successfully logged out!"
  });
}
