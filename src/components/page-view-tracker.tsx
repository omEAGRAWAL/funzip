"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const controller = new AbortController();
    const payload = {
      path: pathname,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      device: `${navigator.platform} ${window.innerWidth}x${window.innerHeight}`,
      utmSource: searchParams.get("utm_source"),
      utmMedium: searchParams.get("utm_medium"),
      utmCampaign: searchParams.get("utm_campaign"),
    };

    fetch("/api/page-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    }).catch(() => {});

    return () => controller.abort();
  }, [pathname, searchParams]);

  return null;
}
