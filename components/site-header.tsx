"use client";

import Link from "next/link";
import { HeaderAuthButton } from "@/components/header-auth-button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";

export function SiteHeader() {
  const { translations } = useLanguage();
  const { header, brandCopy } = translations;

  const navItems = [
    { href: "/#categories", label: header.quickSearch },
    { href: "/submit-skills", label: header.submit },
    { href: "/#faq", label: header.faq },
  ];

  return (
    <header className="site-shell sticky top-0 z-50 pt-5">
      <div className="header-shell">
        <Link href="/" className="header-brand">
          <div className="header-brand-mark">
            OC
          </div>
          <div className="min-w-0">
            <p className="header-brand-title">
              OpenClaw Skills for Authors
            </p>
            <p className="header-brand-copy">
              {brandCopy}
            </p>
          </div>
        </Link>

        <nav className="header-nav ml-auto hidden md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="header-nav-link">
              {item.label}
            </Link>
          ))}
          <LanguageSwitcher />
          <HeaderAuthButton />
        </nav>
      </div>
    </header>
  );
}
