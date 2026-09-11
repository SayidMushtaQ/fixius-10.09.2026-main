import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || "";

  // 1. Redirect apex domain (fixius.de) to www subdomain (www.fixius.de)
  if (host === "fixius.de") {
    url.host = "www.fixius.de";
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  // 2. Redirect HTTP to HTTPS in production (via x-forwarded-proto header)
  const xForwardedProto = request.headers.get("x-forwarded-proto");
  if (
    process.env.NODE_ENV === "production" &&
    xForwardedProto &&
    xForwardedProto === "http"
  ) {
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  // 3. Legacy query-param city search → clean, indexable path.
  // /handwerker-finden/maurer?city=berlin -> /handwerker-finden/maurer/berlin
  // (Done here rather than next.config redirects so the consumed `city`
  // query key doesn't get re-appended to the destination.)
  const cityMatch = url.pathname.match(/^\/handwerker-finden\/([^/]+)\/?$/);
  const city = url.searchParams.get("city");
  if (cityMatch && city) {
    url.pathname = `/handwerker-finden/${cityMatch[1]}/${encodeURIComponent(city)}`;
    url.search = "";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
