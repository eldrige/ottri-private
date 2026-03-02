import { axiosInstance } from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { DecodedJWT } from "@/lib/types";
import { setAuthCookies } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    return handleMiddleware(req, "ADMIN");
  } else if (req.nextUrl.pathname.startsWith("/dashboard")) {
    return handleMiddleware(req, "USER");
  }
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"]
};

async function handleMiddleware(req: NextRequest, role: DecodedJWT["role"]) {
  // Check if the user is authenticated
  const authResult = await isAuthenticated(req, role);

  if (authResult.isAuth === false) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    // Add the original URL as a query parameter to redirect after login
    url.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // If authenticated, clone the request and add the access token to the headers
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("Authorization", `Bearer ${authResult.accessToken}`);

  // Create a new request with the modified headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });

  // Set cookies with the tokens if they were just refreshed or obtained
  if (authResult.refreshed) {
    setAuthCookies(response.cookies, {
      accessToken: authResult.accessToken || "",
      refreshToken: authResult.refreshToken || ""
    });
  }

  return response;
}

interface AuthResult {
  isAuth: boolean;
  accessToken?: string;
  refreshToken?: string;
  refreshed?: boolean;
}

async function isAuthenticated(
  req: NextRequest,
  role: DecodedJWT["role"]
): Promise<AuthResult> {
  // First try to get tokens from cookies
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (accessToken) {
    const decoded: DecodedJWT = jwtDecode(accessToken);
    if (decoded.role === role) {
      return { isAuth: true, accessToken, refreshToken };
    } else {
      return { isAuth: false };
    }
  }

  if (refreshToken) {
    return await refreshTokens(refreshToken);
  }

  // If we reach here, authentication has failed
  return { isAuth: false };
}

async function refreshTokens(refreshToken: string): Promise<AuthResult> {
  try {
    // Call the refresh token endpoint
    const response = await axiosInstance.post("auth/refresh", {
      refreshToken: refreshToken
    });

    const data = response.data;

    // Check if the user is an admin
    if (data.data.role === "ADMIN") {
      return {
        isAuth: true,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        refreshed: true
      };
    }

    return { isAuth: false };
  } catch (error) {
    console.error("Error refreshing tokens:", error);
    return { isAuth: false };
  }
}
