import Link from "next/link";

const navItems = [
  { href: "/search-skills", label: "快速搜索skills", emphasis: true },
  { href: "/submit-skills", label: "推荐/提交skills" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="site-shell sticky top-0 z-50 pt-5">
      <div className="header-shell">
        <Link href="/" className="flex min-w-0 items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#3683f6,#0f6ef0)] text-base font-bold text-white shadow-[0_14px_28px_rgba(54,131,246,0.2)]">
            OC
          </div>
          <div className="min-w-0">
            <p className="truncate text-[0.95rem] font-semibold tracking-[0.18em] text-[var(--accent-ink)]">
              OPENCLAW SKILLS
            </p>
            <p className="truncate text-sm text-[var(--muted-ink)]">
              为创作者筛选可直达的优质 Skills
            </p>
          </div>
        </Link>

        <nav className="header-nav ml-auto hidden md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={item.emphasis ? "header-primary-link" : "header-nav-link"}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
