"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { categories, editorChoices } from "@/lib/site-data";
import { useLanguage } from "@/components/language-provider";
import { getHomeActionLabels } from "@/lib/i18n";
import type { HomeCategoryKey } from "@/lib/i18n";

export default function HomePage() {
  const { language, translations } = useLanguage();
  const {
    home,
    categoryChips,
    categories: transCategories,
    skillWorkflows,
    skillDescriptions,
  } = translations;
  const homeLabels = getHomeActionLabels(language);

  const featuredCategory = categories[0];
  const sideCategories = categories.slice(1);
  const categoryCards = [featuredCategory, ...sideCategories];
  const spotlightSkills = editorChoices
    .filter((skill) => skill.sourceUrl)
    .slice(0, 3)
    .map((skill) => ({
      name: skill.name,
      scene: skillDescriptions[skill.name] || skill.description,
      tags: [
        skill.badge ?? (categoryChips[featuredCategory.slug as keyof typeof categoryChips] || "Featured"),
        skillWorkflows[skill.workflow] || skill.workflow,
        home.spotlightCta.replace(" ↗", ""),
      ],
      href: skill.sourceUrl as string,
    }));

  return (
    <main className="pb-24">
      <section className="site-shell pt-8 md:pt-12">
        <div className="hero-center">
          <h1 className="display-title hero-headline">{home.heroTitle}</h1>
          <h2 className="hero-subheadline">
            {home.heroSubheadlineLine1}
            {home.heroSubheadlineLine2 ? (
              <>
                <br />
                {home.heroSubheadlineLine2}
              </>
            ) : null}
          </h2>
          <h3 className="hero-copy hero-copy-lg">{home.heroCopy}</h3>

          <div className="hero-actions">
            <Link href="/search-skills" className="primary-button">
              {homeLabels.findSingle}
            </Link>
            <Link href="/workflow-packages" className="secondary-button">
              {homeLabels.downloadPack}
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
          {categoryCards.map((category, index) => (
            <article
              key={category.slug}
              className={index === 0 ? "category-hero-card" : "compact-category-card"}
            >
              <div>
                <h3 className="compact-category-title">{transCategories[category.slug as HomeCategoryKey].title}</h3>
                <p className="compact-category-subtitle">{transCategories[category.slug as HomeCategoryKey].subtitle}</p>
              </div>
              <p className="compact-category-copy">{transCategories[category.slug as HomeCategoryKey].copy}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/categories/${category.slug}/packages`}
                  className="primary-button category-card-button"
                >
                  {homeLabels.browsePackages}
                </Link>
                <Link
                  href={`/categories/${category.slug}#search-skills`}
                  className="secondary-button category-card-button"
                >
                  {homeLabels.searchSingle}
                </Link>
              </div>
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
                <p className="spotlight-scene">{skill.scene.replace(/^适用场景：\s*/, "").replace(/^Ideal for:?\s*/i, "").trim()}</p>
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
