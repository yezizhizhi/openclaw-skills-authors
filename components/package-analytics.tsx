"use client";

import { useEffect } from "react";

type PackageAnalyticsProps = {
  packageId: string;
  packageSlug: string;
};

export function PackageAnalytics({ packageId, packageSlug }: PackageAnalyticsProps) {
  useEffect(() => {
    void fetch("/api/track/package", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        packageId,
        packageSlug,
        eventType: "detail_view",
      }),
      keepalive: true,
    }).catch(() => {});
  }, [packageId, packageSlug]);

  return null;
}
