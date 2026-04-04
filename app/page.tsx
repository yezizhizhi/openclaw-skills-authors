import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { categories } from "@/lib/site-data";

export default function HomePage() {
  const featuredCategory = categories[0];
  const sideCategories = categories.slice(1);
  const spotlightSkills = [
    {
      name: "Chapter Blueprint Forge",
      scene: "适用场景：长篇书稿、章节大纲、故事推进",
      tags: ["适合新手", "热门", "长篇创作"],
      href: "/skills/books-chapter-blueprint-forge",
    },
    {
      name: "Angle Finder Brief",
      scene: "适用场景：公众号选题、专栏切入、观点文章",
      tags: ["适合新手", "热门", "文章写作"],
      href: "/skills/articles-angle-finder-brief",
    },
    {
      name: "Literature Review Mapper",
      scene: "适用场景：文献整理、综述摘要、研究脉络梳理",
      tags: ["学术整理", "热门", "研究写作"],
      href: "/skills/academic-literature-review-mapper",
    },
  ];
  const reasonCards = [
    {
      title: "按创作流程筛选，找 Skill 更快",
      copy: "不是简单罗列工具，而是按照作者真实的工作流程进行筛选。你可以从题材进入，也可以从当前环节进入。",
    },
    {
      title: "更适合创作者的使用方式",
      copy: "我们优先保留与创作任务直接相关的功能说明，减少不必要的技术信息，让非技术背景的作者也能更快理解每个 Skill 的用途。",
    },
    {
      title: "安装路径更清晰",
      copy: "每个 Skill 都会标注适用场景、安装方式与使用入口，帮助你减少试错成本，更快进入创作状态。",
    },
  ];
  const faqCards = [
    {
      question: "OpenClaw Skills 适合完全没有技术背景的作者吗？",
      answer:
        "可以。我们会优先标注更容易上手的 Skills，并尽量用更直观的方式说明它们适合解决什么问题。",
    },
    {
      question: "我应该先按题材找，还是按流程找？",
      answer:
        "如果你已经知道自己在写书、写论文或写文案，建议先按题材浏览；如果你只是卡在某个步骤，比如大纲或润色，建议按流程找。",
    },
    {
      question: "所有 Skill 都支持直接复制配置吗？",
      answer:
        "不一定。不同 Skill 会提供复制配置、下载包或查看源文件中的一种或多种方式，具体以详情页标注为准。",
    },
    {
      question: "这些 Skill 会持续更新吗？",
      answer: "我们会定期同步来源更新，并尽量在卡片中标注最近检查时间和适用信息。",
    },
    {
      question: "我可以提交想收录的 Skill 吗？",
      answer:
        "可以。后续可以在站点里加入 Submit 页面，用于推荐适合作者使用的 OpenClaw Skills。",
    },
  ];

  return (
    <main className="pb-24">
      <section className="site-shell pt-10 md:pt-16">
        <div className="hero-center">
          <h1 className="display-title hero-headline">OpenClaw Skills for Authors</h1>
          <h2 className="hero-subheadline">
            一站式创作者skills库
            <br />
            覆盖写书、写文章、写文案、写报告、写论文、写课程
          </h2>
          <h3 className="hero-copy hero-copy-lg">
            我们将适合作者与内容创作者使用的 OpenClaw Skills 按题材与创作流程整理成清晰可用的技能库。你可以按写作场景快速找到合适的 Skill，通过复制配置或下载包，更高效地完成构思、写作、整理、润色与修订。
          </h3>

          <div className="hero-actions">
            <Link href="/#categories" className="primary-button">
              浏览全部 OpenClaw Skills
            </Link>
            <Link href="/install-guide" className="secondary-button">
              查看安装指南
            </Link>
          </div>

          <div className="hero-chip-row">
            {categories.map((category) => (
              <Link key={category.slug} href={`/categories/${category.slug}`} className="chip-link">
                {category.navLabel}
              </Link>
            ))}
          </div>
        </div>

      </section>

      <section className="site-shell section-gap" id="categories">
        <SectionHeading
          title="覆盖六大创作场景的 OpenClaw Skills"
          description="无论你正在创作长篇书稿、打磨自媒体内容、整理课程结构，还是撰写专业报告与学术论文，这里都能找到更贴近实际工作流需要的 OpenClaw Skills，帮助你更快进入高质量创作。"
          centered
        />

        <div className="category-grid mt-8">
          <article className="category-hero-card">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="preview-title">{featuredCategory.navLabel}</h2>
              </div>
            </div>
            <p className="mt-4 text-[15px] leading-8 text-[var(--muted-ink)]">
              {featuredCategory.cardSubtitle}
            </p>
            <p className="mt-4 text-[15px] leading-8 text-[var(--muted-ink)]">
              {featuredCategory.cardCopy}
            </p>
            <div className="mt-6">
              <Link
                href={`/categories/${featuredCategory.slug}`}
                className="primary-button category-card-button"
              >
                点击进入skills库
              </Link>
            </div>
          </article>

          {sideCategories.map((category) => (
            <article key={category.slug} className="compact-category-card">
              <div>
                <h3 className="compact-category-title">{category.navLabel}</h3>
                <p className="compact-category-subtitle">{category.cardSubtitle}</p>
              </div>
              <p className="compact-category-copy">{category.cardCopy}</p>
              <Link
                href={`/categories/${category.slug}`}
                className="primary-button category-card-button"
              >
                点击进入skills库
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="site-shell section-gap">
        <SectionHeading
          title="热门精选 Skills"
          description="从大量使用反馈中，挑出更好用的Skill"
          centered
        />

        <div className="spotlight-grid mt-8">
          {spotlightSkills.map((skill) => (
            <article key={skill.name} className="spotlight-card">
              <div>
                <p className="spotlight-label">Skill 名称：</p>
                <h3 className="spotlight-title">{skill.name}</h3>
              </div>

              <div className="spotlight-block">
                <p className="spotlight-label">适用场景：</p>
                <p className="spotlight-scene">{skill.scene.replace("适用场景：", "").trim()}</p>
              </div>

              <div className="spotlight-block">
                <p className="spotlight-label">标签：</p>
                <div className="spotlight-tags">
                  {skill.tags.map((tag) => (
                    <span key={tag} className="spotlight-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link href={skill.href} className="secondary-button spotlight-button">
                查看详情
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="site-shell section-gap">
        <div className="section-heading centered reason-heading">
          <h2 className="section-title">为什么作者会选择这个技能库？</h2>
        </div>

        <div className="reason-grid mt-8">
          {reasonCards.map((card) => (
            <article key={card.title} className="reason-card">
              <h3 className="reason-title">{card.title}</h3>
              <p className="reason-copy">{card.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-shell section-gap">
        <div className="section-heading centered faq-heading">
          <h2 className="section-title">FAQ区 常见问题</h2>
        </div>

        <div className="faq-list mt-8">
          {faqCards.map((item, index) => (
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
