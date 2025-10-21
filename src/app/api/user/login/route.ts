import { NextRequest, NextResponse } from "next/server";
import { axiosInstance } from "@/lib/axios";
import { LoginResponse } from "@/lib/types";
import { setAuthCookies } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Call the authentication API
    const loginResponse: LoginResponse = (
      await axiosInstance.post(
        "auth/basic/login",
        { email, password },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
    ).data;

    // Create a response with tokens in HTTP-only cookies
    const response = NextResponse.json(
      { message: "Login successful", user: loginResponse.data },
      { status: 200 }
    );

    setAuthCookies(response.cookies, {
      accessToken: loginResponse.accessToken,
      refreshToken: loginResponse.refreshToken
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
}
