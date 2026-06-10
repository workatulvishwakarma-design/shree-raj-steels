import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/session";

const SESSION_COOKIE_NAME = "srs_admin_session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only handle admin routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const isAuthed = token ? await verifyToken(token) : false;

    // If already logged in, redirect /admin/login to /admin dashboard
    if (pathname === "/admin/login") {
      if (isAuthed) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    }

    // If not logged in, redirect any /admin route to /admin/login
    if (!isAuthed) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
