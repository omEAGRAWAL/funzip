import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { BlogCard, PackageCard } from "@/components/cards";
import { LeadForm } from "@/components/lead-form";
import { PublicShell } from "@/components/layout-shell";
import { absoluteUrl, getSiteConfig, whatsappUrl } from "@/lib/config";
import { getBlogs, getItineraries, getPackages } from "@/lib/data";
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
  const heroImage = featured[1]?.images[0]?.url || config.defaultOgImage;
  const heroTrustItems = [
    { label: "Local experts", icon: CheckCircle2 },
    { label: "Best route timing", icon: CalendarDays },
    { label: "Call and WhatsApp support", icon: MessageCircle },
  ];
  const proofItems = [
    { title: "Google", text: "4.8/5 rating", icon: Star, tone: "text-accent" },
    {
      title: "10k+ travellers",
      text: "Families, couples, and groups",
      icon: Users,
      tone: "text-sky",
    },
    {
      title: "Local support",
      text: "Route, hotel, and cab help",
      icon: ShieldCheck,
      tone: "text-brand",
    },
  ];

  return (
    <PublicShell>
      <JsonLd data={organizationSchema()} />
      <section className="relative min-h-[650px] overflow-hidden bg-brand-dark text-white">
        <Image
          src={heroImage}
          alt="Kashmir valley travel package view"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-brand-dark/55 to-brand-dark/20" />
        <div className="relative mx-auto flex min-h-[650px] max-w-7xl flex-col justify-end px-4 pb-10 pt-24 md:px-6 md:pb-14">
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/16 px-3 py-1 text-sm font-bold text-white shadow-sm backdrop-blur">
              <Sparkles size={16} /> Srinagar based Kashmir travel planners
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-normal md:text-6xl">
              Explore Kashmir with trips planned around you
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/86">
              Honeymoon, family, group, and snow holidays across Srinagar,
              Gulmarg, Pahalgam, Sonmarg, and Dal Lake with private cab guidance
              and local support.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#trip-plan"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-black text-foreground shadow-lg shadow-black/15"
              >
                Get free trip plan <ArrowRight size={18} />
              </Link>
              <Link
                href="/kashmir-tour-packages"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/45 bg-white/10 px-5 text-sm font-black text-white backdrop-blur"
              >
                View packages
              </Link>
            </div>
          </div>
          <div className="mt-8 grid gap-3 border-t border-white/20 pt-5 text-sm font-bold text-white/88 sm:grid-cols-3">
            {heroTrustItems.map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="text-accent" size={18} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <div className="hide-scrollbar mx-auto flex max-w-7xl gap-4 overflow-x-auto px-4 py-6 md:grid md:grid-cols-3 md:px-6">
          {proofItems.map(({ title, text, icon: Icon, tone }) => (
            <div
              key={title}
              className="flex min-w-[230px] items-center gap-3 rounded-lg border border-line bg-snow p-4 shadow-sm"
            >
              <Icon
                className={`${tone} ${title === "Google" ? "fill-accent" : ""}`}
                size={24}
              />
              <div>
                <h2 className="font-black text-brand-dark">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-foreground/65">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="flex items-center gap-2 text-sm font-black uppercase text-brand">
              <MapPin size={17} /> Kashmir tour packages
            </p>
            <h2 className="mt-2 text-3xl font-black text-brand-dark md:text-4xl">
              Popular packages for every Kashmir plan
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-foreground/68">
              Choose a ready route or use it as a starting point for a custom
              honeymoon, family, group, or winter trip.
            </p>
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

      <section id="trip-plan" className="bg-water/65">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[1fr_420px] lg:items-start lg:px-6">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase text-brand">
              <HeartHandshake size={18} /> Custom planning
            </p>
            <h2 className="mt-2 max-w-2xl text-3xl font-black text-brand-dark md:text-4xl">
              Tell us your dates. We will shape the route, stays, and cab plan.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-foreground/70">
              Kashmir trips work best when the route matches the season, group
              size, and pace. Share a few details and get practical options from
              a local planner.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {["Honeymoon", "Family", "Snow trips"].map((label) => (
                <div
                  key={label}
                  className="rounded-lg border border-white/70 bg-white/70 p-4 text-sm font-black text-brand-dark shadow-sm backdrop-blur"
                >
                  {label}
                </div>
              ))}
            </div>
            <a
              href={whatsappUrl("Hi, I want help planning a Kashmir trip.")}
              className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-md border border-brand/25 bg-white/80 px-4 text-sm font-black text-brand shadow-sm"
            >
              <MessageCircle size={17} /> Ask on WhatsApp
            </a>
          </div>
          <LeadForm
            sourcePage={absoluteUrl("/")}
            leadType="Homepage"
            interestedPackage="General Kashmir trip"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-[0.8fr_1.2fr] md:px-6">
        <div>
          <p className="text-sm font-black uppercase text-brand">
            Free itinerary
          </p>
          <h2 className="mt-2 text-3xl font-black text-brand-dark">
            Start with a practical Kashmir route
          </h2>
          <p className="mt-4 leading-7 text-foreground/68">
            Download a simple itinerary and use it to compare hotels, cab days,
            sightseeing time, and budget before booking.
          </p>
        </div>
        <div className="grid gap-4">
          {itineraries.map((item) => (
            <Link
              key={item.slug}
              href={`/free-kashmir-itinerary/${item.slug}`}
              className="rounded-lg border border-line bg-surface p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-dark/10"
            >
              <p className="text-sm font-black text-brand">{item.destination}</p>
              <h3 className="mt-1 text-xl font-black text-brand-dark">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-foreground/65">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-muted">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase text-brand">
                Travel blog
              </p>
              <h2 className="mt-2 text-3xl font-black text-brand-dark">
                Kashmir guides before you book
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
        </div>
      </section>

      <section className="bg-brand-dark text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-[1fr_auto] md:items-center md:px-6">
          <div>
            <p className="flex items-center gap-2 text-sm font-black uppercase text-accent">
              <ShieldCheck size={18} /> Local support
            </p>
            <h2 className="mt-2 text-3xl font-black">
              Ready to plan Kashmir with {config.brandName}?
            </h2>
            <p className="mt-3 max-w-2xl text-white/75">
              Call, WhatsApp, or request a callback. We will help you compare
              routes, hotel categories, cab options, and seasonal details.
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
