import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { PackageCard } from "@/components/cards";
import { LeadForm } from "@/components/lead-form";
import { PublicShell } from "@/components/layout-shell";
import { getPackages } from "@/lib/data";
import { absoluteUrl, getSiteConfig } from "@/lib/config";
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
  const config = getSiteConfig();
  const heroImage = packages[0]?.images[0]?.url || config.defaultOgImage;

  return (
    <PublicShell>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Kashmir Tour Packages", url: absoluteUrl("/kashmir-tour-packages") },
        ])}
      />
      <section className="relative overflow-hidden bg-brand-dark text-white">
        <Image
          src={heroImage}
          alt="Kashmir tour packages landscape"
          fill
          priority
          sizes="100vw"
          className="hero-image object-cover opacity-62"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/76 to-brand-dark/24" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-20">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/14 px-3 py-1 text-sm font-bold shadow-sm backdrop-blur">
            <Sparkles size={16} /> Packages that can bend around your dates
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-normal md:text-6xl">
            Kashmir tour packages
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/82">
            Compare Srinagar, Gulmarg, Pahalgam, Sonmarg, honeymoon, family,
            and snow trips with animated day previews, private cab guidance, and
            local planning support.
          </p>
          <div className="mt-8 grid gap-3 text-sm font-bold text-white/88 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <MapPin className="text-accent-soft" size={18} />
              Destination-led routes
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-accent-soft" size={18} />
              Hotels and cab guidance
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="text-accent-soft" size={18} />
              Customizable trips
            </div>
          </div>
          <Link
            href="#package-list"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-5 text-sm font-black text-white shadow-lg shadow-accent/20 transition hover:bg-white hover:text-brand-dark"
          >
            Explore packages <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <section
        id="package-list"
        className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[1fr_380px] lg:px-6"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {packages.map((item, index) => (
            <PackageCard key={item.slug} item={item} index={index} />
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
