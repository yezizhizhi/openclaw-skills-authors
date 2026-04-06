import type { Metadata } from "next";
import Link from "next/link";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "安装指南 | OpenClaw Skills for Authors",
  description:
    "了解如何在 OpenClaw 找到适合你的 AI 写作技能。三步快速上手：选分类、搜环节、直接安装。",
  alternates: {
    canonical: `${getSiteUrl()}/install-guide`,
  },
  openGraph: {
    title: "安装指南 | OpenClaw Skills for Authors",
    description:
      "了解如何在 OpenClaw 找到适合你的 AI 写作技能。三步快速上手：选分类、搜环节、直接安装。",
    url: `${getSiteUrl()}/install-guide`,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "OpenClaw 安装指南",
      },
    ],
  },
};

const quickSteps = [
  {
    title: "1. 先选分类",
    copy: "先进入写书、写文章、写文案、写报告、写论文或写课程页，找到你当前最接近的写作场景。",
  },
  {
    title: "2. 再搜工作环节",
    copy: "直接输入你现在卡住的步骤，例如大纲创建、素材整理、正文写作、终稿质检，系统会优先给出对应 Skills。",
  },
  {
    title: "3. 直接跳转安装",
    copy: "只要页面里显示了可直达的 Skill，就可以点进 ClawHub 原页面，继续复制配置、下载或安装使用。",
  },
];

export default function InstallGuidePage() {
  return (
    <main className="pb-20">
      <section className="site-shell pt-8 md:pt-14">
        <div className="glass-card p-7 md:p-10">
          <h1 className="text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-[var(--ink)]">
            安装指南
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--soft-ink)] md:text-lg">
            不用先研究参数，也不用先判断模型。先找你的写作场景，再点进对应 Skill 的原页面安装即可。
          </p>
        </div>
      </section>

      <section className="site-shell section-gap">
        <div className="grid gap-5 md:grid-cols-3">
          {quickSteps.map((step) => (
            <article key={step.title} className="glass-card p-6">
              <h2 className="text-[1.3rem] font-semibold tracking-[-0.03em] text-[var(--ink)]">
                {step.title}
              </h2>
              <p className="mt-4 text-[15px] leading-8 text-[var(--muted-ink)]">{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-shell section-gap">
        <div className="glass-card p-7 md:p-8">
          <h2 className="text-[1.55rem] font-semibold tracking-[-0.04em] text-[var(--ink)]">
            最简单的使用方式
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--muted-ink)]">
            如果你是第一次使用，建议直接从分类页第二屏开始，输入你当前的工作环节，先看系统筛出的 Skills，再决定安装哪一个。
          </p>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row">
            <Link href="/#categories" className="primary-button">
              回到首页快速搜索
            </Link>
            <Link href="/categories/books" className="secondary-button">
              先看分类页示例
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
