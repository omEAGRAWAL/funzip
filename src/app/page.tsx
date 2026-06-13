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
    { label: "Local Experts", icon: CheckCircle2 },
    { label: "Best Price", icon: CalendarDays },
    { label: "24/7 Support", icon: MessageCircle },
  ];
  const proofItems = [
    { title: "Google", text: "4.8/5 Rating", icon: Star, tone: "text-brand" },
    {
      title: "Tripadvisor",
      text: "4.7/5 Rating",
      icon: MessageCircle,
      tone: "text-secondary",
    },
    {
      title: "10k+ travellers",
      text: "Happy Customers",
      icon: Users,
      tone: "text-accent",
    },
  ];

  return (
    <PublicShell>
      <JsonLd data={organizationSchema()} />
      <section className="relative flex min-h-[500px] items-end overflow-hidden bg-background px-5 pb-8 pt-24 text-foreground md:min-h-[620px] md:px-6 md:pb-14">
        <Image
          src={heroImage}
          alt="Kashmir valley travel package view"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/42 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-surface/65 px-3 py-1 text-sm font-bold text-brand shadow-sm backdrop-blur">
              <Sparkles size={16} /> Srinagar based Kashmir travel planners
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-normal text-foreground drop-shadow-sm md:text-6xl">
              Explore Kashmir with <span className="text-brand">customized</span>{" "}
              travel packages
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/72 drop-shadow-sm md:text-lg md:leading-8">
              Honeymoon, family, group, and snow holidays across Srinagar,
              Gulmarg, Pahalgam, Sonmarg, and Dal Lake with private cab guidance
              and local support.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#trip-plan"
                className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 text-sm font-black text-white shadow-lg shadow-accent/15 sm:w-auto"
              >
                Get free trip plan <ArrowRight size={18} />
              </Link>
              <Link
                href="/kashmir-tour-packages"
                className="inline-flex h-14 w-full items-center justify-center rounded-lg border border-brand bg-surface/50 px-5 text-sm font-black text-brand backdrop-blur sm:w-auto"
              >
                View packages
              </Link>
            </div>
          </div>
          <div className="mt-6 flex justify-between gap-3 border-t border-line pt-4 text-xs font-black uppercase text-foreground/62 sm:max-w-2xl">
            {heroTrustItems.map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon className="text-secondary" size={16} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-5 pt-16 md:px-6">
        <div className="hide-scrollbar mx-auto flex max-w-7xl snap-x gap-4 overflow-x-auto pb-4">
          {proofItems.map(({ title, text, icon: Icon, tone }) => (
            <div
              key={title}
              className="flex min-w-[200px] snap-start items-center gap-3 rounded-lg border border-line bg-surface p-4 shadow-sm"
            >
              <Icon
                className={`${tone} ${title === "Google" ? "fill-accent" : ""}`}
                size={23}
              />
              <div>
                <h2 className="text-base font-black text-foreground">{title}</h2>
                <p className="mt-1 text-xs font-black uppercase text-foreground/56">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="flex items-center gap-2 text-sm font-black uppercase text-brand">
              <MapPin size={17} /> Kashmir tour packages
            </p>
            <h2 className="mt-2 text-3xl font-black text-brand-dark md:text-4xl">
              Popular
              <br className="md:hidden" /> packages
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
