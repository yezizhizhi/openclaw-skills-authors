"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { categories, editorChoices } from "@/lib/site-data";
import { useLanguage } from "@/components/language-provider";
import type { HomeCategoryKey } from "@/lib/i18n";

export default function HomePage() {
  const { translations } = useLanguage();
  const { home, categoryChips, categories: transCategories } = translations;

  const featuredCategory = categories[0];
  const sideCategories = categories.slice(1);
  const spotlightSkills = editorChoices
    .filter((skill) => skill.sourceUrl)
    .slice(0, 3)
    .map((skill) => ({
      name: skill.name,
      scene: skill.description,
      tags: [skill.badge ?? (categoryChips[featuredCategory.slug as keyof typeof categoryChips] || "精选" as const), skill.workflow, "可直达 ClawHub"],
      href: skill.sourceUrl as string,
    }));

  return (
    <main className="pb-24">
      <section className="site-shell pt-10 md:pt-16">
        <div className="hero-center">
          <h1 className="display-title hero-headline">{home.heroTitle}</h1>
          <h2 className="hero-subheadline">
            {home.heroSubheadlineLine1}
            <br />
            {home.heroSubheadlineLine2}
          </h2>
          <h3 className="hero-copy hero-copy-lg">{home.heroCopy}</h3>

          <div className="hero-actions">
            <Link href="/#categories" className="primary-button">
              {home.browseAll}
            </Link>
            <Link href="/install-guide" className="secondary-button">
              {home.installGuide}
            </Link>
          </div>

          <div className="hero-chip-row">
            {categories.map((category) => (
              <Link key={category.slug} href={`/categories/${category.slug}`} className="chip-link">
                {categoryChips[category.slug as keyof typeof categoryChips]}
              </Link>
            ))}
          </div>
        </div>

      </section>

      <section className="site-shell section-gap" id="categories">
        <SectionHeading
          title={home.categoriesTitle}
          description={home.categoriesDescription}
          centered
        />

        <div className="category-grid mt-8">
          <article className="category-hero-card">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="preview-title">{transCategories[featuredCategory.slug as HomeCategoryKey].title}</h2>
              </div>
            </div>
            <p className="mt-4 text-[15px] leading-8 text-[var(--muted-ink)]">
              {transCategories[featuredCategory.slug as HomeCategoryKey].subtitle}
            </p>
            <p className="mt-4 text-[15px] leading-8 text-[var(--muted-ink)]">
              {transCategories[featuredCategory.slug as HomeCategoryKey].copy}
            </p>
            <div className="mt-6">
              <Link
                href={`/categories/${featuredCategory.slug}`}
                className="primary-button category-card-button"
              >
                {home.categoryButton}
              </Link>
            </div>
          </article>

          {sideCategories.map((category) => (
            <article key={category.slug} className="compact-category-card">
              <div>
                <h3 className="compact-category-title">{transCategories[category.slug as HomeCategoryKey].title}</h3>
                <p className="compact-category-subtitle">{transCategories[category.slug as HomeCategoryKey].subtitle}</p>
              </div>
              <p className="compact-category-copy">{transCategories[category.slug as HomeCategoryKey].copy}</p>
              <Link
                href={`/categories/${category.slug}`}
                className="primary-button category-card-button"
              >
                {home.categoryButton}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="site-shell section-gap">
        <SectionHeading
          title={home.spotlightTitle}
          description={home.spotlightDescription}
          centered
        />

        <div className="spotlight-grid mt-8">
          {spotlightSkills.map((skill) => (
            <article key={skill.name} className="spotlight-card">
              <div>
                <p className="spotlight-label">{home.spotlightName}</p>
                <h3 className="spotlight-title">{skill.name}</h3>
              </div>

              <div className="spotlight-block">
                <p className="spotlight-label">{home.spotlightScene}</p>
                <p className="spotlight-scene">{skill.scene.replace("适用场景：", "").trim()}</p>
              </div>

              <div className="spotlight-block">
                <p className="spotlight-label">{home.spotlightTags}</p>
                <div className="spotlight-tags">
                  {skill.tags.map((tag) => (
                    <span key={tag} className="spotlight-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={skill.href}
                target="_blank"
                rel="noreferrer noopener"
                className="primary-button spotlight-button"
              >
                {home.spotlightCta}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="site-shell section-gap">
        <div className="section-heading centered reason-heading">
          <h2 className="section-title">{home.reasonsTitle}</h2>
        </div>

        <div className="reason-grid mt-8">
          {home.reasons.map((card) => (
            <article key={card.title} className="reason-card">
              <h3 className="reason-title">{card.title}</h3>
              <p className="reason-copy">{card.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-shell section-gap" id="faq">
        <div className="section-heading centered faq-heading">
          <h2 className="section-title">{home.faqTitle}</h2>
          <p className="section-description">{home.faqDescription}</p>
        </div>

        <div className="faq-list mt-8">
          {home.faqItems.map((item, index) => (
            <details key={item.question} className="faq-item">
              <summary className="faq-summary">
                <span className="faq-label">Q{index + 1}</span>
                <span className="faq-question">{item.question}</span>
                <span className="faq-toggle" aria-hidden="true" />
              </summary>

              <div className="faq-answer-wrap">
                <p className="faq-label faq-answer-label">A{index + 1}</p>
                <p className="faq-answer">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
