 "use client";

import { SubmitSkillForm } from "@/components/submit-skill-form";
import { useLanguage } from "@/components/language-provider";

export default function SubmitSkillsPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";

  return (
    <main className="site-shell section-gap pb-24">
      <section className="hero-center pt-6 md:pt-10">
        <h1 className="display-title hero-headline">{isZh ? "推荐 / 提交 Skills" : "Recommend / Submit Skills"}</h1>
        <h2 className="hero-subheadline">
          {isZh
            ? "提交 Skills 链接或 Skills 包，并简单说明为什么值得推荐"
            : "Submit a skill link or skill package and briefly explain why it should be included."}
        </h2>
        <p className="hero-copy hero-copy-lg">
          {isZh
            ? "当前最适合提交的是已经存在于 ClawHub 的 Skills 链接，或可直接安装的 Skills 包地址。我们会先验证能不能稳定打开、适合哪个创作环节，再决定是否收录。"
            : "The best submissions are ClawHub skill links that already work, or installable skill packages. We verify whether the source is reachable and which creative workflow it fits before including it."}
        </p>
      </section>

      <section className="mx-auto mt-12 max-w-4xl rounded-[28px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(15,22,35,0.94),rgba(10,15,24,0.94))] px-6 py-8 shadow-[var(--shadow)] md:px-10">
        <SubmitSkillForm />
      </section>
    </main>
  );
}
