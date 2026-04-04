import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { installModes } from "@/lib/site-data";

const quickSteps = [
  {
    title: "先确定你的写作任务",
    copy: "不要先挑模型或参数，先确认你是在做大纲、扩写、润色、结构检查还是平台改写。",
  },
  {
    title: "再选择安装方式",
    copy: "这一版保留 Copy Config、Download Pack 和 View Source 三种入口，先把动作路径做清晰。",
  },
  {
    title: "最后接入真实来源",
    copy: "当前原型中的 Skill 卡片使用静态样例，下一阶段再连接 Google Sheets、Apps Script 或外部嵌入页。",
  },
];

export default function InstallGuidePage() {
  return (
    <main className="pb-20">
      <section className="site-shell pt-8 md:pt-14">
        <div className="glass-card p-7 md:p-10">
          <span className="eyebrow">Install Guide</span>
          <h1 className="mt-5 text-[clamp(2.3rem,5.5vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-[var(--ink)]">
            作者专用 OpenClaw Skills 安装说明
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--soft-ink)] md:text-xl md:leading-9">
            这一页先服务当前静态原型，帮助你验证按钮文案、安装顺序和用户理解成本。
          </p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted-ink)] md:text-lg">
            等下一阶段接入真实 Skill 数据后，这里可以直接升级成 Google Sites 或外部嵌入页里的完整安装指南模块。
          </p>
        </div>
      </section>

      <section className="site-shell section-gap">
        <SectionHeading
          eyebrow="Three Steps"
          title="当前原型的最佳安装路径"
          description="把原本容易让新手迷失的技术动作，压缩成更容易理解的三步。"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {quickSteps.map((step, index) => (
            <article key={step.title} className="paper-card p-6">
              <span className="step-dot">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="mt-5 text-[1.45rem] font-semibold tracking-[-0.03em] text-[var(--ink)]">
                {step.title}
              </h2>
              <p className="mt-4 text-[15px] leading-8 text-[var(--muted-ink)]">{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-shell section-gap">
        <SectionHeading
          eyebrow="Entry Types"
          title="三种入口如何在页面里呈现"
          description="这个区块和首页、分类页里的按钮保持同一套视觉语言。"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {installModes.map((mode) => (
            <article key={mode.title} className="glass-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-ink)]">
                {mode.badge}
              </p>
              <h2 className="mt-4 text-[1.45rem] font-semibold tracking-[-0.03em] text-[var(--ink)]">
                {mode.title}
              </h2>
              <p className="mt-4 text-[15px] leading-8 text-[var(--muted-ink)]">{mode.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-shell section-gap">
        <div className="glass-card px-7 py-12 text-center md:px-12 md:py-14">
          <span className="eyebrow">Next Phase</span>
          <h2 className="mx-auto mt-5 max-w-4xl text-[2rem] font-semibold leading-tight tracking-[-0.04em] text-[var(--ink)] md:text-[3rem]">
            当前先保持静态原型，下一步再接动态 Skill 列表
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--muted-ink)] md:text-lg">
            这样做的好处是，我们可以先验证首页、分类页和卡片交互是否顺眼，再决定数据结构和嵌入方式，不会把前后端复杂度一次性堆上去。
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/" className="primary-button">
              回到首页
            </Link>
            <Link href="/categories/books" className="secondary-button">
              查看写书页
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
