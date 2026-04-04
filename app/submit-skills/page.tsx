import Link from "next/link";

const submissionSteps = [
  {
    title: "先准备 Skill 名称或原始链接",
    copy: "最适合提交的是 ClawHub 原 Skill 页链接，或至少提供准确的 Skill 名称，方便我们核对是不是稳定可跳转的原始条目。",
  },
  {
    title: "说明它适合哪个创作环节",
    copy: "例如写书里的大纲创建、资料搜集，或写文案里的热点调研、正文写作。这样我们能更快把它放进正确分类。",
  },
  {
    title: "只优先收录可直接使用的 Skill",
    copy: "当前站内会优先保留能稳定跳到原始 Skill 页、并适合实际创作工作流的条目。搜索页、坏链和无法安装的条目会被过滤掉。",
  },
];

export default function SubmitSkillsPage() {
  return (
    <main className="site-shell section-gap pb-24">
      <section className="hero-center pt-6 md:pt-10">
        <h1 className="display-title hero-headline">推荐 / 提交 Skills</h1>
        <h2 className="hero-subheadline">把值得收录的 ClawHub Skills 推荐给我们，先验证，再归类</h2>
        <p className="hero-copy hero-copy-lg">
          这一页先作为提交说明入口。当前最适合推荐的是已经存在于 ClawHub、能稳定打开原始 Skill 页、并且适合真实创作工作流的条目。
        </p>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        {submissionSteps.map((step) => (
          <article key={step.title} className="reason-card">
            <h2 className="reason-title">{step.title}</h2>
            <p className="reason-copy">{step.copy}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-[28px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(15,22,35,0.94),rgba(10,15,24,0.94))] px-6 py-8 text-center shadow-[var(--shadow)] md:px-10">
        <p className="text-sm font-semibold tracking-[0.16em] text-[var(--accent-soft)]">当前收录标准</p>
        <p className="mx-auto mt-4 max-w-4xl text-[1.05rem] leading-8 text-[var(--soft-ink)]">
          我们会优先验证这 3 件事：能不能稳定直达原始 Skill 页、是否适合某个明确的创作环节、以及是否真的值得放进当前分类页的精选或搜索结果。
        </p>
        <div className="mt-6 flex justify-center">
          <Link href="/#faq" className="secondary-button">
            先看收录说明
          </Link>
        </div>
      </section>
    </main>
  );
}
