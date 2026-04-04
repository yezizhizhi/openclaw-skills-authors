import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategorySkillExplorer } from "@/components/category-skill-explorer";
import { categories, getCategoryBySlug } from "@/lib/site-data";
import { getCategoryExplorerData } from "@/lib/skills-repository";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  return {
    title: category.metaTitle,
    description: category.metaDescription,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const explorerData = await getCategoryExplorerData(category.slug);
  const workflowTags =
    explorerData?.workflowTags.length ? explorerData.workflowTags : category.workflowTags;
  const explorerScenarios = explorerData?.scenarios ?? [];
  const explorerSkills = explorerData?.skills ?? [];

  const heroCtas: Record<string, { primary: string; secondary: string }> = {
    books: {
      primary: "浏览写书 Skills",
      secondary: "查看长篇创作安装指南",
    },
    articles: {
      primary: "浏览写文章 Skills",
      secondary: "查看文章写作安装指南",
    },
    copywriting: {
      primary: "浏览写文案 Skills",
      secondary: "查看文案创作安装指南",
    },
    reports: {
      primary: "浏览写报告 Skills",
      secondary: "查看报告写作安装指南",
    },
    academic: {
      primary: "浏览写论文 Skills",
      secondary: "查看学术写作安装指南",
    },
    courses: {
      primary: "浏览写课程 Skills",
      secondary: "查看课程制作安装指南",
    },
  };
  const currentHeroCtas = heroCtas[category.slug];

  return (
    <main className="pb-24">
      <section className="site-shell category-page-shell pt-10 md:pt-16">
        <div className="hero-center category-page-hero">
          <h1 className="display-title hero-headline category-page-title">{category.heroTitle}</h1>
          <h2 className="hero-subheadline category-page-subtitle">{category.heroSubtitle}</h2>
          <h3 className="hero-copy hero-copy-lg category-page-copy">{category.heroDescription}</h3>

          <div className="hero-actions">
            <Link href="#featured-skills" className="primary-button">
              {currentHeroCtas.primary}
            </Link>
            <Link href="/install-guide" className="secondary-button">
              {currentHeroCtas.secondary}
            </Link>
          </div>

          <div className="hero-chip-row category-flow-row">
            {workflowTags.map((tag) => (
              <span key={tag} className="chip-link category-flow-chip">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="site-shell section-gap" id="featured-skills">
        <div className="section-heading centered category-search-heading">
          <h2 className="section-title">{category.navLabel}类别的精选 Skills</h2>
          <p className="section-copy">先看少量更通用、更高频的优质 Skills，不把所有结果一次堆给你。</p>
        </div>

        <div className="grid gap-4 mt-8 md:grid-cols-3">
          {category.featuredSkills.map((skill) => (
            <article key={skill.name} className="category-skill-card">
              <div>
                <p className="category-card-label">精选 Skill</p>
                <h3 className="category-skill-title">{skill.name}</h3>
              </div>

              <div className="category-skill-block">
                <p className="category-skill-scene">
                  {category.navLabel} / {skill.workflow}
                </p>
              </div>

              <p className="category-skill-copy">{skill.description}</p>

              {skill.sourceUrl ? (
                <a
                  href={skill.sourceUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="primary-button category-skill-button"
                >
                  前往 ClawHub ↗
                </a>
              ) : (
                <Link href={`/skills/${category.slug}-${skill.name.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-").replace(/^-+|-+$/g, "")}`} className="secondary-button category-skill-button">
                  查看详情
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="site-shell category-search-section section-gap" id="search-skills">
        <div className="section-heading centered category-search-heading">
          <h2 className="section-title">输入你需要的场景，快速找到对应 Skills</h2>
          <p className="section-copy">试试输入当前工作环节，系统会优先输入匹配的skills</p>
        </div>

        <div className="mt-8">
          <CategorySkillExplorer
            categorySlug={category.slug}
            categoryLabel={category.navLabel}
            workflowTags={workflowTags}
            scenarios={explorerScenarios}
            skills={explorerSkills}
          />
        </div>
      </section>
    </main>
  );
}
