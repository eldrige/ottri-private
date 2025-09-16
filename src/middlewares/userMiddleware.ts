import { axiosInstance } from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function userMiddleware(req: NextRequest) {
  // Check if this is the login page itself
  if (req.nextUrl.pathname === "/login") {
    return NextResponse.next();
  }

  // Check if the user is authenticated
  const authResult = await isAuthenticated(req);

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
    // Set HttpOnly cookies for security
    response.cookies.set("accessToken", authResult.accessToken || "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60, // 15 minutes in seconds
      path: "/"
    });

    response.cookies.set("refreshToken", authResult.refreshToken || "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/"
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

async function isAuthenticated(req: NextRequest): Promise<AuthResult> {
  // First try to get tokens from cookies
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  // If we have an access token, try to validate it
  if (accessToken) {
    try {
      // Verify the access token by making a request to a validation endpoint
      const response = await axiosInstance.get("auth/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      // If the request succeeds, the token is valid
      if (response.status === 200) {
        const userData = response.data;

        if (userData.data.role === "USER") {
          return { isAuth: true, accessToken, refreshToken };
        }
      }
    } catch {
      // Token validation failed, try to refresh if we have a refresh token
      if (refreshToken) {
        return await refreshTokens(refreshToken);
      }
    }
  } else if (refreshToken) {
    // No access token but we have a refresh token, try to refresh
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

    if (data.data.role === "USER") {
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
