import { sitemapIndex, xmlResponse } from "@/lib/sitemap";

export async function GET() {
  return xmlResponse(
    sitemapIndex([
      "/sitemap-pages.xml",
      "/sitemap-packages.xml",
      "/sitemap-blogs.xml",
      "/sitemap-itineraries.xml",
      "/sitemap-images.xml",
    ]),
  );
}
