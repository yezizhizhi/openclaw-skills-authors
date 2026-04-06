"use client";

import { useLanguage } from "@/components/language-provider";

export default function PrivacyPolicyPage() {
  const { translations } = useLanguage();
  const { footer, legal } = translations;
  if (!legal) return null;

  return (
    <main className="pb-24">
      <section className="site-shell pt-10 md:pt-16">
        <div className="max-w-3xl">
          <h1 className="display-title hero-headline">{footer.privacy}</h1>
          <p className="hero-copy mt-4 text-[var(--muted-ink)]">
            {legal.privacyPolicy.lastUpdated}
          </p>
        </div>
      </section>

      <section className="site-shell section-gap">
        <div className="max-w-3xl prose prose-invert">
          {legal.privacyPolicy.sections.map((section, index) => (
            <div key={index}>
              <h2>{`${index + 1}. ${section.title}`}</h2>
              {Array.isArray(section.content) ? (
                <ul>
                  {section.content.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{section.content}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
