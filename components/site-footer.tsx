"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function SiteFooter() {
  const { translations } = useLanguage();
  const { footer } = translations;

  return (
    <footer className="site-shell pb-8 pt-16">
      <div className="footer-shell px-6 py-8 md:px-8">
        <div className="flex flex-col items-center gap-4 text-sm text-[var(--soft-ink)] sm:flex-row sm:gap-6">
          <Link href="/privacy-policy" className="transition hover:text-[var(--accent)]">
            {footer.privacy}
          </Link>
          <Link href="/terms" className="transition hover:text-[var(--accent)]">
            {footer.terms}
          </Link>
        </div>
      </div>
    </footer>
  );
}
