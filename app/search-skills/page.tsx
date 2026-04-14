"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

const categoryOrder = [
  "books",
  "articles",
  "copywriting",
  "reports",
  "academic",
  "courses",
] as const;

export default function SearchSkillsPage() {
  const { language, translations } = useLanguage();
  const isZh = language === "zh";
  const { categories, categoryChips } = translations;

  return (
    <main className="site-shell section-gap pb-24">
      <section className="hero-center pt-6 md:pt-10">
        <h1 className="display-title hero-headline">
          {isZh ? "快速搜索 Skills" : "Search Skills Quickly"}
        </h1>
        <h2 className="hero-subheadline">
          {isZh
            ? "先选你正在处理的创作类型，再进入对应分类页按环节搜索"
            : "Start with your creation type, then search by workflow step inside the category page."}
        </h2>
        <p className="hero-copy hero-copy-lg">
          {isZh
            ? "目前站内的搜索入口分布在每个分类页第二屏。最稳的使用方式，是先进入写书、写文章、写文案、写报告、写论文或写课程，再按工作环节输入你当前要解决的问题。"
            : "The main search entry lives on the second screen of each category page. The clearest path is to open books, articles, copywriting, reports, academic writing, or courses first, then search by the exact task you need help with."}
        </p>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {categoryOrder.map((slug) => (
          <article key={slug} className="compact-category-card min-h-[260px]">
            <div>
              <h2 className="compact-category-title">{categoryChips[slug]}</h2>
              <p className="compact-category-subtitle">{categories[slug].subtitle}</p>
            </div>
            <p className="compact-category-copy">{categories[slug].copy}</p>
            <Link href={`/categories/${slug}#search-skills`} className="primary-button category-card-button">
              {isZh ? "进入这一类搜索" : "Search This Category"}
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
