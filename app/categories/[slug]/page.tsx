import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategorySkillExplorer } from "@/components/category-skill-explorer";
import { categories, getCategoryBySlug } from "@/lib/site-data";

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
            {category.workflowTags.map((tag) => (
              <span key={tag} className="chip-link category-flow-chip">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="site-shell category-search-section section-gap" id="featured-skills">
        <div className="section-heading centered category-search-heading">
          <h2 className="section-title">输入你需要的场景，快速找到对应 Skills</h2>
          <p className="section-copy">试试输入当前工作环节，系统会优先输入匹配的skills</p>
        </div>

        <div className="mt-8">
          <CategorySkillExplorer
            categoryLabel={category.navLabel}
            workflowTags={category.workflowTags}
            skills={category.featuredSkills}
          />
        </div>
      </section>
    </main>
  );
}
