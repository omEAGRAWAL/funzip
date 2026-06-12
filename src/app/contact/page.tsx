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
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[1fr_420px] lg:px-6">
        <div>
          <h1 className="text-4xl font-black text-brand-dark md:text-5xl">
            Contact a Kashmir travel planner
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground/70">
            Tell us your dates, group size, and preferred locations. The lead
            will be stored with source, device, UTM, and referrer data for the
            admin team.
          </p>
          <div className="mt-8 grid gap-4 text-lg font-bold">
            <a href={`tel:${config.phone}`} className="text-brand">
              Call: {config.phone}
            </a>
            <a href={whatsappUrl("Hi, I want a Kashmir package quote.")} className="text-brand">
              WhatsApp: {config.whatsapp}
            </a>
            <a href={`mailto:${config.email}`} className="text-brand">
              Email: {config.email}
            </a>
            <p className="text-foreground/70">{config.address}</p>
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
