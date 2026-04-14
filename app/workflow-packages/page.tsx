import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { getWorkflowPackages } from "@/lib/workflow-packages";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Workflow Packages | OpenClaw Skills for Authors",
  description: "Download workflow-ready skill bundles for writing articles, reports, and academic work.",
  alternates: {
    canonical: `${getSiteUrl()}/workflow-packages`,
  },
};

const categoryLabels: Record<string, string> = {
  books: "写书",
  articles: "写文章",
  copywriting: "写文案",
  reports: "写报告",
  academic: "写论文",
  courses: "写课程",
};

export default async function WorkflowPackagesPage() {
  const packages = await getWorkflowPackages();

  return (
    <main className="site-shell section-gap pb-24">
      <section className="hero-center pt-6 md:pt-10">
        <h1 className="display-title hero-headline">Workflow Packages</h1>
        <h2 className="hero-subheadline">把单个 Skill 变成整套可下载的创作工作流</h2>
        <p className="hero-copy hero-copy-lg">
          这里展示的是已经编排好的 workflow 包。用户不再自己拼技能，而是直接拿走一套按步骤排列好的方案。
        </p>
        <div className="hero-actions">
          <Link href="/search-skills" className="secondary-button">
            先按需求找单个 Skill
          </Link>
        </div>
      </section>

      <section className="mt-14">
        <SectionHeading
          eyebrow="Phase 2"
          title="Published Packages"
          description="先用 3 个典型创作场景验证 package 详情页、步骤编排和 zip 下载。"
          centered
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {packages.map((item) => (
            <article key={item.id} className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow)]">
              <div className="flex items-center justify-between gap-4">
                <span className="eyebrow">{categoryLabels[item.categorySlug] || item.categorySlug}</span>
                <span className="text-sm text-[var(--muted-ink)]">{item.version}</span>
              </div>
              <h2 className="mt-5 text-2xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">{item.name}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--soft-ink)]">{item.description}</p>
              <div className="mt-5 space-y-2 text-sm text-[var(--muted-ink)]">
                <p>适用人群：{item.audience}</p>
                <p>步骤数：{item.steps.length}</p>
                <p>模板：{item.templateName}</p>
              </div>
              <div className="mt-6 flex gap-3">
                <Link href={`/workflow-packages/${item.slug}`} className="primary-button">
                  查看 Package
                </Link>
                <Link href={`/api/workflow-packages/${item.slug}/download`} className="secondary-button">
                  下载整套 Workflow
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
