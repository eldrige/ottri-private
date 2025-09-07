import { NextRequest } from "next/server";
import { adminMiddleware } from "./middlewares/adminMiddleware";
// import { LoginResponse } from "./lib/types";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    return adminMiddleware(req);
  }
}

export const config = {
  matcher: ["/admin/:path*"]
};
