import type { CSSProperties } from "react";
import Image from "next/image";
import { HeartHandshake, MapPin, ShieldCheck } from "lucide-react";
import { PublicShell } from "@/components/layout-shell";
import { getSiteConfig } from "@/lib/config";
import { JsonLd, organizationSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Funzip Kashmir Travel Planners",
  description:
    "Meet the Kashmir travel planners behind Funzip and learn how we design calm, local, and flexible Kashmir tour packages.",
  path: "/about",
});

export default function AboutPage() {
  const config = getSiteConfig();
  const values = [
    {
      title: "Local route sense",
      text: "We plan around real mountain travel time, seasonal road conditions, and the best order for Srinagar, Gulmarg, Pahalgam, Sonmarg, and Dal Lake.",
      icon: MapPin,
    },
    {
      title: "Clear trip design",
      text: "You get hotel options, cab guidance, day-wise pacing, and add-ons explained before you book.",
      icon: ShieldCheck,
    },
    {
      title: "Human support",
      text: "From first callback to travel day, the plan stays practical, flexible, and easy to discuss.",
      icon: HeartHandshake,
    },
  ];

  return (
    <PublicShell>
      <JsonLd data={organizationSchema()} />
      <section className="relative overflow-hidden bg-brand-dark text-white">
        <Image
          src={config.defaultOgImage}
          alt="Kashmir mountain travel scene"
          fill
          priority
          sizes="100vw"
          className="hero-image object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/74 to-brand-dark/24" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-20">
          <p className="text-sm font-black uppercase text-accent-soft">
            About {config.brandName}
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-normal md:text-6xl">
            Kashmir travel planning with a local pulse
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/78">
            We build Kashmir holidays for travellers who want beauty without
            confusion: thoughtful routes, comfortable stays, private cab
            planning, and honest guidance on what each season feels like.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-6">
        <div className="grid gap-5 md:grid-cols-3">
          {values.map(({ title, text, icon: Icon }, index) => (
            <div
              key={title}
              className="journey-panel rounded-lg border border-line bg-white p-5 shadow-sm"
              style={{ "--stagger": `${index * 100}ms` } as CSSProperties}
            >
              <Icon className="text-brand" size={24} />
              <h2 className="mt-4 text-xl font-black text-brand-dark">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-foreground/65">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
