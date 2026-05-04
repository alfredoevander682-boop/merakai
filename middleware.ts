import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin protection - only block in production if ADMIN_EMAILS is set
  if (pathname.startsWith("/admin") && process.env.NODE_ENV === "production") {
    const adminEmails = process.env.ADMIN_EMAILS || "";
    if (adminEmails) {
      const authHeader = request.headers.get("authorization");
      if (!authHeader) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      const allowedEmails = adminEmails.split(",").map(e => e.trim().toLowerCase());
      const userEmail = authHeader.replace("Bearer ", "").toLowerCase();
      if (!allowedEmails.includes(userEmail)) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }

  // Seller dashboard protection
  if (pathname.startsWith("/vendedor/dashboard")) {
    const sellerToken = request.cookies.get("seller-token");
    if (!sellerToken) {
      return NextResponse.redirect(new URL("/vendedor/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/vendedor/dashboard/:path*"],
};