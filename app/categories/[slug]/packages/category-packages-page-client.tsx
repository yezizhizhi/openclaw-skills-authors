"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { TrackedLink } from "@/components/tracked-link";
import { useLanguage } from "@/components/language-provider";
import { getPackageLabels, type HomeCategoryKey } from "@/lib/i18n";
import type { Category } from "@/lib/site-data";
import type { WorkflowPackageDetail } from "@/lib/workflow-packages";

export function CategoryPackagesPageClient({
  category,
  workflowPackages,
}: {
  category: Category;
  workflowPackages: WorkflowPackageDetail[];
}) {
  const { language, translations } = useLanguage();
  const packageLabels = getPackageLabels(language);
  const slug = category.slug as HomeCategoryKey;
  const categoryTitle = translations.categories[slug]?.title || category.heroTitle;
  const translatedWorkflowTags = translations.categoryData[slug]?.workflowTags?.length
    ? translations.categoryData[slug].workflowTags
    : category.workflowTags;
  const featuredPackage = workflowPackages[0];

  return (
    <main className="pb-24">
      <section className="site-shell pt-10 md:pt-16">
        <div className="hero-center">
          <div className="breadcrumb-row skill-detail-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href={`/categories/${category.slug}`}>{categoryTitle}</Link>
            <span>/</span>
            <span>{packageLabels.categoryBreadcrumb}</span>
          </div>

          <h1 className="display-title hero-headline">{categoryTitle} {packageLabels.categoryHeroTitleSuffix}</h1>
          <h2 className="hero-subheadline">{packageLabels.categoryHeroSubtitle}</h2>
          <p className="hero-copy hero-copy-lg">{packageLabels.categoryHeroCopy}</p>

          <div className="hero-actions">
            <Link href={`/categories/${category.slug}#search-skills`} className="secondary-button">
              {packageLabels.categorySearchSkills}
            </Link>
            <Link href={`/categories/${category.slug}`} className="secondary-button">
              {packageLabels.categoryBackTo} {categoryTitle}
            </Link>
          </div>

          <div className="hero-chip-row">
            {translatedWorkflowTags.map((tag) => (
              <span key={tag} className="chip-link">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {featuredPackage ? (
        <section className="site-shell section-gap">
          <div className="rounded-[28px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,98,76,0.10),rgba(255,255,255,0.02))] p-8">
            <SectionHeading eyebrow={packageLabels.categoryStartHere} title={packageLabels.categoryFeaturedTitle} description={packageLabels.categoryFeaturedDescription} />
            <div className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_0.8fr]">
              <article className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-soft)]">{packageLabels.categoryRecommendedFirst}</p>
                <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.05em] text-[var(--ink)]">{featuredPackage.name}</h2>
                <p className="mt-4 text-base leading-8 text-[var(--soft-ink)]">{featuredPackage.description}</p>
                <div className="mt-5 rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-soft)]">{packageLabels.categoryPurpose}</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--soft-ink)]">{featuredPackage.goal}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={`/categories/${category.slug}/packages/${featuredPackage.slug}`} className="primary-button">{packageLabels.categoryOpenPackage}</Link>
                  <TrackedLink href={`/api/workflow-packages/${featuredPackage.slug}/download`} className="secondary-button" trackingPath="/api/track/package" trackingPayload={{ packageId: featuredPackage.id, packageSlug: featuredPackage.slug, eventType: "download" }}>
                    {packageLabels.categoryDownloadPackage}
                  </TrackedLink>
                </div>
              </article>
              <article className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-soft)]">{packageLabels.categoryInsideBundle}</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--soft-ink)]">
                  <li>{featuredPackage.steps.length} {packageLabels.categoryOrderedSteps}</li>
                  <li>{featuredPackage.steps.filter((step) => Boolean(step.selectedSkill.sourceUrl)).length} {packageLabels.categoryDirectSources}</li>
                  <li>{packageLabels.categoryGuideAndManifest}</li>
                  <li>{packageLabels.categorySuggestedOrder}</li>
                </ul>
              </article>
            </div>
          </div>
        </section>
      ) : null}

      <section className="site-shell section-gap">
        <SectionHeading eyebrow={packageLabels.categoryBrowse} title={packageLabels.categoryAvailableTitle} description={packageLabels.categoryAvailableDescription} centered />
        {workflowPackages.length ? (
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {workflowPackages.map((item) => (
              <article key={item.id} className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow)]">
                <div className="flex items-center justify-between gap-4">
                  <span className="eyebrow">{item.templateName}</span>
                  <span className="text-sm text-[var(--muted-ink)]">{item.version}</span>
                </div>
                <h3 className="mt-5 text-2xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">{item.name}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--soft-ink)]">{item.description}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-soft)]">{packageLabels.listBestFor}</p>
                    <p className="mt-2 text-sm leading-7 text-[var(--soft-ink)]">{item.audience}</p>
                  </div>
                  <div className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-soft)]">{packageLabels.listSteps}</p>
                    <p className="mt-2 text-2xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">{item.steps.length}</p>
                  </div>
                  <div className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-soft)]">{packageLabels.categoryGoal}</p>
                    <p className="mt-2 text-sm leading-7 text-[var(--soft-ink)]">{item.goal}</p>
                  </div>
                </div>
                <div className="mt-5 rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-soft)]">{packageLabels.categoryWhatYouGet}</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--soft-ink)]">{packageLabels.categoryWhatYouGetCopy}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={`/categories/${category.slug}/packages/${item.slug}`} className="primary-button">{packageLabels.listViewPackage}</Link>
                  <TrackedLink href={`/api/workflow-packages/${item.slug}/download`} className="secondary-button" trackingPath="/api/track/package" trackingPayload={{ packageId: item.id, packageSlug: item.slug, eventType: "download" }}>
                    {packageLabels.categoryDownloadPackage}
                  </TrackedLink>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-8 text-center">
            <h3 className="text-2xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">{packageLabels.categoryEmptyTitle}</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--soft-ink)]">{packageLabels.categoryEmptyCopy}</p>
            <div className="mt-6">
              <Link href={`/categories/${category.slug}#search-skills`} className="primary-button">{packageLabels.categorySearchSkills}</Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
