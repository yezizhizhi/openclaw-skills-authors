import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LanguageProvider } from "@/components/language-provider";
import { getSiteUrl } from "@/lib/site-url";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "OpenClaw: Discover Structured AI Workflows for Authors and Writers",
    template: "%s | OpenClaw",
  },
  description:
    "A curated library of OpenClaw Skills designed for authors, writers, researchers, and course creators. Find AI workflows for book writing, articles, copywriting, reports, academic papers, and course creation.",
  keywords: [
    "OpenClaw Skills for Authors",
    "OpenClaw Skills",
    "AI skills for writers",
    "writing workflow skills",
    "AI writing tools",
    "book writing AI",
    "content creation AI",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: getSiteUrl(),
    siteName: "OpenClaw",
    title: "OpenClaw: Discover Structured AI Workflows for Authors and Writers",
    description:
      "A curated library of OpenClaw Skills for authors, writers, and content creators. Find the right AI workflow for your writing projects.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "OpenClaw Skills for Authors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenClaw: Discover Structured AI Workflows for Authors and Writers",
    description:
      "A curated library of OpenClaw Skills for authors, writers, and content creators.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${manrope.variable} ${sourceSerif.variable} h-full scroll-smooth antialiased`}
    >
      <body className="site-body min-h-full">
        <LanguageProvider>
          <div className="site-chrome min-h-full">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
