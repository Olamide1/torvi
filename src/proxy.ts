import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "torvi_session";

function getIsAdmin(token: string): boolean {
  try {
    // Decode payload without verifying — optimistic check only.
    // Full verification happens server-side in each page/route handler.
    const [, payloadB64] = token.split(".");
    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString());
    return payload.isAdmin === true;
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  // Skip all auth checks in local development
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  // API admin routes → 401 JSON (no redirect)
  if (pathname.startsWith("/api/admin")) {
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!getIsAdmin(token)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.next();
  }

  // Admin page → redirect if not authenticated or not admin
  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    if (!getIsAdmin(token)) {
      const url = request.nextUrl.clone();
      url.pathname = "/forbidden";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Learner pages → redirect if not authenticated
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/hub/:path*", "/mission/:path*", "/admin/:path*", "/api/admin/:path*"],
};
