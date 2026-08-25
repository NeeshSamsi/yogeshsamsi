import { NextRequest, NextResponse } from "next/server"

// Redirects mixed-case paths to their lowercase equivalent so a URL only ever
// resolves at one address.
//
// NOTE: this file replaces the old src/app/middleware.ts, which never ran -
// Next only reads this convention from the project root or src/, never from
// src/app/. It stays inert until the Next 16 upgrade, which renames the
// middleware convention to proxy.
export function proxy(request: NextRequest) {
  const { pathname, search, origin } = request.nextUrl

  if (pathname === pathname.toLowerCase()) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL(pathname.toLowerCase() + search, origin))
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|files).*)"],
}
