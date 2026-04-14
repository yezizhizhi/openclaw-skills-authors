import type { Metadata } from "next";
import { InstallGuideContent } from "@/components/install-guide-content";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Installation Guide | OpenClaw Skills for Authors",
  description:
    "Learn how to find the right AI writing skill on OpenClaw in three steps: choose a category, search by workflow, and install directly.",
  alternates: {
    canonical: `${getSiteUrl()}/install-guide`,
  },
  openGraph: {
    title: "Installation Guide | OpenClaw Skills for Authors",
    description:
      "Learn how to find the right AI writing skill on OpenClaw in three steps: choose a category, search by workflow, and install directly.",
    url: `${getSiteUrl()}/install-guide`,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "OpenClaw Installation Guide",
      },
    ],
  },
};

export default function InstallGuidePage() {
  return <InstallGuideContent />;
}
