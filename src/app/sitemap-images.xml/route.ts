import { blogUrls, itineraryUrls, packageUrls, urlset, xmlResponse } from "@/lib/sitemap";

export async function GET() {
  const urls = await Promise.all([packageUrls(), blogUrls(), itineraryUrls()]);
  return xmlResponse(
    urlset(
      urls
        .flat()
        .filter((item) => item.images?.length)
        .map((item) => ({ ...item, priority: 0.4, changefreq: "monthly" })),
    ),
  );
}
