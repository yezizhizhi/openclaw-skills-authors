"use client";

import Link from "next/link";
import { CategorySkillExplorer } from "@/components/category-skill-explorer";
import { useLanguage } from "@/components/language-provider";
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
  const { translations } = useLanguage();
  const { home, categories, categoryData, skillWorkflows, skillDescriptions } = translations;
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
              按需求搜索 Skills
            </Link>
            <Link href="#workflow-packs" className="secondary-button">
              下载整套 Workflow
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
          <h2 className="section-title">路径 A：按需求搜索单个 Skill</h2>
          <p className="section-copy">适合已经知道自己卡在哪一步的人。输入你的任务环节，直接找到对应 skill，然后跳去 ClawHub 或来源页单独使用。</p>
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
          <h2 className="section-title">路径 B：直接下载整套 Workflow Pack</h2>
          <p className="section-copy">
            如果你不是只缺一个 skill，而是想从这个分类下直接拿走整套流程，可以直接下载已经编排好的 workflow 包。
          </p>
        </div>

        {workflowPackages.length ? (
          <div className="grid gap-4 mt-8 md:grid-cols-2">
            {workflowPackages.map((item) => (
              <article key={item.id} className="category-skill-card">
                <div>
                  <p className="category-card-label">Workflow Pack</p>
                  <h3 className="category-skill-title">{item.name}</h3>
                </div>

                <div className="category-skill-block">
                  <p className="category-skill-scene">
                    {item.templateName} / {item.steps.length} steps
                  </p>
                </div>

                <p className="category-skill-copy">{item.description}</p>

                <div className="mt-4 flex gap-3">
                  <Link href={`/workflow-packages/${item.slug}`} className="secondary-button category-skill-button">
                    查看 Package
                  </Link>
                  <Link href={`/api/workflow-packages/${item.slug}/download`} className="primary-button category-skill-button">
                    下载整套 Workflow
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="category-skill-card mt-8">
            <p className="category-skill-copy">
              这一类的 workflow 包还在编排中。当前你仍然可以先通过上面的搜索区找到单个 skills。
            </p>
          </div>
        )}
      </section>

      <section className="site-shell section-gap" id="featured-skills">
        <div className="section-heading centered category-search-heading">
          <h2 className="section-title">{home.spotlightTitle}</h2>
          <p className="section-copy">如果你更想自己挑单个 skill，而不是直接拿整套 workflow，可以从这里继续选。</p>
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
