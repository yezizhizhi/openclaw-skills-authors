import Link from "next/link";
import { categories } from "@/lib/site-data";

export default function SearchSkillsPage() {
  return (
    <main className="site-shell section-gap pb-24">
      <section className="hero-center pt-6 md:pt-10">
        <h1 className="display-title hero-headline">快速搜索 Skills</h1>
        <h2 className="hero-subheadline">先选你正在处理的创作类型，再进入对应分类页按环节搜索</h2>
        <p className="hero-copy hero-copy-lg">
          目前站内的搜索入口分布在每个分类页第二屏。最稳的使用方式，是先进入写书、写文章、写文案、写报告、写论文或写课程，再按工作环节输入你当前要解决的问题。
        </p>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <article key={category.slug} className="compact-category-card min-h-[260px]">
            <div>
              <h2 className="compact-category-title">{category.navLabel}</h2>
              <p className="compact-category-subtitle">{category.heroSubtitle}</p>
            </div>
            <p className="compact-category-copy">{category.heroDescription}</p>
            <Link href={`/categories/${category.slug}#search-skills`} className="primary-button category-card-button">
              进入这一类搜索
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
