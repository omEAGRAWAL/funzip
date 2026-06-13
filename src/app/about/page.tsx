import { PublicShell } from "@/components/layout-shell";
import { getSiteConfig } from "@/lib/config";
import { JsonLd, organizationSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Funzip",
  description:
    "Learn about the Kashmir-focused travel brand, local planning approach, SEO-ready package content, and conversion-first tour operations.",
  path: "/about",
});

export default function AboutPage() {
  const config = getSiteConfig();

  return (
    <PublicShell>
      <JsonLd data={organizationSchema()} />
      <section className="mx-auto max-w-5xl px-4 py-14 md:px-6">
        <h1 className="text-4xl font-black text-brand-dark md:text-5xl">
          About {config.brandName}
        </h1>
        <p className="mt-5 text-lg leading-8 text-foreground/70">
          {config.brandName} is a Kashmir-focused travel brand designed for
          organic search growth and direct lead conversion. The website lets the
          agency keep adding packages, blogs, FAQs, images, and itinerary
          funnels without developer help.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            ["Local expertise", "Routes are shaped around Srinagar, Gulmarg, Pahalgam, Sonmarg, and seasonal travel realities."],
            ["SEO-first content", "Clean URLs, metadata, JSON-LD, breadcrumbs, internal links, and sitemaps are part of every published page."],
            ["Lead operations", "Forms, WhatsApp CTAs, booking statuses, and admin dashboards keep enquiries organized."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-lg border border-line bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-brand-dark">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-foreground/65">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
