import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { PrivacyPolicyClient } from "./privacy-policy-client";

export const metadata: Metadata = {
  title: "隐私政策 | OpenClaw Skills for Authors",
  description:
    "了解 OpenClaw Skills for Authors 如何收集、使用和保护您的个人信息。",
  alternates: {
    canonical: `${getSiteUrl()}/privacy-policy`,
  },
  openGraph: {
    title: "隐私政策 | OpenClaw Skills for Authors",
    description:
      "了解 OpenClaw Skills for Authors 如何收集、使用和保护您的个人信息。",
    url: `${getSiteUrl()}/privacy-policy`,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "OpenClaw 隐私政策",
      },
    ],
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}