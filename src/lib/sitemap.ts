import { absoluteUrl } from "@/lib/config";
import { getBlogs, getItineraries, getPackages } from "@/lib/data";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function xmlResponse(xml: string) {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

export function sitemapIndex(paths: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (path) => `  <sitemap>
    <loc>${escapeXml(absoluteUrl(path))}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`,
  )
  .join("\n")}
</sitemapindex>`;
}

export function urlset(
  urls: {
    loc: string;
    lastmod?: Date;
    priority?: number;
    changefreq?: string;
    images?: string[];
  }[],
) {
  const hasImages = urls.some((item) => item.images?.length);

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${
    hasImages ? ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"' : ""
  }>
${urls
  .map((item) => {
    const images =
      item.images
        ?.map(
          (image) => `    <image:image>
      <image:loc>${escapeXml(image)}</image:loc>
    </image:image>`,
        )
        .join("\n") || "";

    return `  <url>
    <loc>${escapeXml(item.loc)}</loc>
    ${item.lastmod ? `<lastmod>${item.lastmod.toISOString()}</lastmod>` : ""}
    ${item.changefreq ? `<changefreq>${item.changefreq}</changefreq>` : ""}
    ${item.priority ? `<priority>${item.priority}</priority>` : ""}
${images}
  </url>`;
  })
  .join("\n")}
</urlset>`;
}

export async function packageUrls() {
  const packages = await getPackages();
  return packages
    .filter((item) => item.indexable)
    .map((item) => ({
      loc: absoluteUrl(`/kashmir-tour-packages/${item.slug}`),
      lastmod: item.updatedAt,
      priority: 0.85,
      changefreq: "weekly",
      images: item.images.map((image) => image.url),
    }));
}

export async function blogUrls() {
  const blogs = await getBlogs();
  return blogs
    .filter((item) => item.indexable)
    .map((item) => ({
      loc: absoluteUrl(`/travel-blog/${item.slug}`),
      lastmod: item.updatedAt,
      priority: 0.7,
      changefreq: "weekly",
      images: [item.featuredImage || item.ogImage].filter(Boolean) as string[],
    }));
}

export async function itineraryUrls() {
  const itineraries = await getItineraries();
  return itineraries
    .filter((item) => item.indexable)
    .map((item) => ({
      loc: absoluteUrl(`/free-kashmir-itinerary/${item.slug}`),
      lastmod: item.updatedAt,
      priority: 0.65,
      changefreq: "monthly",
      images: [item.ogImage].filter(Boolean) as string[],
    }));
}

export function staticPageUrls() {
  return [
    { loc: absoluteUrl("/"), priority: 1, changefreq: "weekly" },
    { loc: absoluteUrl("/kashmir-tour-packages"), priority: 0.9, changefreq: "weekly" },
    { loc: absoluteUrl("/travel-blog"), priority: 0.75, changefreq: "weekly" },
    { loc: absoluteUrl("/about"), priority: 0.5, changefreq: "monthly" },
    { loc: absoluteUrl("/contact"), priority: 0.6, changefreq: "monthly" },
  ];
}
