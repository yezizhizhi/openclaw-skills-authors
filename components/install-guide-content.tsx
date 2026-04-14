"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export function InstallGuideContent() {
  const { language } = useLanguage();
  const isZh = language === "zh";

  const quickSteps = [
    {
      title: isZh ? "1. 先选分类" : "1. Pick a category",
      copy: isZh
        ? "先进入写书、写文章、写文案、写报告、写论文或写课程页，找到你当前最接近的写作场景。"
        : "Open the category that matches your current creation task: books, articles, copywriting, reports, academic writing, or courses.",
    },
    {
      title: isZh ? "2. 再搜工作环节" : "2. Search the workflow step",
      copy: isZh
        ? "直接输入你现在卡住的步骤，例如大纲创建、素材整理、正文写作、终稿质检，系统会优先给出对应 Skills。"
        : "Type the exact step you are stuck on, such as outlining, source cleanup, drafting, or final review, and the page will surface matching skills first.",
    },
    {
      title: isZh ? "3. 直接跳转安装" : "3. Open and install",
      copy: isZh
        ? "只要页面里显示了可直达的 Skill，就可以点进 ClawHub 原页面，继续复制配置、下载或安装使用。"
        : "If a skill is shown with a direct source link, open the original ClawHub page and continue with copying config, downloading, or installing there.",
    },
  ];

  return (
    <main className="pb-20">
      <section className="site-shell pt-8 md:pt-14">
        <div className="glass-card p-7 md:p-10">
          <h1 className="text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-[var(--ink)]">
            {isZh ? "安装指南" : "Install Guide"}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--soft-ink)] md:text-lg">
            {isZh
              ? "不用先研究参数，也不用先判断模型。先找你的写作场景，再点进对应 Skill 的原页面安装即可。"
              : "You do not need to study parameters or choose a model first. Start from your writing scenario, then open the matching skill page and install from there."}
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
            {isZh ? "最简单的使用方式" : "The simplest way to use the site"}
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--muted-ink)]">
            {isZh
              ? "如果你是第一次使用，建议直接从分类页第二屏开始，输入你当前的工作环节，先看系统筛出的 Skills，再决定安装哪一个。"
              : "If this is your first time, start from the second screen of a category page, enter your current workflow step, review the matched skills, and then choose one to install."}
          </p>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row">
            <Link href="/#categories" className="primary-button">
              {isZh ? "回到首页快速搜索" : "Back to Homepage Search"}
            </Link>
            <Link href="/categories/books" className="secondary-button">
              {isZh ? "先看分类页示例" : "View a Category Example"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
