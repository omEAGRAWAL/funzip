import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import { BlogCard, PackageCard } from "@/components/cards";
import { LeadForm } from "@/components/lead-form";
import { PublicShell } from "@/components/layout-shell";
import { getBlogs, getItineraries, getPackages } from "@/lib/data";
import { absoluteUrl, getSiteConfig } from "@/lib/config";
import { JsonLd, organizationSchema, pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "Kashmir Tour Packages, Honeymoon Trips and Family Holidays",
  description:
    "Book SEO-friendly Kashmir tour packages with Srinagar, Gulmarg, Pahalgam, houseboat stays, private cabs, and free itinerary downloads.",
  path: "/",
});

export default async function Home() {
  const [packages, blogs, itineraries] = await Promise.all([
    getPackages(),
    getBlogs(),
    getItineraries(),
  ]);
  const config = getSiteConfig();
  const featured = packages.slice(0, 3);

  return (
    <PublicShell>
      <JsonLd data={organizationSchema()} />
      <section className="relative overflow-hidden bg-brand-dark text-white">
        <Image
          src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d"
          alt="Dal Lake Kashmir tour packages"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[1.15fr_0.85fr] md:px-6 md:py-24">
          <div>
            <p className="inline-flex rounded-full bg-white/12 px-3 py-1 text-sm font-bold">
              Srinagar based Kashmir travel planning
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-normal md:text-6xl">
              Kashmir tour packages built for search, trust, and real bookings
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82">
              Plan Srinagar, Gulmarg, Pahalgam, Sonmarg, honeymoon, family, and
              snow trips with clear day-wise itineraries, private cab guidance,
              hotels, FAQs, reviews, and fast callback support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/kashmir-tour-packages"
                className="inline-flex h-12 items-center gap-2 rounded-md bg-accent px-5 text-sm font-black text-foreground"
              >
                View packages <ArrowRight size={18} />
              </Link>
              <Link
                href="/free-kashmir-itinerary/six-day-kashmir-itinerary"
                className="inline-flex h-12 items-center rounded-md border border-white/35 px-5 text-sm font-black text-white"
              >
                Download itinerary
              </Link>
            </div>
          </div>
          <LeadForm
            sourcePage={absoluteUrl("/")}
            leadType="Homepage"
            interestedPackage="General Kashmir trip"
          />
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 md:grid-cols-3 md:px-6">
          {[
            ["Local route planning", "Srinagar, Gulmarg, Pahalgam and winter logistics handled with practical ground context."],
            ["SEO-ready pages", "Every package and blog page has metadata, schema, breadcrumbs, and internal links."],
            ["Conversion focus", "Lead forms, WhatsApp CTAs, itinerary downloads, and callback prompts across the journey."],
          ].map(([title, text]) => (
            <div key={title} className="flex gap-3">
              <CheckCircle2 className="mt-1 text-brand" size={20} />
              <div>
                <h2 className="font-black text-brand-dark">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-foreground/65">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold uppercase text-brand">
              <MapPin size={17} /> Kashmir tour packages
            </p>
            <h2 className="mt-2 text-3xl font-black text-brand-dark md:text-4xl">
              Popular packages ready to publish, edit, clone, and grow
            </h2>
          </div>
          <Link href="/kashmir-tour-packages" className="font-bold text-brand">
            See all packages
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {featured.map((item) => (
            <PackageCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      <section className="bg-muted">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-[0.85fr_1.15fr] md:px-6">
          <div>
            <p className="text-sm font-bold uppercase text-brand">
              Free download funnel
            </p>
            <h2 className="mt-2 text-3xl font-black text-brand-dark">
              Gate itinerary downloads with lead capture
            </h2>
            <p className="mt-4 leading-7 text-foreground/70">
              Itinerary pages are crawlable and conversion-focused. Visitors
              read useful content first, then submit a form to reveal the PDF
              link.
            </p>
          </div>
          <div className="grid gap-4">
            {itineraries.map((item) => (
              <Link
                key={item.slug}
                href={`/free-kashmir-itinerary/${item.slug}`}
                className="rounded-lg border border-line bg-white p-5 shadow-sm"
              >
                <p className="text-sm font-bold text-brand">{item.destination}</p>
                <h3 className="mt-1 text-xl font-black text-brand-dark">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-foreground/65">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-brand">Travel blog</p>
            <h2 className="mt-2 text-3xl font-black text-brand-dark">
              Internal-link friendly Kashmir guides
            </h2>
          </div>
          <Link href="/travel-blog" className="font-bold text-brand">
            Read all guides
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {blogs.slice(0, 2).map((item) => (
            <BlogCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      <section className="bg-brand-dark text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-[1fr_auto] md:items-center md:px-6">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold uppercase text-accent">
              <ShieldCheck size={18} /> Local support
            </p>
            <h2 className="mt-2 text-3xl font-black">
              Ready to plan Kashmir with {config.brandName}?
            </h2>
            <p className="mt-3 text-white/75">
              Call, WhatsApp, or submit a form. The admin dashboard captures
              every lead with source page and campaign attribution.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-5 font-black text-foreground"
          >
            Contact us
          </Link>
        </div>
      </section>
    </PublicShell>
  );
}
