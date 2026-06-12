import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";
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
      <section className="bg-water">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[1fr_380px] lg:px-6">
          <div>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: item.title, href: `/free-kashmir-itinerary/${item.slug}` },
              ]}
            />
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-bold text-brand">
              <Download size={16} /> Free gated itinerary
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-normal text-brand-dark md:text-5xl">
              {item.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground/70">
              {item.description}
            </p>
            <div className="mt-8 rounded-lg border border-line bg-white p-5 shadow-sm">
              <h2 className="text-2xl font-black text-brand-dark">What is inside?</h2>
              <ul className="mt-4 grid gap-3 text-foreground/70">
                <li>Day-wise route for {item.destination}</li>
                <li>Suggested stay pattern and transfer notes</li>
                <li>Lead-friendly PDF delivery after form submission</li>
                <li>Admin-managed SEO title, metadata, FAQs, and index control</li>
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
