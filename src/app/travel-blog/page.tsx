import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Sparkles } from "lucide-react";
import { BlogCard } from "@/components/cards";
import { LeadForm } from "@/components/lead-form";
import { PublicShell } from "@/components/layout-shell";
import { getBlogs } from "@/lib/data";
import { absoluteUrl, getSiteConfig } from "@/lib/config";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "Kashmir Travel Blog",
  description:
    "Read Kashmir travel guides for seasons, budgets, family routes, honeymoon planning, snow trips, and package selection.",
  path: "/travel-blog",
});

export default async function BlogListingPage() {
  const blogs = await getBlogs();
  const config = getSiteConfig();
  const heroImage = blogs[0]?.featuredImage || config.defaultOgImage;

  return (
    <PublicShell>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Travel Blog", url: absoluteUrl("/travel-blog") },
        ])}
      />
      <section className="relative overflow-hidden bg-brand-dark text-white">
        <Image
          src={heroImage}
          alt="Kashmir travel blog landscape"
          fill
          priority
          sizes="100vw"
          className="hero-image object-cover opacity-58"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/74 to-brand-dark/22" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-20">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/14 px-3 py-1 text-sm font-bold shadow-sm backdrop-blur">
            <Sparkles size={16} /> Field notes for smarter Kashmir planning
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-normal md:text-6xl">
            Kashmir travel blog
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/82">
            Read season notes, budget guides, snow expectations, family pacing,
            and destination advice before you lock your Kashmir route.
          </p>
          <Link
            href="#blog-list"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-5 text-sm font-black text-white shadow-lg shadow-accent/20 transition hover:bg-white hover:text-brand-dark"
          >
            Read guides <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <section
        id="blog-list"
        className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[1fr_360px] lg:px-6"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {blogs.map((item, index) => (
            <BlogCard key={item.slug} item={item} index={index} />
          ))}
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="mb-4 rounded-lg border border-line bg-surface p-5 shadow-sm">
            <p className="flex items-center gap-2 text-sm font-black uppercase text-brand">
              <CalendarDays size={16} /> Planning note
            </p>
            <p className="mt-3 text-sm leading-6 text-foreground/68">
              Kashmir changes quickly by season. Use the guides to narrow your
              route, then ask for a quote that matches your dates.
            </p>
          </div>
          <LeadForm
            sourcePage={absoluteUrl("/travel-blog")}
            leadType="Blog Listing"
            interestedPackage="Kashmir trip planning"
          />
        </div>
      </section>
    </PublicShell>
  );
}
