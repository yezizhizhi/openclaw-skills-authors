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

function formatFileName(stepKey: string, index: number) {
  return `prompts/step-${String(index + 1).padStart(2, "0")}-${stepKey}.md`;
}

export default async function WorkflowPackageDetailPage({ params }: WorkflowPackagePageProps) {
  const { slug } = await params;
  const detail = await getWorkflowPackageDetail(slug);

  if (!detail) {
    notFound();
  }

  const stepsWithSource = detail.steps.filter((step) => Boolean(step.selectedSkill.sourceUrl)).length;
  const placeholderSteps = detail.steps.length - stepsWithSource;
  const requiredSteps = detail.steps.filter((step) => step.isRequired).length;
  const packageFiles = [
    {
      name: "manifest.json",
      description: "整套 workflow 的元信息、步骤顺序和 skill 选择清单。",
    },
    {
      name: "workflow.md",
      description: "面向人的总说明，快速理解这套包解决什么问题、按什么顺序使用。",
    },
    {
      name: "skills.json",
      description: "每一步对应的 skill 列表，方便后续自动处理或二次开发。",
    },
    ...detail.steps.map((step, index) => ({
      name: formatFileName(step.stepKey, index),
      description: `${step.stepName} 的分步骤 prompt，拿到就能按节点执行。`,
    })),
  ];

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
            <Link href={`/categories/${detail.categorySlug}#search-skills`} className="secondary-button">
              先按需求找单个 Skill
            </Link>
            <Link href="/workflow-packages" className="secondary-button">
              返回 Package 列表
            </Link>
            <a href="#download-package" className="primary-button">
              先看说明，再决定下载
            </a>
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
        <div className="rounded-[28px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,98,76,0.10),rgba(255,255,255,0.02))] p-8">
          <div className="section-heading">
            <span className="eyebrow">Before Download</span>
            <h2 className="section-title">这套包里有什么，为什么这样搭</h2>
            <p className="section-copy">
              这不是把几个 skill 随便凑在一起，而是按真实工作流顺序把每一步的目标、输入、输出和候选 skill 串起来，让用户知道自己下载后会怎么用。
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <article className="rounded-[20px] border border-[var(--line)] bg-[var(--panel)] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-soft)]">包含内容</p>
              <p className="mt-3 text-sm leading-7 text-[var(--soft-ink)]">
                这套包包含 {detail.steps.length} 个步骤说明、每一步的输入输出要求、已选 skill 依据，以及可直接下载的 zip 文件。
              </p>
            </article>
            <article className="rounded-[20px] border border-[var(--line)] bg-[var(--panel)] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-soft)]">为什么是这些 Skills</p>
              <p className="mt-3 text-sm leading-7 text-[var(--soft-ink)]">
                每一步都按当前场景最适合的能力位点挑选。能直连来源的 step 会保留真实来源，仍在占位的 step 也会明确告诉用户是临时位点还是后续自动替换位点。
              </p>
            </article>
            <article className="rounded-[20px] border border-[var(--line)] bg-[var(--panel)] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-soft)]">下载后你会拿到</p>
              <p className="mt-3 text-sm leading-7 text-[var(--soft-ink)]">
                `manifest.json`、`workflow.md`、`skills.json` 和每一步对应的 prompt 文件，方便你直接理解、复用和继续改造。
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="site-shell section-gap">
        <SectionHeading
          eyebrow="Fit Check"
          title="适合谁，不适合谁"
          description="先判断这个 package 是不是和你的实际使用场景对上，避免为了下载而下载。"
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-soft)]">适合你，如果你现在...</p>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--soft-ink)]">
              <li>希望按现成 workflow 往前推进，而不是自己拼每一步工具。</li>
              <li>需要一个从起点到交付更连贯的技能组合，而不是单点补丁。</li>
              <li>愿意先用一套经过编排的默认方案，再按需要替换其中某些 step。</li>
            </ul>
          </article>
          <article className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-soft)]">可能不适合你，如果你更想...</p>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--soft-ink)]">
              <li>只解决一个非常具体的问题，比如只找标题润色或只找文献摘要。</li>
              <li>自己已经有稳定工作流，只想补充某一步的单个 skill。</li>
              <li>不希望接受默认步骤顺序，而是完全自由组合每一步能力。</li>
            </ul>
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
          eyebrow="Package Overview"
          title="下载前总览"
          description="先快速看这套包覆盖了多少步骤、哪些 skill 已经接真实来源、哪些位置还保留可替换空间。"
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <article className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-soft)]">步骤总数</p>
            <p className="mt-4 text-4xl font-extrabold tracking-[-0.05em] text-[var(--ink)]">{detail.steps.length}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--muted-ink)]">从开始到交付的完整 workflow 节点。</p>
          </article>
          <article className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-soft)]">必经步骤</p>
            <p className="mt-4 text-4xl font-extrabold tracking-[-0.05em] text-[var(--ink)]">{requiredSteps}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--muted-ink)]">这些是整条链路里默认不能跳过的关键节点。</p>
          </article>
          <article className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-soft)]">真实来源 Skill</p>
            <p className="mt-4 text-4xl font-extrabold tracking-[-0.05em] text-[var(--ink)]">{stepsWithSource}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--muted-ink)]">可以直接点进 ClawHub 或 GitHub 查看原始 skill。</p>
          </article>
          <article className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-soft)]">可替换位点</p>
            <p className="mt-4 text-4xl font-extrabold tracking-[-0.05em] text-[var(--ink)]">{placeholderSteps}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--muted-ink)]">这些步骤先保留 workflow 骨架，后续会继续接自动优选。</p>
          </article>
        </div>
      </section>

      <section className="site-shell section-gap">
        <SectionHeading
          eyebrow="How To Use"
          title="下载后怎么用"
          description="把这套 workflow 包当成一条现成生产线，而不是一个压缩包附件。"
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <article className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6">
            <span className="eyebrow">Step 1</span>
            <h3 className="mt-4 text-2xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">先看总说明</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--soft-ink)]">
              打开 `workflow.md` 和 `manifest.json`，先明确这套包的目标、顺序和每一步输出，不要一上来就随机点 skill。
            </p>
          </article>
          <article className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6">
            <span className="eyebrow">Step 2</span>
            <h3 className="mt-4 text-2xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">按步骤执行</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--soft-ink)]">
              逐个打开每一步 prompt 文件，按输入要求喂材料，拿到对应输出，再进入下一步，而不是一次性把所有 skill 全开。
            </p>
          </article>
          <article className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6">
            <span className="eyebrow">Step 3</span>
            <h3 className="mt-4 text-2xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">按需替换</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--soft-ink)]">
              如果某一步不合适，就回到单个 skill 搜索路径，把那一步换掉，不需要整包推翻重来。
            </p>
          </article>
        </div>
      </section>

      <section className="site-shell section-gap">
        <SectionHeading
          eyebrow="Compare"
          title="整包下载 vs 单个 Skill 搜索"
          description="如果你已经快决定了，这个对比能帮你最后确认：现在更适合拿整包，还是先从单点能力开始。"
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[24px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,98,76,0.10),rgba(255,255,255,0.02))] p-6">
            <span className="eyebrow">Workflow Package</span>
            <h3 className="mt-4 text-2xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">适合想直接推进整条链路的人</h3>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--soft-ink)]">
              <li>已经帮你排好步骤顺序和默认 skill 组合。</li>
              <li>下载后直接拿到整套说明、文件结构和 step prompt。</li>
              <li>更适合“从选题到成稿”“从调研到汇报”这种完整任务。</li>
            </ul>
          </article>

          <article className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6">
            <span className="eyebrow">Single Skill Search</span>
            <h3 className="mt-4 text-2xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">适合只补某一步能力的人</h3>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--soft-ink)]">
              <li>更灵活，可以只替换热点调研、摘要提炼、润色等某一步。</li>
              <li>不会被默认流程限制，适合已经有自己工作方法的人。</li>
              <li>更适合先低成本试用，再慢慢拼出自己的 workflow。</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="site-shell section-gap">
        <SectionHeading
          eyebrow="Workflow"
          title="Step-by-Step Package"
          description="每一步都告诉用户这一步要干什么、为什么放在这里、用了哪个 skill，以及最后会产出什么。"
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
                  <p className="mt-3 text-xs leading-6 text-[var(--muted-ink)]">
                    {step.selectedSkill.sourceUrl
                      ? "这是当前已经接入真实来源的 skill，用户可以继续查看来源后再决定是否替换。"
                      : "这是当前 workflow 的能力位点说明，方便你先理解整套流程，后续也可以继续替换成更合适的 skill。"}
                  </p>
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

      <section className="site-shell section-gap">
        <SectionHeading
          eyebrow="Inside The Zip"
          title="包内文件预览"
          description="下载的不是一个黑盒压缩包，而是一套可以直接查看、替换、继续改造的结构化文件。"
        />

        <div className="mt-8 rounded-[28px] border border-[var(--line)] bg-[var(--panel)] p-6">
          <div className="space-y-3">
            {packageFiles.map((file) => (
              <article
                key={file.name}
                className="flex flex-col gap-2 rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] px-4 py-4 lg:flex-row lg:items-center lg:justify-between"
              >
                <div>
                  <p className="font-mono text-sm text-[var(--ink)]">{file.name}</p>
                  <p className="mt-1 text-sm leading-7 text-[var(--muted-ink)]">{file.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-shell section-gap" id="download-package">
        <div className="rounded-[28px] border border-[var(--line)] bg-[var(--panel)] p-8">
          <div className="section-heading">
            <span className="eyebrow">Download</span>
            <h2 className="section-title">确认这套内容适合你，再下载整包</h2>
            <p className="section-copy">
              如果上面的步骤、skill 选择和产出格式都符合你的使用场景，就可以把整套 workflow 打包带走。下载后你会拿到说明文件、结构清单和分步骤 prompt。
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            <article className="rounded-[20px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-soft)]">1 份总说明</p>
              <p className="mt-3 text-sm leading-7 text-[var(--soft-ink)]">
                `workflow.md` 帮你先看懂整套流程，不用下载完再自己猜。
              </p>
            </article>
            <article className="rounded-[20px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-soft)]">1 份结构清单</p>
              <p className="mt-3 text-sm leading-7 text-[var(--soft-ink)]">
                `manifest.json` 和 `skills.json` 告诉你每一步对应哪个 skill、为什么这样排。
              </p>
            </article>
            <article className="rounded-[20px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-soft)]">{detail.steps.length} 个步骤 Prompt</p>
              <p className="mt-3 text-sm leading-7 text-[var(--soft-ink)]">
                每一步都有单独 prompt 文件，方便你按顺序执行，也方便只替换其中一步。
              </p>
            </article>
            <article className="rounded-[20px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-soft)]">{stepsWithSource} 个真实来源</p>
              <p className="mt-3 text-sm leading-7 text-[var(--soft-ink)]">
                已接来源的 skill 可以继续回看 ClawHub 或 GitHub，确保整包不是黑盒。
              </p>
            </article>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
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
            <Link href={`/categories/${detail.categorySlug}#workflow-packs`} className="secondary-button">
              先继续比较其他 Package
            </Link>
            <Link href={`/categories/${detail.categorySlug}#search-skills`} className="secondary-button">
              我只想换其中某一步 Skill
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
