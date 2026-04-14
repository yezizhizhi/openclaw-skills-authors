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

function getRecommendedScene(name: string, templateName: string, description: string) {
  const text = `${name} ${templateName} ${description}`;

  if (text.includes("公众号") || text.includes("文章")) {
    return "适合从选题、素材整理到正文成稿这一整段内容生产。";
  }

  if (text.includes("报告") || text.includes("汇报")) {
    return "适合从资料调研、结论提炼到汇报版输出的报告任务。";
  }

  if (text.includes("论文") || text.includes("学术") || text.includes("综述")) {
    return "适合从研究问题定义到文献综述起步的学术流程。";
  }

  return "适合需要整条 workflow 支撑，而不是只补单一步骤的任务。";
}

export default async function WorkflowPackagesPage() {
  const packages = await getWorkflowPackages();

  return (
    <main className="site-shell section-gap pb-24">
      <section className="hero-center pt-6 md:pt-10">
        <h1 className="display-title hero-headline">Workflow Packages</h1>
        <h2 className="hero-subheadline">把单个 Skill 变成整套可下载的创作工作流</h2>
        <p className="hero-copy hero-copy-lg">
          这里展示的是已经编排好的 workflow 包。先看清楚适用场景、包含步骤和 skill 选择逻辑，再决定要不要下载整套方案。
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
          description="先进入说明页，了解这套 workflow 包解决什么问题、为什么这样搭，再决定是否下载。"
          centered
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {packages.map((item) => {
            const firstStep = item.steps[0];
            const realSourceSkills = item.steps.filter((step) => Boolean(step.selectedSkill.sourceUrl)).length;
            const recommendedScene = getRecommendedScene(item.name, item.templateName, item.description);

            return (
              <article key={item.id} className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow)]">
              <div className="flex items-center justify-between gap-4">
                <span className="eyebrow">{categoryLabels[item.categorySlug] || item.categorySlug}</span>
                <span className="text-sm text-[var(--muted-ink)]">{item.version}</span>
              </div>
              <h2 className="mt-5 text-2xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">{item.name}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--soft-ink)]">{item.description}</p>

              <div className="mt-5 rounded-[18px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,98,76,0.08),rgba(255,255,255,0.02))] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-soft)]">推荐场景</p>
                <p className="mt-2 text-sm leading-7 text-[var(--soft-ink)]">{recommendedScene}</p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-soft)]">适合谁</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--soft-ink)]">{item.audience}</p>
                </div>
                <div className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-soft)]">包含几步</p>
                  <p className="mt-2 text-2xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">{item.steps.length}</p>
                  <p className="text-sm text-[var(--muted-ink)]">个 workflow 节点</p>
                </div>
                <div className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-soft)]">真实来源 Skill</p>
                  <p className="mt-2 text-2xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">{realSourceSkills}</p>
                  <p className="text-sm text-[var(--muted-ink)]">个已接来源</p>
                </div>
              </div>

              <div className="mt-5 space-y-2 text-sm text-[var(--muted-ink)]">
                <p>模板：{item.templateName}</p>
                {firstStep ? <p>最适合从这一步开始：{firstStep.stepName}</p> : null}
              </div>
              <div className="mt-6 flex gap-3">
                <Link href={`/workflow-packages/${item.slug}`} className="primary-button">
                  查看说明与内容
                </Link>
              </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-14">
        <div className="rounded-[28px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,98,76,0.08),rgba(255,255,255,0.02))] p-8">
          <SectionHeading
            eyebrow="Choose Your Path"
            title="该下整包，还是找单个 Skill？"
            description="如果你还在犹豫，先用这个判断。这样用户不会被迫二选一，而是知道什么时候该走哪条路。"
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <article className="rounded-[22px] border border-[var(--line)] bg-[var(--panel)] p-6">
              <span className="eyebrow">选 Workflow Package</span>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--soft-ink)]">
                <li>你要完成的是一整段流程，而不是某一个点状问题。</li>
                <li>你希望有人先帮你把步骤顺序和技能搭配排好。</li>
                <li>你想把“理解流程 + 拿到文件 + 开始执行”一次完成。</li>
              </ul>
            </article>

            <article className="rounded-[22px] border border-[var(--line)] bg-[var(--panel)] p-6">
              <span className="eyebrow">选单个 Skill 搜索</span>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--soft-ink)]">
                <li>你已经知道自己卡在哪一步，只缺一个合适的 skill。</li>
                <li>你不想接受默认 workflow，而是要自己组合每一步。</li>
                <li>你只是想先试一个小能力点，再决定是否升级到整包。</li>
              </ul>
            </article>
          </div>

          <div className="mt-6">
            <Link href="/search-skills" className="secondary-button">
              我想先找单个 Skill
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
