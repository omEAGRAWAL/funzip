import { itineraryUrls, urlset, xmlResponse } from "@/lib/sitemap";

export async function GET() {
  return xmlResponse(urlset(await itineraryUrls()));
}
