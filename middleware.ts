import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// @ts-ignore
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin routes: protect all /admin/* except /admin/login and /admin/logout
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login") && !pathname.startsWith("/admin/logout")) {
    const token = request.cookies.get("admin-token");
    const adminEmails = (process.env.ADMIN_EMAILS || "").split(",").map(e => e.trim().toLowerCase()).filter(Boolean);
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    try {
      const payload = jwt.verify(token.value, process.env.JWT_SECRET || "");
      // @ts-ignore - payload could be any
      const email = (payload as any).email?.toLowerCase();
      if (!adminEmails.includes(email)) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
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