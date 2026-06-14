import Image from "next/image";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { PublicShell } from "@/components/layout-shell";
import { absoluteUrl, getSiteConfig, whatsappUrl } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Kashmir Travel Planner",
  description:
    "Contact a Kashmir travel planner for package quotes, private cab planning, hotel options, itinerary downloads, and family or honeymoon trips.",
  path: "/contact",
});

export default function ContactPage() {
  const config = getSiteConfig();

  return (
    <PublicShell>
      <section className="relative overflow-hidden bg-brand-dark text-white">
        <Image
          src={config.defaultOgImage}
          alt="Kashmir travel planning contact"
          fill
          priority
          sizes="100vw"
          className="hero-image object-cover opacity-52"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/76 to-brand-dark/24" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-20">
          <p className="text-sm font-black uppercase text-accent-soft">
            Contact
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-normal md:text-6xl">
            Talk to a Kashmir travel planner
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/78">
            Share your dates, group size, and the kind of trip you want. We will
            help you compare routes, stays, cab options, and seasonal details.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 lg:grid-cols-[1fr_420px] lg:px-6">
        <div className="scroll-reveal">
          <div className="grid gap-4 text-base font-bold sm:grid-cols-2">
            <a
              href={`tel:${config.phone}`}
              className="rounded-lg border border-line bg-surface p-5 text-brand shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-dark/10"
            >
              <Phone size={20} />
              <span className="mt-3 block text-foreground/60">Call</span>
              <span className="mt-1 block text-lg text-brand-dark">
                {config.phone}
              </span>
            </a>
            <a
              href={whatsappUrl("Hi, I want a Kashmir package quote.")}
              className="rounded-lg border border-line bg-surface p-5 text-brand shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-dark/10"
            >
              <MessageCircle size={20} />
              <span className="mt-3 block text-foreground/60">WhatsApp</span>
              <span className="mt-1 block text-lg text-brand-dark">
                {config.whatsapp}
              </span>
            </a>
            <a
              href={`mailto:${config.email}`}
              className="rounded-lg border border-line bg-surface p-5 text-brand shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-dark/10"
            >
              <Mail size={20} />
              <span className="mt-3 block text-foreground/60">Email</span>
              <span className="mt-1 block text-lg text-brand-dark">
                {config.email}
              </span>
            </a>
            <div className="rounded-lg border border-line bg-surface p-5 text-brand shadow-sm">
              <MapPin size={20} />
              <span className="mt-3 block font-bold text-foreground/60">
                Address
              </span>
              <span className="mt-1 block text-lg font-bold text-brand-dark">
                {config.address}
              </span>
            </div>
          </div>
        </div>
        <LeadForm
          sourcePage={absoluteUrl("/contact")}
          leadType="Contact Page"
          interestedPackage="Custom Kashmir package"
        />
      </section>
    </PublicShell>
  );
}
