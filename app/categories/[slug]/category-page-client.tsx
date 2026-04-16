"use client";

import Link from "next/link";
import { CategorySkillExplorer } from "@/components/category-skill-explorer";
import { useLanguage } from "@/components/language-provider";
import { getCategoryPageLabels } from "@/lib/i18n";
import type { Category } from "@/lib/site-data";
import type { CategoryExplorerData } from "@/lib/skill-search";
import type { WorkflowPackageDetail } from "@/lib/workflow-packages";

type CategoryPageClientProps = {
  category: Category;
  workflowTags: string[];
  explorerScenarios: CategoryExplorerData["scenarios"];
  explorerSkills: CategoryExplorerData["skills"];
  workflowPackages: WorkflowPackageDetail[];
};

export function CategoryPageClient({
  category,
  workflowTags: originalWorkflowTags,
  explorerScenarios,
  explorerSkills,
  workflowPackages,
}: CategoryPageClientProps) {
  const { language, translations } = useLanguage();
  const { home, categories, categoryData, skillWorkflows, skillDescriptions } = translations;
  const slug = category.slug as keyof typeof categories;
  const labels = getCategoryPageLabels(language);

  // Get translated workflow tags, fallback to original if not available
  const translatedWorkflowTags = categoryData[slug]?.workflowTags?.length
    ? categoryData[slug].workflowTags
    : originalWorkflowTags;

  return (
    <main className="pb-24">
      <section className="site-shell category-page-shell pt-8 md:pt-12">
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
            <Link href={`/categories/${category.slug}/packages`} className="primary-button">
              {labels.browsePackages}
            </Link>
            <Link href="#search-skills" className="secondary-button">
              {labels.searchSingle}
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
          <h2 className="section-title">{labels.pathA}</h2>
          <p className="section-copy">{labels.pathACopy}</p>
        </div>

        <div className="mt-8">
          <CategorySkillExplorer
            categorySlug={category.slug}
            categoryLabel={categories[slug].title}
            workflowTags={originalWorkflowTags}
            scenarios={explorerScenarios}
            skills={explorerSkills}
          />
        </div>
      </section>

      <section className="site-shell section-gap" id="workflow-packs">
        <div className="section-heading centered category-search-heading">
          <h2 className="section-title">{labels.pathB}</h2>
          <p className="section-copy">{labels.pathBCopy}</p>
        </div>

        {workflowPackages.length ? (
          <div className="grid gap-4 mt-8 md:grid-cols-2">
            {workflowPackages.map((item) => (
              <article key={item.id} className="category-skill-card">
                <div>
                  <p className="category-card-label">{labels.workflowPack}</p>
                  <h3 className="category-skill-title">{item.name}</h3>
                </div>

                <div className="category-skill-block">
                  <p className="category-skill-scene">
                    {item.templateName} / {item.steps.length} steps
                  </p>
                </div>

                <p className="category-skill-copy">{item.description}</p>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <div className="rounded-[16px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--accent-soft)]">{labels.forWho}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--soft-ink)]">{item.audience}</p>
                  </div>
                  <div className="rounded-[16px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--accent-soft)]">{labels.liveSources}</p>
                    <p className="mt-2 text-xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">
                      {item.steps.filter((step) => Boolean(step.selectedSkill.sourceUrl)).length}
                    </p>
                    <p className="text-sm text-[var(--muted-ink)]">{labels.stepUnit}</p>
                  </div>
                  <div className="rounded-[16px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--accent-soft)]">{labels.startStep}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--soft-ink)]">{item.steps[0]?.stepName || labels.viewDetail}</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <Link href={`/workflow-packages/${item.slug}`} className="primary-button category-skill-button">
                    {labels.viewPack}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="category-skill-card mt-8">
            <p className="category-skill-copy">{labels.fallback}</p>
          </div>
        )}
      </section>

      <section className="site-shell section-gap" id="featured-skills">
        <div className="section-heading centered category-search-heading">
          <h2 className="section-title">{home.spotlightTitle}</h2>
          <p className="section-copy">{labels.moreSingles}</p>
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

              <p className="category-skill-copy">{skillDescriptions[skill.name] || skill.description}</p>

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
