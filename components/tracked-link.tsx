"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  trackingPath: "/api/track/skill" | "/api/track/package";
  trackingPayload: Record<string, unknown>;
};

export function TrackedLink({
  trackingPath,
  trackingPayload,
  onClick,
  ...props
}: TrackedLinkProps) {
  async function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    try {
      void fetch(trackingPath, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trackingPayload),
        keepalive: true,
      });
    } catch {
      // Analytics should never block navigation.
    }
  }

  return <a {...props} onClick={handleClick} />;
}
