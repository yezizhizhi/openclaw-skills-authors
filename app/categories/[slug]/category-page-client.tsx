"use client";

import Link from "next/link";
import { CategorySkillExplorer } from "@/components/category-skill-explorer";
import { useLanguage } from "@/components/language-provider";
import type { Category } from "@/lib/site-data";
import type { CategoryExplorerData } from "@/lib/skill-search";

type CategoryPageClientProps = {
  category: Category;
  workflowTags: string[];
  explorerScenarios: CategoryExplorerData["scenarios"];
  explorerSkills: CategoryExplorerData["skills"];
};

export function CategoryPageClient({
  category,
  workflowTags: originalWorkflowTags,
  explorerScenarios,
  explorerSkills,
}: CategoryPageClientProps) {
  const { translations, language } = useLanguage();
  const { home, categories, categoryData, skillWorkflows } = translations;
  const slug = category.slug as keyof typeof categories;

  // Get translated workflow tags, fallback to original if not available
  const translatedWorkflowTags = categoryData[slug]?.workflowTags?.length
    ? categoryData[slug].workflowTags
    : originalWorkflowTags;

  return (
    <main className="pb-24">
      <section className="site-shell category-page-shell pt-10 md:pt-16">
        <div className="hero-center category-page-hero">
          <h1 className="display-title hero-headline category-page-title">
            {categories[slug].title}
          </h1>
          <h2 className="hero-subheadline category-page-subtitle">
            {categories[slug].subtitle}
          </h2>
          <h3 className="hero-copy hero-copy-lg category-page-copy">
            {categories[slug].copy}
          </h3>

          <div className="hero-actions">
            <Link href="#search-skills" className="primary-button">
              {home.browseAll}
            </Link>
            <Link href="#featured-skills" className="secondary-button">
              {home.spotlightTitle}
            </Link>
          </div>

          <div className="hero-chip-row category-flow-row">
            {translatedWorkflowTags.map((tag, index) => (
              <span key={`${tag}-${index}`} className="chip-link category-flow-chip">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="site-shell category-search-section section-gap" id="search-skills">
        <div className="section-heading centered category-search-heading">
          <h2 className="section-title">{home.categoriesTitle}</h2>
          <p className="section-copy">{home.categoriesDescription}</p>
        </div>

        <div className="mt-8">
          <CategorySkillExplorer
            categorySlug={category.slug}
            categoryLabel={categories[slug].title}
            workflowTags={translatedWorkflowTags}
            scenarios={explorerScenarios}
            skills={explorerSkills}
          />
        </div>
      </section>

      <section className="site-shell section-gap" id="featured-skills">
        <div className="section-heading centered category-search-heading">
          <h2 className="section-title">{home.spotlightTitle}</h2>
          <p className="section-copy">{home.spotlightDescription}</p>
        </div>

        <div className="grid gap-4 mt-8 md:grid-cols-3">
          {category.featuredSkills.map((skill) => (
            <article key={skill.name} className="category-skill-card">
              <div>
                <p className="category-card-label">{home.spotlightTitle}</p>
                <h3 className="category-skill-title">{skill.name}</h3>
              </div>

              <div className="category-skill-block">
                <p className="category-skill-scene">
                  {categories[slug].title} / {skillWorkflows[skill.workflow] || skill.workflow}
                </p>
              </div>

              <p className="category-skill-copy">{skill.description}</p>

              {skill.sourceUrl ? (
                <a
                  href={skill.sourceUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="primary-button category-skill-button"
                >
                  {home.spotlightCta}
                </a>
              ) : (
                <Link
                  href={`/skills/${category.slug}-${skill.name
                    .toLowerCase()
                    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
                    .replace(/^-+|-+$/g, "")}`}
                  className="secondary-button category-skill-button"
                >
                  {home.spotlightCta}
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
