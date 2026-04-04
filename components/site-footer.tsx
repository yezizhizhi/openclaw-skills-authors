import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-shell pb-8 pt-16">
      <div className="footer-shell px-6 py-8 md:px-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-[var(--accent-ink)]">
              OPENCLAW SKILLS FOR AUTHORS
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted-ink)]">
              这是一版独立的 Next.js + Tailwind 静态原型，用来先验证首页、分类页和 Skill 卡片的视觉节奏，再在下一阶段接入动态技能库。
            </p>
          </div>

          <div className="grid gap-3 text-sm text-[var(--soft-ink)] sm:grid-cols-2">
            <Link href="/" className="transition hover:text-[var(--accent)]">
              首页
            </Link>
            <Link href="/#categories" className="transition hover:text-[var(--accent)]">
              分类浏览
            </Link>
            <Link href="/categories/books" className="transition hover:text-[var(--accent)]">
              写书页
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
