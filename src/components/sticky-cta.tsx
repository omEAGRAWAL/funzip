import { Phone, Send } from "lucide-react";
import { getSiteConfig, whatsappUrl } from "@/lib/config";

export function StickyCta() {
  const config = getSiteConfig();

  return (
    <div className="pointer-events-none fixed inset-x-5 bottom-8 z-50 flex justify-between md:pointer-events-auto md:inset-x-auto md:bottom-3 md:right-5 md:grid md:w-80 md:grid-cols-2 md:gap-2 md:rounded-lg md:border md:border-white/70 md:bg-white/88 md:p-2 md:shadow-2xl md:shadow-brand-dark/15 md:backdrop-blur-xl">
      <a
        href={whatsappUrl("Hi, I want a Kashmir tour quote.")}
        className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center gap-2 rounded-full bg-secondary text-sm font-bold text-white shadow-xl transition hover:scale-105 md:h-11 md:w-auto md:rounded-md md:bg-brand md:shadow-sm"
      >
        <Send size={17} />
        <span className="sr-only md:not-sr-only">WhatsApp</span>
      </a>
      <a
        href={`tel:${config.phone}`}
        className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center gap-2 rounded-full bg-accent text-sm font-bold text-white shadow-xl transition hover:scale-105 md:h-11 md:w-auto md:rounded-md md:text-white md:shadow-sm"
      >
        <Phone size={17} />
        <span className="sr-only md:not-sr-only">Call</span>
      </a>
    </div>
  );
}
