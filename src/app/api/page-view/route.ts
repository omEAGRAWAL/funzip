import { withDatabase } from "@/lib/prisma";

export async function POST(request: Request) {
  const start = Date.now();
  console.log(
    JSON.stringify({
      level: "info",
      message: "page_view_start",
      requestId: request.headers.get("x-vercel-id"),
    }),
  );

  try {
    const payload = await request.json();
    await withDatabase((db) =>
      db.pageView.create({
        data: {
          path: String(payload.path || "/"),
          referrer: payload.referrer ? String(payload.referrer) : null,
          utmSource: payload.utmSource ? String(payload.utmSource) : null,
          utmMedium: payload.utmMedium ? String(payload.utmMedium) : null,
          utmCampaign: payload.utmCampaign ? String(payload.utmCampaign) : null,
          device: payload.device ? String(payload.device) : null,
          userAgent: payload.userAgent ? String(payload.userAgent) : null,
        },
      }),
    );

    console.log(
      JSON.stringify({
        level: "info",
        message: "page_view_done",
        ms: Date.now() - start,
      }),
    );
    return Response.json({ ok: true });
  } catch (error) {
    console.error(
      JSON.stringify({
        level: "error",
        message: "page_view_failed",
        error: error instanceof Error ? error.message : String(error),
        ms: Date.now() - start,
      }),
    );
    return Response.json({ ok: false }, { status: 400 });
  }
}
