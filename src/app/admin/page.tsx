import Link from "next/link";
import { AdminLoginForm } from "@/components/admin-login-form";
import { isAdminAuthenticated } from "@/lib/auth";
import { getBlogs, getPackages } from "@/lib/data";
import { withDatabase } from "@/lib/prisma";

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();

  if (!authed) {
    return (
      <main className="grid min-h-screen place-items-center bg-muted px-4">
        <section className="w-full max-w-md rounded-lg border border-line bg-white p-6 shadow-sm">
          <p className="text-sm font-bold uppercase text-brand">Admin</p>
          <h1 className="mt-2 text-3xl font-black text-brand-dark">
            Password protected dashboard
          </h1>
          <p className="mt-3 text-sm leading-6 text-foreground/65">
            Use the password stored in <code>ADMIN_PASSWORD</code>. No public
            registration is enabled.
          </p>
          <AdminLoginForm />
        </section>
      </main>
    );
  }

  const [packages, blogs, stats] = await Promise.all([
    getPackages(true),
    getBlogs(true),
    withDatabase(async (db) => ({
      leads: await db.lead.count(),
      bookings: await db.booking.count(),
      pageViews: await db.pageView.count(),
      redirects: await db.redirect.count(),
      recentLeads: await db.lead.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    })),
  ]);

  const cards = [
    ["Packages", packages.length],
    ["Blogs", blogs.length],
    ["Leads", stats?.leads ?? 0],
    ["Bookings", stats?.bookings ?? 0],
    ["Page views", stats?.pageViews ?? 0],
    ["Redirects", stats?.redirects ?? 0],
  ];

  return (
    <div>
      <h1 className="text-3xl font-black text-brand-dark">Dashboard overview</h1>
      <p className="mt-2 text-foreground/65">
        Content, leads, bookings, analytics, redirects, and sitemap controls in
        one simple admin surface.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-line bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-foreground/60">{label}</p>
            <p className="mt-2 text-3xl font-black text-brand-dark">{value}</p>
          </div>
        ))}
      </div>
      <section className="mt-8 rounded-lg border border-line bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-black text-brand-dark">Recent leads</h2>
          <Link href="/admin/leads" className="text-sm font-bold text-brand">
            Manage leads
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-foreground/60">
              <tr>
                <th className="py-2">Name</th>
                <th>Phone</th>
                <th>Source</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(stats?.recentLeads ?? []).map((lead) => (
                <tr key={lead.id} className="border-t border-line">
                  <td className="py-3 font-bold">{lead.name}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.sourcePage}</td>
                  <td>{lead.status}</td>
                </tr>
              ))}
              {!stats?.recentLeads.length ? (
                <tr>
                  <td className="py-4 text-foreground/60" colSpan={4}>
                    No database leads yet. Public pages are still demoable with
                    seeded content.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
