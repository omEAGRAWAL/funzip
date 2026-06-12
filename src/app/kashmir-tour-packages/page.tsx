import { PackageCard } from "@/components/cards";
import { LeadForm } from "@/components/lead-form";
import { PublicShell } from "@/components/layout-shell";
import { getPackages } from "@/lib/data";
import { absoluteUrl } from "@/lib/config";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "Kashmir Tour Packages Listing",
  description:
    "Compare Kashmir tour packages for families, couples, snow trips, Srinagar, Gulmarg, Pahalgam, private cabs, hotels, and houseboats.",
  path: "/kashmir-tour-packages",
});

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <PublicShell>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Kashmir Tour Packages", url: absoluteUrl("/kashmir-tour-packages") },
        ])}
      />
      <section className="bg-water">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <h1 className="text-4xl font-black text-brand-dark md:text-5xl">
            Kashmir tour packages
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-foreground/70">
            Browse publish-ready Kashmir packages with SEO URLs, metadata,
            FAQs, itinerary sections, gallery images, reviews, pricing, and
            lead forms.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1fr_360px] lg:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          {packages.map((item) => (
            <PackageCard key={item.slug} item={item} />
          ))}
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <LeadForm
            sourcePage={absoluteUrl("/kashmir-tour-packages")}
            leadType="Package Listing"
            interestedPackage="Kashmir packages"
          />
        </div>
      </section>
    </PublicShell>
  );
}
