import Link from "next/link";
import { AdminWorkflowPackagesControls } from "@/components/admin-workflow-packages-controls";
import { getWorkflowPackages } from "@/lib/workflow-packages";

export default async function AdminWorkflowPackagesPage() {
  const packages = await getWorkflowPackages();

  return (
    <main className="site-shell section-gap pb-24">
      <section className="hero-center pt-6 md:pt-10">
        <h1 className="display-title hero-headline">Workflow Packages Admin</h1>
        <h2 className="hero-subheadline">第二期 package 层概览</h2>
        <p className="hero-copy hero-copy-lg">
          用来查看哪些 workflow 包已经发布、每个包有多少步骤，以及用户下载时会拿到什么结构。
        </p>
      </section>

      <AdminWorkflowPackagesControls />

      <section className="mt-12 grid gap-5 lg:grid-cols-2">
        {packages.map((item) => (
          <article key={item.id} className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6">
            <div className="flex items-center justify-between gap-4">
              <span className="eyebrow">{item.buildSource}</span>
              <span className="text-sm text-[var(--muted-ink)]">{item.version}</span>
            </div>
            <h2 className="mt-5 text-2xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">{item.name}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--soft-ink)]">{item.description}</p>
            <div className="mt-5 space-y-1 text-sm text-[var(--muted-ink)]">
              <p>模板：{item.templateName}</p>
              <p>步骤：{item.steps.length}</p>
              <p>状态：{item.status}</p>
              <p>已分配 Skill：{item.steps.filter((step) => step.selectedSkill.skillId || step.selectedSkill.skillVersionId).length}</p>
            </div>
            <div className="mt-5 flex gap-3">
              <Link href={`/admin/workflow-packages/${item.slug}`} className="secondary-button">
                手动替换 Skill
              </Link>
              <Link href={`/workflow-packages/${item.slug}`} className="secondary-button">
                查看详情
              </Link>
              <Link href={`/api/workflow-packages/${item.slug}/download`} className="primary-button">
                下载 zip
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
