import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { TermsClient } from "./terms-client";

export const metadata: Metadata = {
  title: "Terms of Service | OpenClaw Skills for Authors",
  description:
    "Terms and conditions for using OpenClaw Skills for Authors.",
  alternates: {
    canonical: `${getSiteUrl()}/terms`,
  },
  openGraph: {
    title: "Terms of Service | OpenClaw Skills for Authors",
    description:
      "Terms and conditions for using OpenClaw Skills for Authors.",
    url: `${getSiteUrl()}/terms`,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "OpenClaw Terms of Service",
      },
    ],
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
