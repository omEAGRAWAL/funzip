import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, IndianRupee, MessageCircle, X } from "lucide-react";
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
import { absoluteUrl, whatsappUrl } from "@/lib/config";
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
  const hero = item.images[0];

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
      <section className="relative overflow-hidden bg-brand-dark text-white">
        {hero ? (
          <Image
            src={hero.url}
            alt={hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
        ) : null}
        <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Packages", href: "/kashmir-tour-packages" },
              { label: item.title, href: `/kashmir-tour-packages/${item.slug}` },
            ]}
          />
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-normal md:text-6xl">
            {item.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/82">
            {item.overview}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <span className="rounded-md bg-white/12 px-4 py-2 font-bold">
              {item.duration}
            </span>
            <span className="rounded-md bg-accent px-4 py-2 font-black text-foreground">
              INR {item.price.toLocaleString("en-IN")} {item.priceNote}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1fr_380px] lg:px-6">
        <div className="grid gap-10">
          <section className="rounded-lg border border-line bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-brand-dark">Package overview</h2>
            <p className="mt-4 leading-8 text-foreground/70">{item.overview}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-bold text-foreground/60">Duration</p>
                <p className="mt-1 text-xl font-black">{item.duration}</p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-bold text-foreground/60">Starting price</p>
                <p className="mt-1 flex items-center text-xl font-black">
                  <IndianRupee size={18} /> {item.price.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-brand-dark">Day-wise itinerary</h2>
            <div className="mt-5 grid gap-4">
              {item.itinerary.map((day) => (
                <article key={day.day} className="rounded-lg border border-line bg-white p-5 shadow-sm">
                  <p className="text-sm font-black text-brand">Day {day.day}</p>
                  <h3 className="mt-1 text-xl font-black text-brand-dark">{day.title}</h3>
                  <p className="mt-2 leading-7 text-foreground/70">{day.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-5 md:grid-cols-2">
            <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-brand-dark">Inclusions</h2>
              <ul className="mt-4 grid gap-2">
                {item.inclusions.map((text) => (
                  <li key={text} className="flex gap-2 text-sm leading-6">
                    <Check className="mt-1 shrink-0 text-brand" size={16} /> {text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-brand-dark">Exclusions</h2>
              <ul className="mt-4 grid gap-2">
                {item.exclusions.map((text) => (
                  <li key={text} className="flex gap-2 text-sm leading-6">
                    <X className="mt-1 shrink-0 text-accent" size={16} /> {text}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-black text-brand-dark">Hotel and cab details</h2>
            <p className="mt-4 leading-7 text-foreground/70">{item.hotels}</p>
            <p className="mt-3 leading-7 text-foreground/70">{item.cabDetails}</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-brand-dark">Gallery</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {item.images.map((image) => (
                <Image
                  key={image.url}
                  src={image.url}
                  alt={image.alt}
                  width={700}
                  height={520}
                  className="h-56 rounded-lg object-cover"
                />
              ))}
            </div>
          </section>

          <section className="grid gap-4">
            <h2 className="text-2xl font-black text-brand-dark">FAQs</h2>
            {item.faqs.map((faq) => (
              <details key={faq.question} className="rounded-lg border border-line bg-white p-5 shadow-sm">
                <summary className="cursor-pointer font-black text-brand-dark">{faq.question}</summary>
                <p className="mt-3 leading-7 text-foreground/70">{faq.answer}</p>
              </details>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-black text-brand-dark">Reviews</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {item.reviews.map((review) => (
                <article key={review.name} className="rounded-lg border border-line bg-white p-5 shadow-sm">
                  <p className="font-black text-brand-dark">{review.name}</p>
                  <p className="mt-1 text-sm font-bold text-accent">{review.rating}/5 rating</p>
                  <p className="mt-3 leading-7 text-foreground/70">{review.text}</p>
                </article>
              ))}
            </div>
          </section>

          {relatedPackages.length ? (
            <section>
              <h2 className="text-2xl font-black text-brand-dark">Related packages</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {relatedPackages.map((related) => (
                  <PackageCard key={related.slug} item={related} />
                ))}
              </div>
            </section>
          ) : null}

          {relatedBlogs.length ? (
            <section>
              <h2 className="text-2xl font-black text-brand-dark">Related blogs</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {relatedBlogs.map((blog) => (
                  <BlogCard key={blog.slug} item={blog} />
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="grid gap-4 lg:sticky lg:top-24 lg:self-start">
          <LeadForm
            sourcePage={absoluteUrl(`/kashmir-tour-packages/${item.slug}`)}
            leadType="Package Detail"
            interestedPackage={item.title}
          />
          <Link
            href={whatsappUrl(`Hi, I want details for ${item.title}.`)}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand text-sm font-black text-white"
          >
            <MessageCircle size={18} /> Ask on WhatsApp
          </Link>
        </aside>
      </section>
    </PublicShell>
  );
}
