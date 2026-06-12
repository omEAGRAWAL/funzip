import { requireAdmin } from "@/lib/auth";
import { withDatabase } from "@/lib/prisma";

export default async function AdminAnalyticsPage() {
  await requireAdmin();
  const stats = await withDatabase(async (db) => {
    const [total, recent, topPaths] = await Promise.all([
      db.pageView.count(),
      db.pageView.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
      db.pageView.groupBy({
        by: ["path"],
        _count: { path: true },
        orderBy: { _count: { path: "desc" } },
        take: 20,
      }),
    ]);

    return { total, recent, topPaths };
  });

  return (
    <div className="grid gap-8">
      <section>
        <h1 className="text-3xl font-black text-brand-dark">Visitor analytics dashboard</h1>
        <p className="mt-2 text-foreground/65">
          First-party page view tracking stored in PostgreSQL, with GA4 and
          Vercel Analytics also installed for platform dashboards.
        </p>
      </section>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-foreground/60">Total page views</p>
          <p className="mt-2 text-3xl font-black text-brand-dark">{stats?.total ?? 0}</p>
        </div>
        <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-foreground/60">GA4</p>
          <p className="mt-2 text-lg font-black text-brand-dark">
            {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? "Configured" : "Not configured"}
          </p>
        </div>
        <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-foreground/60">Vercel</p>
          <p className="mt-2 text-lg font-black text-brand-dark">
            Analytics and Speed Insights enabled
          </p>
        </div>
      </div>
      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black text-brand-dark">Top pages</h2>
          <div className="mt-4 grid gap-3 text-sm">
            {(stats?.topPaths ?? []).map((item) => (
              <div key={item.path} className="flex justify-between gap-4 border-b border-line pb-2">
                <span className="truncate">{item.path}</span>
                <strong>{item._count.path}</strong>
              </div>
            ))}
            {!stats?.topPaths.length ? <p className="text-foreground/60">No page views yet.</p> : null}
          </div>
        </div>
        <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black text-brand-dark">Recent visits</h2>
          <div className="mt-4 grid gap-3 text-sm">
            {(stats?.recent ?? []).map((item) => (
              <div key={item.id} className="border-b border-line pb-2">
                <p className="font-bold">{item.path}</p>
                <p className="text-foreground/50">{item.device} - {item.createdAt.toLocaleString("en-IN")}</p>
              </div>
            ))}
            {!stats?.recent.length ? <p className="text-foreground/60">No recent visits yet.</p> : null}
          </div>
        </div>
      </section>
    </div>
  );
}
