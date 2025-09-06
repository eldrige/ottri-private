import { NextResponse } from "next/server";

export function middleware(req) {
  console.log(`[${req.method}] ${req.url}`);
  console.log("Headers:", req.headers);
  const response = NextResponse.next();
  console.log("Response Status:", response.status);
  return response;
}
