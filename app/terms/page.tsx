import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { TermsClient } from "./terms-client";

export const metadata: Metadata = {
  title: "服务条款 | OpenClaw Skills for Authors",
  description:
    "使用 OpenClaw Skills for Authors 的服务条款和条件。",
  alternates: {
    canonical: `${getSiteUrl()}/terms`,
  },
  openGraph: {
    title: "服务条款 | OpenClaw Skills for Authors",
    description:
      "使用 OpenClaw Skills for Authors 的服务条款和条件。",
    url: `${getSiteUrl()}/terms`,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "OpenClaw 服务条款",
      },
    ],
  },
};

export default function TermsPage() {
  return <TermsClient />;
}