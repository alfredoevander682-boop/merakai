import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const adminEmails = process.env.ADMIN_EMAILS || "";
    const authHeader = request.headers.get("authorization");
    
    if (adminEmails) {
      const allowedEmails = adminEmails.split(",").map(e => e.trim().toLowerCase());
      const userEmail = authHeader?.replace("Bearer ", "").toLowerCase();
      
      if (!userEmail || !allowedEmails.includes(userEmail)) {
        return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
      }
    }
  }

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