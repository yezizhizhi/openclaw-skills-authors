"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { TrackedLink } from "@/components/tracked-link";
import { useLanguage } from "@/components/language-provider";
import { getPackageLabels } from "@/lib/i18n";
import type { WorkflowPackageDetail } from "@/lib/workflow-packages";

const categoryLabels: Record<string, { zh: string; en: string }> = {
  books: { zh: "写书", en: "Book Writing" },
  articles: { zh: "文章", en: "Articles" },
  copywriting: { zh: "文案", en: "Copywriting" },
  reports: { zh: "报告", en: "Reports" },
  academic: { zh: "学术写作", en: "Academic Writing" },
  courses: { zh: "课程制作", en: "Course Creation" },
};

function getRecommendedScene(categorySlug: string, language: "zh" | "en") {
  if (categorySlug === "articles") {
    return language === "zh"
      ? "适合想从选题判断一路走到成稿的人。"
      : "Best when you want one guided path from topic angle to finished article draft.";
  }

  if (categorySlug === "reports") {
    return language === "zh"
      ? "适合需要研究、提炼、结构化再到高层摘要的报告工作。"
      : "Best for report work that needs research, synthesis, and executive-ready output.";
  }

  if (categorySlug === "academic") {
    return language === "zh"
      ? "适合从研究问题出发，再进入文献整理和结构搭建的学术写作。"
      : "Best for research-led writing that starts with a question and moves into structured review.";
  }

  if (categorySlug === "books") {
    return language === "zh"
      ? "适合从想法成形一路推进到大纲和草稿支持的长篇项目。"
      : "Best when you want a multi-step path from idea shaping to draft support for longer work.";
  }

  return language === "zh"
    ? "适合需要整条写作路径，而不是只解决某一个孤立步骤。"
    : "Best when you need a complete writing lane instead of solving one isolated step.";
}

export function WorkflowPackagesPageClient({ packages }: { packages: WorkflowPackageDetail[] }) {
  const { language } = useLanguage();
  const packageLabels = getPackageLabels(language);
  const languageKey = language === "zh" ? "zh" : "en";

  return (
    <main className="site-shell section-gap pb-24">
      <section className="hero-center pt-6 md:pt-10">
        <h1 className="display-title hero-headline">{packageLabels.nav}</h1>
        <h2 className="hero-subheadline">{packageLabels.listTitle}</h2>
        <p className="hero-copy hero-copy-lg">{packageLabels.listDescription}</p>
        <div className="hero-actions">
          <Link href="/search-skills" className="secondary-button">
            {packageLabels.listSearchFirst}
          </Link>
        </div>
      </section>

      <section className="mt-14">
        <SectionHeading
          eyebrow="Phase 2"
          title={packageLabels.listTitle}
          description={packageLabels.listDescription}
          centered
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {packages.map((item) => {
            const firstStep = item.steps[0];
            const realSourceSkills = item.steps.filter((step) => Boolean(step.selectedSkill.sourceUrl)).length;
            const recommendedScene = getRecommendedScene(item.categorySlug, languageKey);

            return (
              <article key={item.id} className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow)]">
                <div className="flex items-center justify-between gap-4">
                  <span className="eyebrow">{categoryLabels[item.categorySlug]?.[languageKey] || item.categorySlug}</span>
                  <span className="text-sm text-[var(--muted-ink)]">{item.version}</span>
                </div>
                <h2 className="mt-5 text-2xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">{item.name}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--soft-ink)]">{item.description}</p>

                <div className="mt-5 rounded-[18px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,98,76,0.08),rgba(255,255,255,0.02))] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-soft)]">{packageLabels.listRecommendedFit}</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--soft-ink)]">{recommendedScene}</p>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-soft)]">{packageLabels.listBestFor}</p>
                    <p className="mt-2 text-sm leading-7 text-[var(--soft-ink)]">{item.audience}</p>
                  </div>
                  <div className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-soft)]">{packageLabels.listSteps}</p>
                    <p className="mt-2 text-2xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">{item.steps.length}</p>
                    <p className="text-sm text-[var(--muted-ink)]">{packageLabels.listWorkflowStages}</p>
                  </div>
                  <div className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-soft)]">{packageLabels.listLiveSourceSkills}</p>
                    <p className="mt-2 text-2xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">{realSourceSkills}</p>
                    <p className="text-sm text-[var(--muted-ink)]">{packageLabels.listLinkedSources}</p>
                  </div>
                </div>

                <div className="mt-5 space-y-2 text-sm text-[var(--muted-ink)]">
                  <p>{packageLabels.listTemplate}: {item.templateName}</p>
                  {firstStep ? <p>{packageLabels.listStartFrom}: {firstStep.stepName}</p> : null}
                </div>
                <div className="mt-6 flex gap-3">
                  <Link href={`/workflow-packages/${item.slug}`} className="primary-button">
                    {packageLabels.listViewPackage}
                  </Link>
                  <TrackedLink
                    href={`/api/workflow-packages/${item.slug}/download`}
                    className="secondary-button"
                    trackingPath="/api/track/package"
                    trackingPayload={{
                      packageId: item.id,
                      packageSlug: item.slug,
                      eventType: "download",
                    }}
                  >
                    {packageLabels.listDownload}
                  </TrackedLink>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
