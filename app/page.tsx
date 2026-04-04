import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { categories, editorChoices } from "@/lib/site-data";

export default function HomePage() {
  const featuredCategory = categories[0];
  const sideCategories = categories.slice(1);
  const spotlightSkills = editorChoices
    .filter((skill) => skill.sourceUrl)
    .slice(0, 3)
    .map((skill) => ({
      name: skill.name,
      scene: skill.description,
      tags: [skill.badge ?? "精选", skill.workflow, "可直达 ClawHub"],
      href: skill.sourceUrl as string,
    }));
  const reasonCards = [
    {
      title: "先找场景，再找 Skill",
      copy: "不是把工具堆给你自己筛，而是先按写书、写文章、写文案、写报告、写论文和写课程分门类整理，再按具体工作环节继续缩小范围。",
    },
    {
      title: "只收录可直接使用的 Skill",
      copy: "我们优先保留能稳定跳到 ClawHub 原 Skill 页的条目，不把你带去空页面或无效搜索结果。看到的精选卡和检索结果，目标都是点开就能继续安装和使用。",
    },
    {
      title: "精选与检索两条路都顺手",
      copy: "每个分类页都分成“本周精选 Skills”和“按场景检索”两层入口。你可以先看少量高频 Skill，也可以直接输入当前环节，更快找到真正对口的工具。",
    },
  ];
  const faqCards = [
    {
      question: "这个网站和直接去 ClawHub 搜 Skill，有什么区别？",
      answer:
        "这里不是把所有 Skill 原样堆给你自己筛，而是先按写书、写文章、写文案、写报告、写论文和写课程分门类整理，再按具体工作环节继续筛选。你看到的是已经按场景归类过的一层结果，找起来会更快。",
    },
    {
      question: "我是第一次来，应该先从哪里开始？",
      answer:
        "如果你还不确定从哪一个 Skill 开始，先看首页和各分类页里的“本周精选skills”；如果你已经知道自己卡在某个环节，比如选题、资料整理、大纲、正文或终稿质检，就直接进入对应分类页，用第二屏的搜索框按工作环节查找。",
    },
    {
      question: "这里的 Skill 都能直接跳到原始安装页吗？",
      answer:
        "我们的当前标准是：优先只保留能稳定跳到 ClawHub 原 Skill 页的条目。也就是说，放进精选卡和分类页搜索结果里的 Skill，会先经过直跳验证，尽量避免把你带去空页面、失效链接或只有搜索结果的中间页。",
    },
    {
      question: "如果某个 Skill 失效了，或者不适合当前场景怎么办？",
      answer:
        "我们会继续替换失效链接、补充更稳定的替代项，并逐步把每个分类页里的精选和搜索结果收紧成更高质量的可用集合。如果你点开后发现不对口，最稳的方式是回到分类页，按更具体的工作环节重新搜一轮。",
    },
    {
      question: "我可以推荐或提交想收录的 Skill 吗？",
      answer:
        "可以。最适合的方式是直接给出 Skill 名称或 ClawHub 链接。我们会先验证它能不能稳定打开、适合哪个创作环节、值不值得放进当前分类页，再决定是否收录进站内。",
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

              <a
                href={skill.href}
                target="_blank"
                rel="noreferrer noopener"
                className="primary-button spotlight-button"
              >
                前往 ClawHub ↗
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="site-shell section-gap">
        <div className="section-heading centered reason-heading">
          <h2 className="section-title">为什么创作者要选择这个skills库？</h2>
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

      <section className="site-shell section-gap" id="faq">
        <div className="section-heading centered faq-heading">
          <h2 className="section-title">常见问题</h2>
          <p className="section-description">先回答最常见的几个问题，帮你更快判断从哪一类、哪一个环节开始找。</p>
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
