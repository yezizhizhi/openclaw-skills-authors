import Link from "next/link";
import { getWorkflowTemplateOverview } from "@/lib/workflow-packages";

export default async function AdminWorkflowTemplatesPage() {
  const templates = await getWorkflowTemplateOverview();

  return (
    <main className="site-shell section-gap pb-24">
      <section className="hero-center pt-6 md:pt-10">
        <h1 className="display-title hero-headline">Workflow Templates</h1>
        <h2 className="hero-subheadline">第二期后台模板概览</h2>
        <p className="hero-copy hero-copy-lg">
          这里先展示模板层的最小骨架，方便你后面继续做模板编辑、自动编排和 package 重建。
        </p>
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-2">
        {templates.map((template) => (
          <article key={template.id} className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6">
            <div className="flex items-center justify-between gap-4">
              <span className="eyebrow">{template.categorySlug}</span>
              <span className="text-sm text-[var(--muted-ink)]">{template.status}</span>
            </div>
            <h2 className="mt-5 text-2xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">{template.name}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--soft-ink)]">受众：{template.audience}</p>
            <p className="mt-1 text-sm leading-7 text-[var(--muted-ink)]">步骤数：{template.stepCount}</p>
            <div className="mt-5">
              <Link href={`/workflow-packages/${template.slug}`} className="secondary-button">
                查看对应 Package
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
