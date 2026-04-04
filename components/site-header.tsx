import Link from "next/link";

const navItems = [
  { href: "/#categories", label: "分类浏览" },
];

export function SiteHeader() {
  return (
    <header className="site-shell sticky top-0 z-50 pt-5">
      <div className="header-shell">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#3683f6,#0f6ef0)] text-sm font-bold text-white shadow-[0_14px_28px_rgba(54,131,246,0.2)]">
            OC
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-[0.16em] text-[var(--accent-ink)]">
              OPENCLAW SKILLS
            </p>
            <p className="truncate text-sm text-[var(--muted-ink)]">
              为作者与内容创作者整理的技能库原型
            </p>
          </div>
        </Link>

        <nav className="ml-auto hidden items-center gap-6 text-[15px] font-medium text-[var(--soft-ink)] md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[var(--accent)]">
              {item.label}
            </Link>
          ))}
          <Link href="/categories/books" className="secondary-button min-h-0 px-5 py-3">
            先看写书页
          </Link>
        </nav>
      </div>
    </header>
  );
}
