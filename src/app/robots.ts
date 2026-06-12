import type { MetadataRoute } from "next";
import { absoluteUrl, getSiteConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/dashboard"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: getSiteConfig().siteUrl,
  };
}
