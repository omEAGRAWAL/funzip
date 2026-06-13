import Link from "next/link";
import { Phone, Send } from "lucide-react";
import { getSiteConfig, whatsappUrl } from "@/lib/config";

const navItems = [
  { href: "/kashmir-tour-packages", label: "Packages" },
  { href: "/travel-blog", label: "Blog" },
  { href: "/free-kashmir-itinerary/six-day-kashmir-itinerary", label: "Free itinerary" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const config = getSiteConfig();

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-surface/82 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-3 leading-tight">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand text-sm font-black text-white shadow-sm">
            {config.brandName.slice(0, 1)}
          </span>
          <span className="flex flex-col">
            <span className="text-lg font-black tracking-normal text-brand-dark">
            {config.brandName}
            </span>
            <span className="text-xs font-medium text-foreground/60">
              Kashmir tours by local planners
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold text-foreground/70 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brand">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden h-10 items-center rounded-md bg-accent px-4 text-sm font-black text-foreground shadow-sm md:inline-flex"
          >
            Plan trip
          </Link>
          <a
            href={`tel:${config.phone}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-brand-dark shadow-sm"
            aria-label="Call travel expert"
          >
            <Phone size={18} />
          </a>
          <a
            href={whatsappUrl("Hi, I want help planning a Kashmir trip.")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow-sm"
            aria-label="Chat on WhatsApp"
          >
            <Send size={18} />
          </a>
        </div>
      </div>
    </header>
  );
}
