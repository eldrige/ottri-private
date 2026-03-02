import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function GET() {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");

  cookieStore.delete("refreshToken");

  revalidatePath("/dashboard/");
  revalidatePath("/admin/");
  return NextResponse.json({
    message: "Successfully logged out!"
  });
}
