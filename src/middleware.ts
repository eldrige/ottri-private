import { NextRequest } from "next/server";
import { adminMiddleware } from "./middlewares/adminMiddleware";
import { userMiddleware } from "./middlewares/userMiddleware";
// import { LoginResponse } from "./lib/types";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    return adminMiddleware(req);
  } else if (req.nextUrl.pathname.startsWith("/dashboard")) {
    return userMiddleware(req);
  }
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"]
};
