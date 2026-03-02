import { jwtDecode } from "jwt-decode";
import { DecodedJWT } from "./types";
import { NextResponse } from "next/server";

// JWT
export function getMaxAge(jwt: string) {
  const decoded: DecodedJWT = jwtDecode(jwt);

  return decoded.exp - decoded.iat - 60 * 5;
}
export function getRole(jwt: string) {
  const decoded: DecodedJWT = jwtDecode(jwt);

  return decoded.role;
}

export function setAuthCookies(
  cookies: NextResponse["cookies"],
  tokens: { accessToken: string; refreshToken: string }
) {
  const accessMaxAge = getMaxAge(tokens.accessToken);
  const refreshMaxAge = getMaxAge(tokens.refreshToken);
  // Set cookies for the tokens
  cookies.set("accessToken", tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: accessMaxAge,
    path: "/"
  });

  cookies.set("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: refreshMaxAge,
    path: "/"
  });
}
