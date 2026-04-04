export default function SubmitSkillsPage() {
  return (
    <main className="site-shell section-gap pb-24">
      <section className="hero-center pt-6 md:pt-10">
        <h1 className="display-title hero-headline">推荐 / 提交 Skills</h1>
        <h2 className="hero-subheadline">提交 Skills 链接或 Skills 包，并简单说明为什么值得推荐</h2>
        <p className="hero-copy hero-copy-lg">
          当前最适合提交的是已经存在于 ClawHub 的 Skills 链接，或可直接安装的 Skills 包地址。我们会先验证能不能稳定打开、适合哪个创作环节，再决定是否收录。
        </p>
      </section>

      <section className="mx-auto mt-12 max-w-4xl rounded-[28px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(15,22,35,0.94),rgba(10,15,24,0.94))] px-6 py-8 shadow-[var(--shadow)] md:px-10">
        <div className="grid gap-5">
          <label className="grid gap-3">
            <span className="text-sm font-semibold tracking-[0.08em] text-[var(--accent-soft)]">Skills 链接或 Skills 包</span>
            <input
              type="text"
              placeholder="例如：https://clawhub.ai/... 或 Skills 包下载地址"
              className="submission-input"
            />
          </label>

          <label className="grid gap-3">
            <span className="text-sm font-semibold tracking-[0.08em] text-[var(--accent-soft)]">为什么推荐</span>
            <textarea
              rows={6}
              placeholder="简单写一下它适合哪个创作环节、为什么值得收录。"
              className="submission-input submission-textarea"
            />
          </label>

          <div className="flex justify-center pt-2">
            <button type="button" className="secondary-button">
              提交推荐
            </button>
          </div>

          <p className="text-center text-[1rem] font-semibold text-[var(--soft-ink)]">感谢你的推荐！</p>
        </div>
      </section>
    </main>
  );
}
