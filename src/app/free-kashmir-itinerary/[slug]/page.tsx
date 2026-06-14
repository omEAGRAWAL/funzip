import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, Download } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LeadForm } from "@/components/lead-form";
import { PublicShell } from "@/components/layout-shell";
import { getItineraries, getItineraryBySlug } from "@/lib/data";
import { absoluteUrl } from "@/lib/config";
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  pageMetadata,
} from "@/lib/seo";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const itineraries = await getItineraries();
  return itineraries.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getItineraryBySlug(slug);
  if (!item) return {};
  return pageMetadata({
    title: item.seoTitle,
    description: item.metaDescription,
    path: `/free-kashmir-itinerary/${item.slug}`,
    canonicalUrl: item.canonicalUrl,
    image: item.ogImage,
    indexable: item.indexable,
  });
}

export default async function ItineraryPage({ params }: Props) {
  const { slug } = await params;
  const item = await getItineraryBySlug(slug);
  if (!item) notFound();

  return (
    <PublicShell>
      <JsonLd data={faqSchema(item.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: item.title, url: absoluteUrl(`/free-kashmir-itinerary/${item.slug}`) },
        ])}
      />
      <section className="relative overflow-hidden bg-brand-dark text-white">
        {item.ogImage ? (
          <Image
            src={item.ogImage}
            alt={item.title}
            fill
            priority
            sizes="100vw"
            className="hero-image object-cover opacity-55"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/74 to-brand-dark/24" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-20">
          <Breadcrumbs
            className="text-white/70"
            items={[
              { label: "Home", href: "/" },
              { label: item.title, href: `/free-kashmir-itinerary/${item.slug}` },
            ]}
          />
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/14 px-3 py-1 text-sm font-bold shadow-sm backdrop-blur">
            <Download size={16} /> Free Kashmir itinerary
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-normal md:text-6xl">
            {item.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/78">
            {item.description}
          </p>
        </div>
      </section>
      <section className="bg-water/70">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 lg:grid-cols-[1fr_380px] lg:px-6">
          <div className="scroll-reveal">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: item.title, href: `/free-kashmir-itinerary/${item.slug}` },
              ]}
            />
            <div className="mt-8 rounded-lg border border-line bg-white p-5 shadow-sm">
              <h2 className="text-2xl font-black text-brand-dark">What is inside?</h2>
              <ul className="mt-4 grid gap-3 text-foreground/70">
                {[
                  `Day-wise route for ${item.destination}`,
                  "Suggested stay pattern and transfer notes",
                  "Sightseeing flow that avoids rushed travel days",
                  "Planning prompts for hotels, cabs, meals, and seasonal choices",
                ].map((text) => (
                  <li key={text} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-brand" size={18} />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <section className="mt-8 grid gap-4">
              <h2 className="text-2xl font-black text-brand-dark">FAQs</h2>
              {item.faqs.map((faq) => (
                <details key={faq.question} className="rounded-lg border border-line bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer font-black text-brand-dark">{faq.question}</summary>
                  <p className="mt-3 leading-7 text-foreground/70">{faq.answer}</p>
                </details>
              ))}
            </section>
          </div>
          <LeadForm
            sourcePage={absoluteUrl(`/free-kashmir-itinerary/${item.slug}`)}
            leadType="Itinerary Download"
            interestedPackage={item.title}
            downloadUrl={item.pdfUrl}
          />
        </div>
      </section>
    </PublicShell>
  );
}
