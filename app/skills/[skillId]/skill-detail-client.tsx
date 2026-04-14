"use client";

import Link from "next/link";
import { CopyConfigButton } from "@/components/copy-config-button";
import { TrackedLink } from "@/components/tracked-link";
import { useLanguage } from "@/components/language-provider";
import type { SkillDetail } from "@/lib/skills-repository";

type SkillDetailClientProps = {
  skill: SkillDetail;
  openClawPrompt: string;
  stableSourceLink: string | null;
};

export function SkillDetailClient({
  skill,
  openClawPrompt,
  stableSourceLink,
}: SkillDetailClientProps) {
  const { translations } = useLanguage();
  const { home } = translations;
  const categorySlug = skill.categorySlug as keyof typeof translations.categoryChips;
  const localizedCategoryLabel =
    translations.categoryChips[categorySlug] || skill.categoryLabel;
  const localizeWorkflow = (value: string) => translations.skillWorkflows[value] || value;
  const localizedDescription =
    translations.skillDescriptions[skill.name] || skill.description;
  const localizedScenarioNames = skill.scenarioNames.map(localizeWorkflow);
  const localizedWorkflowTags = skill.workflowTags.map(localizeWorkflow);
  const localizedTags = skill.tags.map((tag) => {
    const normalizedTag = tag.toLowerCase();
    if (
      normalizedTag === skill.categorySlug ||
      normalizedTag === skill.categoryLabel.toLowerCase()
    ) {
      return localizedCategoryLabel;
    }

    return localizeWorkflow(tag);
  });

  return (
    <main className="pb-24">
      <section className="site-shell skill-detail-shell pt-10 md:pt-16">
        <div className="hero-center skill-detail-hero">
          <div className="breadcrumb-row skill-detail-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href={`/categories/${skill.categorySlug}`}>{localizedCategoryLabel}</Link>
            <span>/</span>
            <span>{skill.name}</span>
          </div>

          <h1 className="display-title skill-detail-title">{skill.name}</h1>
          <h2 className="skill-detail-subtitle">
            {localizedCategoryLabel} / {localizeWorkflow(skill.workflow)}
          </h2>
          <p className="hero-copy hero-copy-lg skill-detail-copy">{localizedDescription}</p>

          <div className="hero-actions">
            <CopyConfigButton
              configSnippet={openClawPrompt}
              idleLabel={home.spotlightCta}
              successLabel={home.spotlightCta}
              trackingPayload={{
                skillId: skill.id,
                sourceType: skill.sourceUrl?.includes("clawhub.ai") ? "clawhub" : "manual",
                sourceKey: skill.id,
              }}
            />
            <Link href="/install-guide" className="secondary-button skill-detail-button">
              {home.installGuide}
            </Link>
            {stableSourceLink ? (
              <TrackedLink
                href={stableSourceLink}
                target="_blank"
                rel="noreferrer noopener"
                className="secondary-button skill-detail-button"
                trackingPath="/api/track/skill"
                trackingPayload={{
                  skillId: skill.id,
                  sourceType: skill.sourceUrl?.includes("clawhub.ai") ? "clawhub" : "manual",
                  sourceKey: skill.id,
                  eventType: "source_click",
                  metadata: {
                    sourceUrl: stableSourceLink,
                  },
                }}
              >
                {home.spotlightCta}
              </TrackedLink>
            ) : null}
          </div>

          <div className="hero-chip-row skill-detail-chip-row">
            {localizedScenarioNames.length
              ? localizedScenarioNames.map((scenario) => (
                  <span key={scenario} className="chip-link">
                    {scenario}
                  </span>
                ))
              : localizedWorkflowTags.map((tag) => (
                  <span key={tag} className="chip-link">
                    {tag}
                  </span>
                ))}
          </div>
        </div>
      </section>

      <section className="site-shell section-gap skill-detail-section">
        <div className="skill-detail-grid">
          <article className="skill-detail-card">
            <p className="skill-detail-label">{home.spotlightScene}</p>
            <h2 className="skill-detail-card-title">{home.spotlightTitle}</h2>
            <p className="skill-detail-card-copy">
              {localizedCategoryLabel}
              {localizedScenarioNames.length
                ? ` ${localizedScenarioNames.join(", ")} `
                : ` ${localizeWorkflow(skill.workflow)} `}
            </p>
            <div className="skill-detail-tag-row">
              {localizedTags.map((tag) => (
                <span key={tag} className="spotlight-tag">
                  {tag}
                </span>
              ))}
            </div>
          </article>

          <article className="skill-detail-card">
            <p className="skill-detail-label">{home.spotlightTags}</p>
            <h2 className="skill-detail-card-title">{home.spotlightTitle}</h2>
            <div className="skill-detail-models">
              {skill.models.map((model) => (
                <span key={model} className="model-pill">
                  {model}
                </span>
              ))}
            </div>
            <p className="skill-detail-card-copy">{home.categoriesDescription}</p>
          </article>

          <article className="skill-detail-card">
            <p className="skill-detail-label">{home.spotlightCta}</p>
            <h2 className="skill-detail-card-title">{home.spotlightCta}</h2>
            <pre className="skill-detail-code">
              <code>{openClawPrompt}</code>
            </pre>
          </article>
        </div>
      </section>

      <section className="site-shell section-gap skill-detail-section">
        <div className="rounded-[28px] border border-[var(--line)] bg-[var(--panel)] p-8">
          <div className="section-heading">
            <span className="eyebrow">Workflow Option</span>
            <h2 className="section-title">不只找单个 Skill，也可以直接拿整套 Workflow</h2>
            <p className="section-copy">
              如果你不是只需要这一个 skill，而是想把这个分类下的完整工作流一起拿走，可以直接去看已经编排好的 workflow packages。
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/categories/${skill.categorySlug}#workflow-packs`} className="primary-button">
              查看这个分类下的 Workflow Packs
            </Link>
            <Link href="/workflow-packages" className="secondary-button">
              浏览全部 Workflow Packs
            </Link>
          </div>
        </div>
      </section>

      <section className="site-shell section-gap skill-detail-section">
        <div className="section-heading centered">
          <h2 className="section-title">{home.categoriesTitle}</h2>
          <p className="section-copy">{home.categoriesDescription}</p>
        </div>

        <div className="skill-detail-compare-grid mt-8">
          <article className="compare-pane input">
            <p className="compare-label">{home.spotlightTitle}</p>
            <p className="compare-copy">{skill.inputPreview}</p>
          </article>

          <article className="compare-pane output">
            <p className="compare-label accent">{home.spotlightTitle}</p>
            <p className="compare-copy strong">{skill.outputPreview}</p>
          </article>
        </div>
      </section>
    </main>
  );
}
