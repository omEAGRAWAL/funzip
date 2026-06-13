import Link from "next/link";
import { getSiteConfig } from "@/lib/config";

export function Footer() {
  const config = getSiteConfig();

  return (
    <footer className="border-t border-line bg-brand-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:px-6">
        <div>
          <p className="text-xl font-black">{config.brandName}</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/75">
            Kashmir-focused tour planning for families, couples, groups, and
            winter travellers. Built around clear itineraries, local route
            guidance, private cab planning, and responsive support.
          </p>
        </div>
        <div>
          <p className="font-bold">Explore</p>
          <div className="mt-3 grid gap-2 text-sm text-white/75">
            <Link href="/kashmir-tour-packages">Kashmir packages</Link>
            <Link href="/travel-blog">Travel blog</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <p className="font-bold">Contact</p>
          <div className="mt-3 grid gap-2 text-sm text-white/75">
            <a href={`tel:${config.phone}`}>{config.phone}</a>
            <a href={`mailto:${config.email}`}>{config.email}</a>
            <span>{config.address}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
