import { NextRequest, NextResponse } from "next/server";
import { axiosInstance } from "@/lib/axios";

export async function POST(req: NextRequest) {
  try {
    const {
      email,
      password,
      fullName,
      phoneNumber,
      address,
      country,
      state,
      zipCode,
      city
    } = await req.json();

    // Validate inputs
    if (!email || !password || !fullName || !phoneNumber) {
      return NextResponse.json(
        {
          message: "Email, full name, phone number, and password are required"
        },
        { status: 400 }
      );
    }

    // Call the authentication API
    console.log("Registering user:", {
      email,
      password,
      fullName,
      phoneNumber,
      address,
      country,
      state,
      zipCode,
      city
    });
    const registerResponse = await axiosInstance.post(
      "auth/basic/register",
      {
        fullName,
        phoneNumber,
        country,
        state,
        email,
        password,
        address,
        zipCode,
        city
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
    console.log("Register response:", registerResponse);

    if (registerResponse.status !== 201) {
      console.log("Registration failed:", registerResponse.request);
      return NextResponse.json(
        { message: "Registration failed. Please try again." },
        { status: 400 }
      );
    }
    // Create a response with tokens in HTTP-only cookies
    const response = NextResponse.json(
      { message: "Account created successfully" },
      { status: 201 }
    );

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
}
