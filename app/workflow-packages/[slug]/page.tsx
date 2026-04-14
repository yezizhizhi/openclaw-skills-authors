import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PackageAnalytics } from "@/components/package-analytics";
import { SectionHeading } from "@/components/section-heading";
import { TrackedLink } from "@/components/tracked-link";
import {
  getStaticWorkflowPackageSlugs,
  getWorkflowPackageDetail,
} from "@/lib/workflow-packages";
import { getSiteUrl } from "@/lib/site-url";

type WorkflowPackagePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getStaticWorkflowPackageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: WorkflowPackagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = await getWorkflowPackageDetail(slug);

  if (!detail) {
    return {};
  }

  return {
    title: `${detail.name} | Workflow Package`,
    description: detail.description,
    alternates: {
      canonical: `${getSiteUrl()}/workflow-packages/${slug}`,
    },
  };
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

export default async function WorkflowPackageDetailPage({ params }: WorkflowPackagePageProps) {
  const { slug } = await params;
  const detail = await getWorkflowPackageDetail(slug);

  if (!detail) {
    notFound();
  }

  return (
    <main className="pb-24">
      <PackageAnalytics packageId={detail.id} packageSlug={detail.slug} />
      <section className="site-shell pt-10 md:pt-16">
        <div className="hero-center">
          <div className="breadcrumb-row skill-detail-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/workflow-packages">Workflow Packages</Link>
            <span>/</span>
            <span>{detail.name}</span>
          </div>

          <h1 className="display-title hero-headline">{detail.name}</h1>
          <h2 className="hero-subheadline">{detail.templateName}</h2>
          <p className="hero-copy hero-copy-lg">{detail.description}</p>

          <div className="hero-actions">
            <TrackedLink
              href={`/api/workflow-packages/${detail.slug}/download`}
              className="primary-button"
              trackingPath="/api/track/package"
              trackingPayload={{
                packageId: detail.id,
                packageSlug: detail.slug,
                eventType: "download",
              }}
            >
              下载整套 Workflow
            </TrackedLink>
            <Link href={`/categories/${detail.categorySlug}#search-skills`} className="secondary-button">
              先按需求找单个 Skill
            </Link>
            <Link href="/workflow-packages" className="secondary-button">
              返回 Package 列表
            </Link>
          </div>

          <div className="hero-chip-row">
            <span className="chip-link">Version {detail.version}</span>
            <span className="chip-link">{detail.audience}</span>
            <span className="chip-link">Updated {formatDate(detail.updatedAt)}</span>
          </div>
        </div>
      </section>

      <section className="site-shell section-gap">
        <div className="grid gap-5 lg:grid-cols-3">
          <article className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-soft)]">Audience</p>
            <p className="mt-4 text-base leading-8 text-[var(--soft-ink)]">{detail.audience}</p>
          </article>
          <article className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-soft)]">Goal</p>
            <p className="mt-4 text-base leading-8 text-[var(--soft-ink)]">{detail.goal}</p>
          </article>
          <article className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-soft)]">Build Source</p>
            <p className="mt-4 text-base leading-8 text-[var(--soft-ink)]">{detail.buildSource}</p>
          </article>
        </div>
      </section>

      <section className="site-shell section-gap">
        <div className="rounded-[28px] border border-[var(--line)] bg-[var(--panel)] p-8">
          <div className="section-heading">
            <span className="eyebrow">Need Flexibility?</span>
            <h2 className="section-title">也可以回到单个 Skill 路径自己挑</h2>
            <p className="section-copy">
              如果你不想直接下载整套包，而是只想替换其中某一步、或者自己挑更具体的 skill，可以回到这个分类的搜索页继续选。
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/categories/${detail.categorySlug}#search-skills`} className="primary-button">
              去这个分类搜索 Skills
            </Link>
            <Link href="/search-skills" className="secondary-button">
              浏览全部 Skill 搜索入口
            </Link>
          </div>
        </div>
      </section>

      <section className="site-shell section-gap">
        <SectionHeading
          eyebrow="Workflow"
          title="Step-by-Step Package"
          description="每一步都对应一个明确产出，帮助用户顺着流程把内容做完，而不是自己在多个 skill 之间来回切换。"
        />

        <div className="mt-8 space-y-4">
          {detail.steps.map((step, index) => (
            <article key={step.id} className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-3">
                    <span className="header-brand-mark !h-10 !w-10 !rounded-[14px] !text-sm">{index + 1}</span>
                    <div>
                      <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">{step.stepName}</h2>
                      <p className="text-sm text-[var(--muted-ink)]">{step.stepKey}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-base leading-8 text-[var(--soft-ink)]">{step.stepDescription}</p>
                </div>

                <div className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-4 lg:w-[360px]">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-soft)]">Selected Skill</p>
                  <h3 className="mt-3 text-lg font-bold text-[var(--ink)]">{step.selectedSkill.name}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted-ink)]">{step.selectedSkill.selectionReason}</p>
                  {step.selectedSkill.sourceUrl ? (
                    <TrackedLink
                      href={step.selectedSkill.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex text-sm font-semibold text-[var(--accent-soft)]"
                      trackingPath="/api/track/skill"
                      trackingPayload={{
                        skillId: step.selectedSkill.skillId || null,
                        skillVersionId: step.selectedSkill.skillVersionId || null,
                        sourceType: step.selectedSkill.sourceUrl.includes("clawhub.ai") ? "clawhub" : "github",
                        sourceKey: step.selectedSkill.skillId || step.selectedSkill.skillVersionId || step.stepKey,
                        eventType: "source_click",
                        metadata: {
                          packageSlug: detail.slug,
                          stepKey: step.stepKey,
                          sourceUrl: step.selectedSkill.sourceUrl,
                        },
                      }}
                    >
                      查看来源 ↗
                    </TrackedLink>
                  ) : null}
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted-ink)]">Input Contract</p>
                  <ul className="mt-3 space-y-2 text-sm leading-7 text-[var(--soft-ink)]">
                    {Object.entries(step.inputContract).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}</strong>: {value}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted-ink)]">Output Contract</p>
                  <ul className="mt-3 space-y-2 text-sm leading-7 text-[var(--soft-ink)]">
                    {Object.entries(step.outputContract).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}</strong>: {value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
