"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { categories, editorChoices } from "@/lib/site-data";
import { useLanguage } from "@/components/language-provider";
import type { HomeCategoryKey } from "@/lib/i18n";

export default function HomePage() {
  const { translations } = useLanguage();
  const {
    home,
    categoryChips,
    categories: transCategories,
    skillWorkflows,
    skillDescriptions,
  } = translations;

  const featuredCategory = categories[0];
  const sideCategories = categories.slice(1);
  const spotlightSkills = editorChoices
    .filter((skill) => skill.sourceUrl)
    .slice(0, 3)
    .map((skill) => ({
      name: skill.name,
      scene: skillDescriptions[skill.name] || skill.description,
      tags: [
        skill.badge ?? (categoryChips[featuredCategory.slug as keyof typeof categoryChips] || "Featured"),
        skillWorkflows[skill.workflow] || skill.workflow,
        home.spotlightCta.replace(" ↗", ""),
      ],
      href: skill.sourceUrl as string,
    }));

  return (
    <main className="pb-24">
      <section className="site-shell pt-10 md:pt-16">
        <div className="hero-center">
          <h1 className="display-title hero-headline">{home.heroTitle}</h1>
          <h2 className="hero-subheadline">
            {home.heroSubheadlineLine1}
            <br />
            {home.heroSubheadlineLine2}
          </h2>
          <h3 className="hero-copy hero-copy-lg">{home.heroCopy}</h3>

          <div className="hero-actions">
            <Link href="/search-skills" className="primary-button">
              找单个 Skill
            </Link>
            <Link href="/workflow-packages" className="secondary-button">
              下载 Workflow Pack
            </Link>
          </div>

          <div className="hero-chip-row">
            {categories.map((category) => (
              <Link key={category.slug} href={`/categories/${category.slug}`} className="chip-link">
                {categoryChips[category.slug as keyof typeof categoryChips]}
              </Link>
            ))}
          </div>
        </div>

      </section>

      <section className="site-shell section-gap">
        <SectionHeading
          eyebrow="Two Paths"
          title="两种使用方式，同时保留"
          description="已经知道自己缺什么，就找单个 skill。想直接拿走完整流程，就下 workflow pack。"
          centered
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[28px] border border-[var(--line)] bg-[var(--panel)] p-7 shadow-[var(--shadow)]">
            <span className="eyebrow">Path A</span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-[-0.05em] text-[var(--ink)]">按需求找单个 Skill</h2>
            <p className="mt-4 text-base leading-8 text-[var(--soft-ink)]">
              适合已经知道自己卡在“热点调研、文献收集、提纲结构、正文扩写、终稿润色”等某个具体环节的人。
            </p>
            <ul className="mt-5 space-y-2 text-sm leading-7 text-[var(--muted-ink)]">
              <li>直接输入当前需求</li>
              <li>返回最相关的单个 skills</li>
              <li>继续跳转 ClawHub 或来源页使用</li>
            </ul>
            <div className="mt-6">
              <Link href="/search-skills" className="primary-button">
                进入 Skill 搜索
              </Link>
            </div>
          </article>

          <article className="rounded-[28px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,98,76,0.12),rgba(255,255,255,0.03))] p-7 shadow-[var(--shadow)]">
            <span className="eyebrow">Path B</span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-[-0.05em] text-[var(--ink)]">直接下载整套 Workflow Pack</h2>
            <p className="mt-4 text-base leading-8 text-[var(--soft-ink)]">
              适合不想自己拼技能、而是希望从“选题到成稿”“调研到汇报”“开题到综述”直接拿走一整套流程的人。
            </p>
            <ul className="mt-5 space-y-2 text-sm leading-7 text-[var(--muted-ink)]">
              <li>按真实场景打包</li>
              <li>每一步都带选中的 skill</li>
              <li>支持整套 zip 下载</li>
            </ul>
            <div className="mt-6">
              <Link href="/workflow-packages" className="primary-button">
                浏览 Workflow Packs
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="site-shell section-gap" id="categories">
        <SectionHeading
          title={home.categoriesTitle}
          description={home.categoriesDescription}
          centered
        />

        <div className="category-grid mt-8">
          <article className="category-hero-card">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="preview-title">{transCategories[featuredCategory.slug as HomeCategoryKey].title}</h2>
              </div>
            </div>
            <p className="mt-4 text-[15px] leading-8 text-[var(--muted-ink)]">
              {transCategories[featuredCategory.slug as HomeCategoryKey].subtitle}
            </p>
            <p className="mt-4 text-[15px] leading-8 text-[var(--muted-ink)]">
              {transCategories[featuredCategory.slug as HomeCategoryKey].copy}
            </p>
            <div className="mt-6">
              <Link
                href={`/categories/${featuredCategory.slug}`}
                className="primary-button category-card-button"
              >
                {home.categoryButton}
              </Link>
            </div>
          </article>

          {sideCategories.map((category) => (
            <article key={category.slug} className="compact-category-card">
              <div>
                <h3 className="compact-category-title">{transCategories[category.slug as HomeCategoryKey].title}</h3>
                <p className="compact-category-subtitle">{transCategories[category.slug as HomeCategoryKey].subtitle}</p>
              </div>
              <p className="compact-category-copy">{transCategories[category.slug as HomeCategoryKey].copy}</p>
              <Link
                href={`/categories/${category.slug}`}
                className="primary-button category-card-button"
              >
                {home.categoryButton}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="site-shell section-gap">
        <SectionHeading
          title={home.spotlightTitle}
          description={home.spotlightDescription}
          centered
        />

        <div className="spotlight-grid mt-8">
          {spotlightSkills.map((skill) => (
            <article key={skill.name} className="spotlight-card">
              <div>
                <p className="spotlight-label">{home.spotlightName}</p>
                <h3 className="spotlight-title">{skill.name}</h3>
              </div>

              <div className="spotlight-block">
                <p className="spotlight-label">{home.spotlightScene}</p>
                <p className="spotlight-scene">{skill.scene.replace("适用场景：", "").trim()}</p>
              </div>

              <div className="spotlight-block">
                <p className="spotlight-label">{home.spotlightTags}</p>
                <div className="spotlight-tags">
                  {skill.tags.map((tag) => (
                    <span key={tag} className="spotlight-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={skill.href}
                target="_blank"
                rel="noreferrer noopener"
                className="primary-button spotlight-button"
              >
                {home.spotlightCta}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="site-shell section-gap">
        <div className="section-heading centered reason-heading">
          <h2 className="section-title">{home.reasonsTitle}</h2>
        </div>

        <div className="reason-grid mt-8">
          {home.reasons.map((card) => (
            <article key={card.title} className="reason-card">
              <h3 className="reason-title">{card.title}</h3>
              <p className="reason-copy">{card.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-shell section-gap" id="faq">
        <div className="section-heading centered faq-heading">
          <h2 className="section-title">{home.faqTitle}</h2>
          <p className="section-description">{home.faqDescription}</p>
        </div>

        <div className="faq-list mt-8">
          {home.faqItems.map((item, index) => (
            <details key={item.question} className="faq-item">
              <summary className="faq-summary">
                <span className="faq-label">Q{index + 1}</span>
                <span className="faq-question">{item.question}</span>
                <span className="faq-toggle" aria-hidden="true" />
              </summary>

              <div className="faq-answer-wrap">
                <p className="faq-label faq-answer-label">A{index + 1}</p>
                <p className="faq-answer">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
