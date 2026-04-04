import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyConfigButton } from "@/components/copy-config-button";
import { getStaticSkillIds } from "@/lib/static-catalog";
import { getSkillDetail } from "@/lib/skills-repository";

type SkillDetailPageProps = {
  params: Promise<{
    skillId: string;
  }>;
};

export async function generateStaticParams() {
  return getStaticSkillIds().map((skillId) => ({
    skillId,
  }));
}

export async function generateMetadata({ params }: SkillDetailPageProps): Promise<Metadata> {
  const { skillId } = await params;
  const skill = await getSkillDetail(skillId);

  if (!skill) {
    return {};
  }

  return {
    title: skill.name,
    description: skill.description,
  };
}

function getStableSourceLink(
  skill: NonNullable<Awaited<ReturnType<typeof getSkillDetail>>>,
) {
  if (!skill.sourceUrl) {
    return null;
  }

  try {
    const sourceUrl = new URL(skill.sourceUrl);

    if (sourceUrl.hostname === "clawhub.ai") {
      return null;
    }

    return skill.sourceUrl;
  } catch {
    return skill.sourceUrl;
  }
}

function buildOpenClawPrompt(
  skill: NonNullable<Awaited<ReturnType<typeof getSkillDetail>>>,
) {
  const sourceLine = getStableSourceLink(skill) ?? "未提供";
  const scenarioLine = skill.scenarioNames.length
    ? skill.scenarioNames.join("、")
    : skill.workflow;

  const tagLine = skill.tags.length ? skill.tags.join("、") : `${skill.categoryLabel}、${skill.workflow}`;

  return [
    `请调用 OpenClaw Skill：${skill.name}`,
    "",
    `分类：${skill.categoryLabel}`,
    `工作环节：${skill.workflow}`,
    `适用场景：${scenarioLine}`,
    `标签：${tagLine}`,
    `来源：${sourceLine}`,
    "",
    "目标：",
    skill.description,
    "",
    "请按这个 Skill 的能力，输出：",
    "1. 适合当前任务的执行步骤",
    "2. 可直接继续写作的结构化结果",
    "3. 如有必要，给出下一步继续调用建议",
  ].join("\n");
}

export default async function SkillDetailPage({ params }: SkillDetailPageProps) {
  const { skillId } = await params;
  const skill = await getSkillDetail(skillId);

  if (!skill) {
    notFound();
  }

  const stableSourceLink = getStableSourceLink(skill);
  const openClawPrompt = buildOpenClawPrompt(skill);

  return (
    <main className="pb-24">
      <section className="site-shell skill-detail-shell pt-10 md:pt-16">
        <div className="hero-center skill-detail-hero">
          <div className="breadcrumb-row skill-detail-breadcrumb">
            <Link href="/">首页</Link>
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
              idleLabel="复制给 OpenClaw"
              successLabel="已复制调用提示"
            />
            <Link href="/install-guide" className="secondary-button skill-detail-button">
              查看安装指南
            </Link>
            {stableSourceLink ? (
              <a
                href={stableSourceLink}
                target="_blank"
                rel="noreferrer noopener"
                className="secondary-button skill-detail-button"
              >
                ClawHub ↗
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
            <p className="skill-detail-label">适用场景</p>
            <h2 className="skill-detail-card-title">这个 Skill 适合解决什么问题</h2>
            <p className="skill-detail-card-copy">
              {skill.categoryLabel}场景下的
              {skill.scenarioNames.length ? ` ${skill.scenarioNames.join("、")} ` : ` ${skill.workflow} `}
              环节。它更适合处理已经明确方向、希望快速推进写作流程的任务。
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
            <p className="skill-detail-label">适用模型</p>
            <h2 className="skill-detail-card-title">推荐搭配的模型</h2>
            <div className="skill-detail-models">
              {skill.models.map((model) => (
                <span key={model} className="model-pill">
                  {model}
                </span>
              ))}
            </div>
            <p className="skill-detail-card-copy">
              当前保留模型字段，后续接真实数据库后可以继续补充模型限制、版本要求和安装依赖。
            </p>
          </article>

          <article className="skill-detail-card">
            <p className="skill-detail-label">调用提示预览</p>
            <h2 className="skill-detail-card-title">可直接复制给 OpenClaw 的提示片段</h2>
            <pre className="skill-detail-code">
              <code>{openClawPrompt}</code>
            </pre>
          </article>
        </div>
      </section>

      <section className="site-shell section-gap skill-detail-section">
        <div className="section-heading centered">
          <h2 className="section-title">输入与输出预览</h2>
          <p className="section-copy">先看它如何把模糊想法转成更可执行的写作结果。</p>
        </div>

        <div className="skill-detail-compare-grid mt-8">
          <article className="compare-pane input">
            <p className="compare-label">输入状态</p>
            <p className="compare-copy">{skill.inputPreview}</p>
          </article>

          <article className="compare-pane output">
            <p className="compare-label accent">输出方向</p>
            <p className="compare-copy strong">{skill.outputPreview}</p>
          </article>
        </div>
      </section>
    </main>
  );
}
