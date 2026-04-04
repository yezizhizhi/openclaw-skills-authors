import Link from "next/link";

const navItems = [
  { href: "/#categories", label: "快速搜索skills" },
  { href: "/submit-skills", label: "推荐/提交skills" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="site-shell sticky top-0 z-50 pt-5">
      <div className="header-shell">
        <Link href="/" className="header-brand">
          <div className="header-brand-mark">
            OC
          </div>
          <div className="min-w-0">
            <p className="header-brand-title">
              OPENCLAW SKILLS
            </p>
            <p className="header-brand-copy">
              为创作者筛选可直达的优质 Skills
            </p>
          </div>
        </Link>

        <nav className="header-nav ml-auto hidden md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="header-nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
