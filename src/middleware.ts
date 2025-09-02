import { NextRequest, NextResponse } from "next/server";
import { axios } from "./lib/axios";
import { LoginResponse } from "./lib/types";

export async function middleware(req: NextRequest) {
  if ((await isAuthenticated(req)) === false) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" }
    });
  }
}

async function isAuthenticated(req: NextRequest) {
  const authHeader =
    req.headers.get("authorization") || req.headers.get("Authorization");

  if (!authHeader) return false;

  const [email, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  try {
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
    const isAuth = loginResponse.data.role === "ADMIN";
    return isAuth;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export const config = {
  matcher: "/admin/:path*"
};
