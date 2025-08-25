import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login")) {
    const sessionCookie = request.cookies.get("admin-session")

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    try {
      const sessionData = JSON.parse(Buffer.from(sessionCookie.value, "base64").toString())

      // Check if session is expired (24 hours)
      if (Date.now() - sessionData.loginTime > 60 * 60 * 24 * 1000) {
        const response = NextResponse.redirect(new URL("/admin/login", request.url))
        response.cookies.delete("admin-session")
        return response
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
