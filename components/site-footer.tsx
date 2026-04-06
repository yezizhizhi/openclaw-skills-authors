"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function SiteFooter() {
  const { translations } = useLanguage();
  const { footer } = translations;

  return (
    <footer className="site-shell pb-8 pt-16">
      <div className="footer-shell px-6 py-8 md:px-8">
        <div className="flex flex-row items-center justify-center gap-6 text-sm text-[var(--soft-ink)]">
          <Link href="/privacy-policy" className="transition hover:text-[var(--accent)]">
            {footer.privacy}
          </Link>
          <span className="text-[var(--muted-ink)]">|</span>
          <Link href="/terms" className="transition hover:text-[var(--accent)]">
            {footer.terms}
          </Link>
        </div>
      </div>
    </footer>
  );
}
