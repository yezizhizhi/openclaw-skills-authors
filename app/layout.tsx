import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
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
    default: "OpenClaw Skills for Authors",
    template: "%s | OpenClaw Skills for Authors",
  },
  description:
    "A paper-and-glass landing site prototype for OpenClaw Skills, organized for authors, writers, researchers, and course creators.",
  keywords: [
    "openclaw skills for authors",
    "openclaw skills",
    "ai skills for writers",
    "writing workflow skills",
  ],
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
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
