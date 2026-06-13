export function getSiteConfig() {
  const siteUrl = process.env.SITE_URL || "https://example.com";

  return {
    brandName: process.env.BRAND_NAME || "Funzip",
    siteUrl: siteUrl.replace(/\/$/, ""),
    phone: process.env.BRAND_PHONE || "+91 98765 43210",
    whatsapp: process.env.BRAND_WHATSAPP || "+91 98765 43210",
    email: process.env.BRAND_EMAIL || "hello@example.com",
    address:
      process.env.BRAND_ADDRESS || "Srinagar, Jammu and Kashmir, India",
    defaultOgImage:
      process.env.DEFAULT_OG_IMAGE ||
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  };
}

export function absoluteUrl(path = "/") {
  const { siteUrl } = getSiteConfig();
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function whatsappUrl(message: string) {
  const phone = getSiteConfig().whatsapp.replace(/[^\d]/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
