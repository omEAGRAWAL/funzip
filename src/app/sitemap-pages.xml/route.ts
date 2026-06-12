import { staticPageUrls, urlset, xmlResponse } from "@/lib/sitemap";

export async function GET() {
  return xmlResponse(urlset(staticPageUrls()));
}
