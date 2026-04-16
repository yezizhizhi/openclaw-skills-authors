"use client";

import Link from "next/link";
import { PackageAnalytics } from "@/components/package-analytics";
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

function formatDate(value: string, language: "zh" | "en") {
  return new Intl.DateTimeFormat(language === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: language === "zh" ? "2-digit" : "short",
    day: "numeric",
  }).format(new Date(value));
}

export function WorkflowPackageDetailClient({ detail }: { detail: WorkflowPackageDetail }) {
  const { language } = useLanguage();
  const packageLabels = getPackageLabels(language);
  const languageKey = language === "zh" ? "zh" : "en";
  const stepsWithSource = detail.steps.filter((step) => Boolean(step.selectedSkill.sourceUrl)).length;
  const promptFileCount = detail.steps.length;
  const firstSourceStep = detail.steps.find((step) => step.selectedSkill.sourceUrl);
  const topSteps = detail.steps.slice(0, 4);
  const includedFiles = [
    "manifest.json",
    "workflow.md",
    "skills.json",
    ...detail.steps.map((step, index) => `prompts/step-${String(index + 1).padStart(2, "0")}-${step.stepKey}.md`),
  ];
  const remainingFiles = Math.max(includedFiles.length - 6, 0);
  const categoryLabel = categoryLabels[detail.categorySlug]?.[languageKey] || detail.categorySlug;

  return (
    <main className="pb-20">
      <PackageAnalytics packageId={detail.id} packageSlug={detail.slug} />
      <section className="site-shell pt-6 md:pt-10">
        <div className="mx-auto max-w-[1160px] space-y-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="rounded-[30px] border border-[rgba(255,98,76,0.14)] bg-[linear-gradient(180deg,rgba(255,98,76,0.08),rgba(255,255,255,0.02))] p-8 shadow-[var(--shadow)] md:p-10">
              <div className="inline-flex rounded-full border border-[rgba(255,98,76,0.24)] bg-[rgba(255,98,76,0.08)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent-soft)]">
                {categoryLabel}
              </div>
              <h1 className="mt-7 text-4xl font-extrabold tracking-[-0.08em] text-[var(--ink)] md:text-6xl">{detail.name}</h1>
              <p className="mt-4 text-lg font-semibold tracking-[-0.04em] text-[var(--soft-ink)] md:text-[1.35rem]">{detail.templateName}</p>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted-ink)]">{detail.description}</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] px-4 py-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--accent-soft)]">{packageLabels.detailBestFor}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--soft-ink)]">{detail.audience}</p>
                </div>
                <div className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] px-4 py-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--accent-soft)]">{packageLabels.detailWorkflow}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--soft-ink)]">{detail.goal}</p>
                </div>
                <div className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] px-4 py-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--accent-soft)]">{packageLabels.detailIncludes}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--soft-ink)]">{detail.steps.length} steps / {stepsWithSource} live sources</p>
                </div>
              </div>
            </div>

            <aside className="rounded-[30px] border border-[rgba(255,98,76,0.14)] bg-[linear-gradient(180deg,rgba(255,98,76,0.08),rgba(255,255,255,0.02))] p-7 shadow-[var(--shadow)] lg:sticky lg:top-28" id="download-package">
              <h2 className="text-2xl font-extrabold tracking-[-0.05em] text-[var(--ink)]">{detail.name}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--soft-ink)]">{detail.goal}</p>

              <div className="mt-6 space-y-3">
                <TrackedLink href={`/api/workflow-packages/${detail.slug}/download`} className="primary-button w-full justify-center" trackingPath="/api/track/package" trackingPayload={{ packageId: detail.id, packageSlug: detail.slug, eventType: "download" }}>
                  {packageLabels.detailDownloadPackage}
                </TrackedLink>
                <Link href={`/categories/${detail.categorySlug}#search-skills`} className="secondary-button w-full justify-center">
                  {packageLabels.detailSearchSkills}
                </Link>
                <Link href={`/categories/${detail.categorySlug}/packages`} className="secondary-button w-full justify-center">
                  {packageLabels.detailAllPackages}
                </Link>
              </div>

              <dl className="mt-6 space-y-3 border-t border-[var(--line)] pt-5 text-sm">
                <div className="flex items-center justify-between gap-4"><dt className="text-[var(--muted-ink)]">{packageLabels.detailVersion}</dt><dd className="text-[var(--ink)]">{detail.version}</dd></div>
                <div className="flex items-center justify-between gap-4"><dt className="text-[var(--muted-ink)]">{packageLabels.detailUpdated}</dt><dd className="text-[var(--ink)]">{formatDate(detail.updatedAt, languageKey)}</dd></div>
                <div className="flex items-center justify-between gap-4"><dt className="text-[var(--muted-ink)]">{packageLabels.detailPromptFiles}</dt><dd className="text-[var(--ink)]">{promptFileCount}</dd></div>
                <div className="flex items-center justify-between gap-4"><dt className="text-[var(--muted-ink)]">{packageLabels.detailLinkedSkills}</dt><dd className="text-[var(--ink)]">{stepsWithSource}</dd></div>
              </dl>
            </aside>
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="rounded-[26px] border border-[var(--line)] bg-[var(--panel)] p-7 md:p-8">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-soft)]">{packageLabels.detailInsidePackage}</p>
                  <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.05em] text-[var(--ink)]">{packageLabels.detailWhatYouDownload}</h3>
                </div>
                <p className="max-w-xl text-sm leading-7 text-[var(--muted-ink)]">{packageLabels.detailCompactBundle}</p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {includedFiles.slice(0, 6).map((file) => (
                  <div key={file} className="rounded-[16px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] px-4 py-4">
                    <p className="font-mono text-sm text-[var(--ink)]">{file}</p>
                  </div>
                ))}
              </div>
              {remainingFiles ? <p className="mt-4 text-sm text-[var(--muted-ink)]">{packageLabels.detailMorePromptFiles(remainingFiles)}</p> : null}
            </div>

            <div className="rounded-[26px] border border-[var(--line)] bg-[var(--panel)] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-soft)]">{packageLabels.detailLeadSource}</p>
              <p className="mt-3 text-xl font-extrabold tracking-[-0.05em] text-[var(--ink)]">{firstSourceStep?.selectedSkill.name || packageLabels.detailSourceSkill}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--soft-ink)]">{packageLabels.detailInspectSource}</p>
              {firstSourceStep?.selectedSkill.sourceUrl ? (
                <TrackedLink
                  href={firstSourceStep.selectedSkill.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex text-sm font-semibold text-[var(--accent-soft)]"
                  trackingPath="/api/track/skill"
                  trackingPayload={{
                    skillId: firstSourceStep.selectedSkill.skillId || null,
                    skillVersionId: firstSourceStep.selectedSkill.skillVersionId || null,
                    sourceType: firstSourceStep.selectedSkill.sourceUrl.includes("clawhub.ai") ? "clawhub" : "github",
                    sourceKey: firstSourceStep.selectedSkill.skillId || firstSourceStep.selectedSkill.skillVersionId || firstSourceStep.stepKey,
                    eventType: "source_click",
                    metadata: { packageSlug: detail.slug, stepKey: firstSourceStep.stepKey, sourceUrl: firstSourceStep.selectedSkill.sourceUrl },
                  }}
                >
                  {packageLabels.detailOpenSource}
                </TrackedLink>
              ) : null}
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="rounded-[26px] border border-[var(--line)] bg-[var(--panel)] p-7 md:p-8">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-soft)]">{packageLabels.detailAfterDownload}</p>
                  <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.05em] text-[var(--ink)]">{packageLabels.detailHowToUse}</h3>
                </div>
                <p className="max-w-xl text-sm leading-7 text-[var(--muted-ink)]">{packageLabels.detailHandoff}</p>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <article className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-5"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-soft)]">{packageLabels.detailStepOne}</p><p className="mt-3 text-sm leading-7 text-[var(--soft-ink)]">{packageLabels.detailStepOneCopy}</p></article>
                <article className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-5"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-soft)]">{packageLabels.detailStepTwo}</p><p className="mt-3 text-sm leading-7 text-[var(--soft-ink)]">{packageLabels.detailStepTwoCopy}</p></article>
                <article className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-5"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-soft)]">{packageLabels.detailStepThree}</p><p className="mt-3 text-sm leading-7 text-[var(--soft-ink)]">{packageLabels.detailStepThreeCopy}</p></article>
              </div>
            </div>
            <div className="rounded-[26px] border border-[var(--line)] bg-[var(--panel)] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-soft)]">{packageLabels.detailWhyPackage}</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--soft-ink)]">
                <li>{packageLabels.detailWhyOrdered(detail.steps.length)}</li>
                <li>{packageLabels.detailWhyLinked(stepsWithSource)}</li>
                <li>{packageLabels.detailWhyTemplate(detail.templateName)}</li>
              </ul>
            </div>
          </div>

          <div className="rounded-[26px] border border-[var(--line)] bg-[var(--panel)] p-7 md:p-8">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-soft)]">{packageLabels.detailSteps}</p>
                <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.05em] text-[var(--ink)]">{packageLabels.detailIncludedWorkflow}</h3>
              </div>
              <p className="max-w-xl text-sm leading-7 text-[var(--muted-ink)]">{packageLabels.detailIncludedWorkflowCopy}</p>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {topSteps.map((step, index) => (
                <article key={step.id} className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[linear-gradient(180deg,#ff8069,#ef5d48)] text-sm font-bold text-white">{index + 1}</div>
                      <div className="min-w-0">
                        <h4 className="text-lg font-bold tracking-[-0.03em] text-[var(--ink)]">{step.stepName}</h4>
                        <p className="text-sm text-[var(--muted-ink)]">{step.stepKey}</p>
                      </div>
                    </div>
                    <span className="chip-link">{step.selectedSkill.name}</span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[var(--soft-ink)]">{step.stepDescription}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
