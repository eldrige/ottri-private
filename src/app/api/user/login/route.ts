import { NextRequest, NextResponse } from "next/server";
import { axios } from "@/lib/axios";
import { LoginResponse } from "@/lib/types";

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
      await axios.post(
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

    if (loginResponse.data.role !== "USER") {
      return NextResponse.json(
        { message: "Access denied. User privileges required." },
        { status: 403 }
      );
    }

    // Create a response with tokens in HTTP-only cookies
    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

    // Set cookies for the tokens
    response.cookies.set("accessToken", loginResponse.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      // maxAge: 15 * 60, // 15 minutes in seconds
      path: "/"
    });

    response.cookies.set("refreshToken", loginResponse.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      // maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/"
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
