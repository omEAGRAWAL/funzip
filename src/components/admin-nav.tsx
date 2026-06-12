import Link from "next/link";
import { logoutAction } from "@/lib/admin-actions";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/packages", label: "Packages" },
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/redirects", label: "Redirects" },
  { href: "/admin/sitemaps", label: "Sitemaps" },
];

export function AdminNav() {
  return (
    <aside className="border-b border-white/10 bg-brand-dark text-white lg:min-h-screen lg:border-b-0 lg:border-r">
      <div className="p-5">
        <p className="text-lg font-black">Travel Admin</p>
        <p className="text-xs text-white/60">Kashmir SEO CMS</p>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 text-sm lg:grid lg:px-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-md px-3 py-2 font-semibold text-white/75 hover:bg-white/10 hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <form action={logoutAction} className="hidden p-3 lg:block">
        <button className="w-full rounded-md border border-white/20 px-3 py-2 text-sm font-bold text-white/80">
          Logout
        </button>
      </form>
    </aside>
  );
}
