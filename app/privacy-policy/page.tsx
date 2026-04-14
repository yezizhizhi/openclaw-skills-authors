import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { PrivacyPolicyClient } from "./privacy-policy-client";

export const metadata: Metadata = {
  title: "Privacy Policy | OpenClaw Skills for Authors",
  description:
    "Learn how OpenClaw Skills for Authors collects, uses, and protects your personal information.",
  alternates: {
    canonical: `${getSiteUrl()}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy | OpenClaw Skills for Authors",
    description:
      "Learn how OpenClaw Skills for Authors collects, uses, and protects your personal information.",
    url: `${getSiteUrl()}/privacy-policy`,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "OpenClaw Privacy Policy",
      },
    ],
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
