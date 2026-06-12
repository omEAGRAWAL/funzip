import Link from "next/link";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

async function regenerateSitemapsAction() {
  "use server";
  await requireAdmin();
  [
    "/sitemap.xml",
    "/sitemap-pages.xml",
    "/sitemap-packages.xml",
    "/sitemap-blogs.xml",
    "/sitemap-itineraries.xml",
    "/sitemap-images.xml",
  ].forEach((path) => revalidatePath(path));
}

const sitemapPaths = [
  "/sitemap.xml",
  "/sitemap-packages.xml",
  "/sitemap-blogs.xml",
  "/sitemap-pages.xml",
  "/sitemap-itineraries.xml",
  "/sitemap-images.xml",
];

export default async function AdminSitemapsPage() {
  await requireAdmin();

  return (
    <div className="grid gap-8">
      <section>
        <h1 className="text-3xl font-black text-brand-dark">Sitemap regeneration logic</h1>
        <p className="mt-2 text-foreground/65">
          Content changes revalidate sitemap paths automatically. This control
          lets admins trigger regeneration on demand.
        </p>
      </section>
      <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
        <form action={regenerateSitemapsAction}>
          <button className="rounded-md bg-brand px-4 py-2 text-sm font-bold text-white">
            Regenerate sitemap cache
          </button>
        </form>
        <div className="mt-5 grid gap-2 text-sm">
          {sitemapPaths.map((path) => (
            <Link key={path} href={path} className="font-bold text-brand">
              {path}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
