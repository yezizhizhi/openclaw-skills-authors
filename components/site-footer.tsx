"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function SiteFooter() {
  const { translations } = useLanguage();
  const { home } = translations;

  return (
    <footer className="site-shell pb-8 pt-16">
      <div className="footer-shell px-6 py-8 md:px-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-[var(--accent-ink)]">
              OPENCLAW SKILLS FOR AUTHORS
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted-ink)]">
              {home.faqDescription}
            </p>
          </div>

          <div className="grid gap-3 text-sm text-[var(--soft-ink)] sm:grid-cols-2">
            <Link href="/" className="transition hover:text-[var(--accent)]">
              {home.faqTitle}
            </Link>
            <Link href="/#categories" className="transition hover:text-[var(--accent)]">
              {home.categoriesTitle}
            </Link>
            <Link href="/categories/books" className="transition hover:text-[var(--accent)]">
              {home.spotlightTitle}
            </Link>
            <Link href="/privacy-policy" className="transition hover:text-[var(--accent)]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-[var(--accent)]">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
