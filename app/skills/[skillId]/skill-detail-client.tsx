"use client";

import Link from "next/link";
import { CopyConfigButton } from "@/components/copy-config-button";
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

  return (
    <main className="pb-24">
      <section className="site-shell skill-detail-shell pt-10 md:pt-16">
        <div className="hero-center skill-detail-hero">
          <div className="breadcrumb-row skill-detail-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href={`/categories/${skill.categorySlug}`}>{skill.categoryLabel}</Link>
            <span>/</span>
            <span>{skill.name}</span>
          </div>

          <h1 className="display-title skill-detail-title">{skill.name}</h1>
          <h2 className="skill-detail-subtitle">
            {skill.categoryLabel} / {skill.workflow}
          </h2>
          <p className="hero-copy hero-copy-lg skill-detail-copy">{skill.description}</p>

          <div className="hero-actions">
            <CopyConfigButton
              configSnippet={openClawPrompt}
              idleLabel={home.spotlightCta}
              successLabel={home.spotlightCta}
            />
            <Link href="/install-guide" className="secondary-button skill-detail-button">
              {home.installGuide}
            </Link>
            {stableSourceLink ? (
              <a
                href={stableSourceLink}
                target="_blank"
                rel="noreferrer noopener"
                className="secondary-button skill-detail-button"
              >
                {home.spotlightCta}
              </a>
            ) : null}
          </div>

          <div className="hero-chip-row skill-detail-chip-row">
            {skill.scenarioNames.length
              ? skill.scenarioNames.map((scenario) => (
                  <span key={scenario} className="chip-link">
                    {scenario}
                  </span>
                ))
              : skill.workflowTags.map((tag) => (
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
              {skill.categoryLabel}
              {skill.scenarioNames.length ? ` ${skill.scenarioNames.join(", ")} ` : ` ${skill.workflow} `}
            </p>
            <div className="skill-detail-tag-row">
              {skill.tags.map((tag) => (
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
