import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  try {
    const api = new URL(
      `/api/redirects?pathname=${encodeURIComponent(pathname)}`,
      request.nextUrl.origin,
    );
    const response = await fetch(api, { headers: { accept: "application/json" } });

    if (response.ok) {
      const redirect = (await response.json()) as {
        target?: string;
        status?: number;
      } | null;
      if (redirect?.target) {
        return NextResponse.redirect(
          new URL(redirect.target, request.nextUrl.origin),
          redirect.status || 308,
        );
      }
    }
  } catch {}

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|admin|_next/static|_next/image|favicon.ico|sitemap.*\\.xml|robots.txt).*)",
  ],
};
