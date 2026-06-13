import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Check,
  Clock,
  Heart,
  IndianRupee,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { BlogCard, PackageCard } from "@/components/cards";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LeadForm } from "@/components/lead-form";
import { PublicShell } from "@/components/layout-shell";
import {
  getPackageBySlug,
  getPackages,
  getRelatedBlogs,
  getRelatedPackages,
} from "@/lib/data";
import { absoluteUrl, getSiteConfig, whatsappUrl } from "@/lib/config";
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  imageSchema,
  packageSchema,
  pageMetadata,
} from "@/lib/seo";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const packages = await getPackages();
  return packages.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPackageBySlug(slug);
  if (!item) return {};

  return pageMetadata({
    title: item.seoTitle,
    description: item.metaDescription,
    path: `/kashmir-tour-packages/${item.slug}`,
    canonicalUrl: item.canonicalUrl,
    image: item.ogImage || item.images[0]?.url,
    indexable: item.indexable,
  });
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getPackageBySlug(slug);
  if (!item) notFound();

  const [relatedPackages, relatedBlogs] = await Promise.all([
    getRelatedPackages(item.relatedPackages),
    getRelatedBlogs(item.relatedBlogs),
  ]);
  const config = getSiteConfig();
  const hero = item.images[0];
  const category =
    typeof item.schemaFields.category === "string"
      ? item.schemaFields.category
      : "Kashmir package";
  const rating = item.reviews.length
    ? (
        item.reviews.reduce((total, review) => total + review.rating, 0) /
        item.reviews.length
      ).toFixed(1)
    : "4.8";

  return (
    <PublicShell>
      <JsonLd data={packageSchema(item)} />
      <JsonLd data={faqSchema(item.faqs)} />
      <JsonLd data={imageSchema(item.images)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Kashmir Tour Packages", url: absoluteUrl("/kashmir-tour-packages") },
          { name: item.title, url: absoluteUrl(`/kashmir-tour-packages/${item.slug}`) },
        ])}
      />
      <section className="relative flex min-h-[530px] items-end overflow-hidden bg-background text-foreground">
        {hero ? (
          <Image
            src={hero.url}
            alt={hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/94" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-6 pt-24 md:px-6 md:pb-12">
          <Breadcrumbs
            className="text-foreground/62"
            items={[
              { label: "Home", href: "/" },
              { label: "Packages", href: "/kashmir-tour-packages" },
              { label: item.title, href: `/kashmir-tour-packages/${item.slug}` },
            ]}
          />
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary/15 px-3 py-1 text-sm font-bold text-secondary shadow-sm backdrop-blur">
            <Heart size={16} /> {category}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-normal text-foreground drop-shadow-sm md:text-6xl">
            {item.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-foreground/72 md:text-lg md:leading-8">
            {item.overview}
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm font-bold text-foreground/68">
            <span className="inline-flex items-center gap-1">
              <Star className="fill-accent text-accent" size={17} />
              {rating} rating
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="text-foreground/55" size={17} />
              {item.duration}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="text-foreground/55" size={17} />
              {item.destination}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-14 lg:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="grid gap-10 pt-12">
            <section className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-line bg-surface p-5 shadow-sm">
                <p className="text-sm font-bold text-foreground/60">
                  Starting price
                </p>
                <p className="mt-2 flex items-center text-2xl font-black text-brand-dark">
                  <IndianRupee size={22} />
                  {item.price.toLocaleString("en-IN")}
                </p>
                <p className="mt-1 text-xs font-bold text-foreground/55">
                  {item.priceNote || "per person"}
                </p>
              </div>
              <div className="rounded-lg border border-line bg-surface p-5 shadow-sm">
                <p className="text-sm font-bold text-foreground/60">Duration</p>
                <p className="mt-2 text-2xl font-black text-brand-dark">
                  {item.duration}
                </p>
              </div>
              <div className="rounded-lg border border-line bg-surface p-5 shadow-sm">
                <p className="text-sm font-bold text-foreground/60">
                  Best for
                </p>
                <p className="mt-2 text-2xl font-black text-brand-dark">
                  {category}
                </p>
              </div>
            </section>

            <section>
              <p className="text-sm font-black uppercase text-brand">
                Overview
              </p>
              <h2 className="mt-2 text-3xl font-black text-brand-dark">
                A comfortable Kashmir route with local support
              </h2>
              <p className="mt-4 max-w-3xl leading-8 text-foreground/70">
                {item.overview}
              </p>
            </section>

            <section>
              <p className="text-sm font-black uppercase text-brand">
                Itinerary
              </p>
              <h2 className="mt-2 text-3xl font-black text-brand-dark">
                Day-wise plan
              </h2>
              <div className="mt-6 grid gap-4">
                {item.itinerary.map((day) => (
                  <article
                    key={day.day}
                    className="rounded-lg border border-line bg-surface p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                      <span className="inline-flex w-fit rounded-md bg-brand px-3 py-1 text-xs font-black uppercase text-white">
                        Day {day.day}
                      </span>
                      <div>
                        <h3 className="text-xl font-black text-brand-dark">
                          {day.title}
                        </h3>
                        <p className="mt-2 leading-7 text-foreground/70">
                          {day.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="grid gap-5 md:grid-cols-2">
              <div className="rounded-lg border border-line bg-surface p-5 shadow-sm">
                <h2 className="flex items-center gap-2 text-xl font-black text-brand-dark">
                  <Check className="text-brand" size={20} /> Inclusions
                </h2>
                <ul className="mt-4 grid gap-2">
                  {item.inclusions.map((text) => (
                    <li key={text} className="flex gap-2 text-sm leading-6">
                      <Check className="mt-1 shrink-0 text-brand" size={16} />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-line bg-surface p-5 shadow-sm">
                <h2 className="flex items-center gap-2 text-xl font-black text-brand-dark">
                  <X className="text-rose" size={20} /> Exclusions
                </h2>
                <ul className="mt-4 grid gap-2">
                  {item.exclusions.map((text) => (
                    <li key={text} className="flex gap-2 text-sm leading-6">
                      <X className="mt-1 shrink-0 text-rose" size={16} />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {item.hotels || item.cabDetails ? (
              <section className="grid gap-5 md:grid-cols-2">
                {item.hotels ? (
                  <div className="rounded-lg border border-line bg-surface p-5 shadow-sm">
                    <h2 className="text-xl font-black text-brand-dark">
                      Hotel details
                    </h2>
                    <p className="mt-4 leading-7 text-foreground/70">
                      {item.hotels}
                    </p>
                  </div>
                ) : null}
                {item.cabDetails ? (
                  <div className="rounded-lg border border-line bg-surface p-5 shadow-sm">
                    <h2 className="text-xl font-black text-brand-dark">
                      Cab details
                    </h2>
                    <p className="mt-4 leading-7 text-foreground/70">
                      {item.cabDetails}
                    </p>
                  </div>
                ) : null}
              </section>
            ) : null}

            {item.images.length ? (
              <section>
                <h2 className="text-3xl font-black text-brand-dark">Gallery</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {item.images.map((image) => (
                    <Image
                      key={image.url}
                      src={image.url}
                      alt={image.alt}
                      width={700}
                      height={520}
                      className="h-56 w-full rounded-lg object-cover shadow-sm"
                    />
                  ))}
                </div>
              </section>
            ) : null}

            <section className="grid gap-4">
              <h2 className="text-3xl font-black text-brand-dark">FAQs</h2>
              {item.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-lg border border-line bg-surface p-5 shadow-sm"
                >
                  <summary className="cursor-pointer font-black text-brand-dark">
                    {faq.question}
                  </summary>
                  <p className="mt-3 leading-7 text-foreground/70">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </section>

            {item.reviews.length ? (
              <section>
                <h2 className="text-3xl font-black text-brand-dark">Reviews</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {item.reviews.map((review) => (
                    <article
                      key={review.name}
                      className="rounded-lg border border-line bg-surface p-5 shadow-sm"
                    >
                      <p className="font-black text-brand-dark">{review.name}</p>
                      <p className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-accent">
                        <Star className="fill-accent" size={15} />
                        {review.rating}/5 rating
                      </p>
                      <p className="mt-3 leading-7 text-foreground/70">
                        {review.text}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {relatedPackages.length ? (
              <section>
                <h2 className="text-3xl font-black text-brand-dark">
                  Related packages
                </h2>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  {relatedPackages.map((related) => (
                    <PackageCard key={related.slug} item={related} />
                  ))}
                </div>
              </section>
            ) : null}

            {relatedBlogs.length ? (
              <section>
                <h2 className="text-3xl font-black text-brand-dark">
                  Related blogs
                </h2>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  {relatedBlogs.map((blog) => (
                    <BlogCard key={blog.slug} item={blog} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="order-first -mt-4 grid gap-4 self-start lg:order-none lg:-mt-8 lg:sticky lg:top-24">
            <div className="rounded-lg border border-white/75 bg-white/78 p-5 shadow-xl shadow-brand-dark/10 backdrop-blur-2xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-black uppercase text-brand-dark">
                <Sparkles size={14} /> Customizable package
              </p>
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-foreground/60">
                    Starting from
                  </p>
                  <p className="mt-1 flex items-center text-3xl font-black text-brand-dark">
                    <IndianRupee size={25} />
                    {item.price.toLocaleString("en-IN")}
                  </p>
                  <p className="mt-1 text-xs font-bold text-foreground/55">
                    {item.priceNote || "per person"}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2.5 py-1 text-sm font-black text-brand-dark">
                  <Star className="fill-accent text-accent" size={15} />
                  {rating}
                </span>
              </div>
              <div className="mt-5 grid gap-2">
                <a
                  href="#package-quote"
                  className="inline-flex h-14 items-center justify-center rounded-lg bg-accent px-4 text-sm font-black text-white shadow-lg shadow-accent/15"
                >
                  Customize this package
                </a>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={whatsappUrl(`Hi, I want details for ${item.title}.`)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-brand/25 bg-surface-mid text-sm font-black text-brand"
                  >
                    <MessageCircle size={17} /> WhatsApp
                  </a>
                  <a
                    href={`tel:${config.phone}`}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-brand/25 bg-surface-mid text-sm font-black text-brand"
                  >
                    <Phone size={17} /> Call
                  </a>
                </div>
              </div>
            </div>
            <div id="package-quote">
              <LeadForm
                sourcePage={absoluteUrl(`/kashmir-tour-packages/${item.slug}`)}
                leadType="Package Detail"
                interestedPackage={item.title}
              />
            </div>
            <div className="rounded-lg border border-line bg-surface p-5 text-sm leading-6 text-foreground/68 shadow-sm">
              <p className="flex items-center gap-2 font-black text-brand-dark">
                <ShieldCheck size={17} /> Local planner note
              </p>
              <p className="mt-2">
                Final pricing changes with travel month, room category, group
                size, and cab type. The callback keeps the route practical.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </PublicShell>
  );
}
