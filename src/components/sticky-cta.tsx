import { Phone, Send } from "lucide-react";
import { getSiteConfig, whatsappUrl } from "@/lib/config";

export function StickyCta() {
  const config = getSiteConfig();

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-2 gap-2 rounded-lg border border-white/70 bg-white/88 p-2 shadow-2xl shadow-brand-dark/15 backdrop-blur-xl md:left-auto md:right-5 md:w-80">
      <a
        href={whatsappUrl("Hi, I want a Kashmir tour quote.")}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-brand text-sm font-bold text-white shadow-sm"
      >
        <Send size={17} />
        WhatsApp
      </a>
      <a
        href={`tel:${config.phone}`}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-accent text-sm font-bold text-foreground shadow-sm"
      >
        <Phone size={17} />
        Call
      </a>
    </div>
  );
}
