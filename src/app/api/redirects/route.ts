import { NextRequest } from "next/server";
import { getRedirectForPath } from "@/lib/data";

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get("pathname");
  if (!pathname || !pathname.startsWith("/")) {
    return Response.json(null, { status: 400 });
  }

  const redirect = await getRedirectForPath(pathname);
  if (!redirect) return Response.json(null);

  return Response.json({
    target: redirect.target,
    status: redirect.status,
  });
}
