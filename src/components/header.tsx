import Link from "next/link";
import { CalendarDays, Menu, Phone, Send } from "lucide-react";
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
    <header className="sticky top-0 z-40 border-b border-white/60 bg-surface/86 shadow-sm backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[44px_1fr_44px] items-center gap-3 px-5 py-4 md:grid-cols-[1fr_auto_1fr] md:px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/kashmir-tour-packages"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-brand transition hover:bg-surface-mid"
            aria-label="View packages"
          >
            <Menu size={22} />
          </Link>
          <nav className="hidden items-center gap-5 text-sm font-semibold text-foreground/70 lg:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-brand">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <Link href="/" className="justify-self-center text-center leading-tight">
          <span className="block text-2xl font-black tracking-normal text-brand">
            {config.brandName}
          </span>
          <span className="hidden text-xs font-medium text-foreground/60 md:block">
            Kashmir travel planners
          </span>
        </Link>
        <div className="flex items-center justify-self-end gap-2">
          <Link
            href="/contact"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-brand transition hover:bg-surface-mid md:hidden"
            aria-label="Plan a trip"
          >
            <CalendarDays size={21} />
          </Link>
          <Link
            href="/contact"
            className="hidden h-10 items-center rounded-md bg-accent px-4 text-sm font-black text-white shadow-sm md:inline-flex"
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
