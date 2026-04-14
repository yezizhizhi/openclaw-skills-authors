"use client";

import { AdminDigestRunsView } from "@/components/admin-digest-runs-view";

export default function AdminDigestRunsPage() {
  return (
    <main className="site-shell section-gap pb-24">
      <section className="hero-center pt-6 md:pt-10">
        <h1 className="display-title hero-headline">Weekly Digest</h1>
        <h2 className="hero-subheadline">查看每周摘要生成结果和近期点击 / 下载趋势</h2>
        <p className="hero-copy hero-copy-lg">
          这里会显示 weekly digest 的执行记录、最近新增 skills、更新的 workflow packages，以及最常被点击和下载的条目。
        </p>
      </section>

      <AdminDigestRunsView />
    </main>
  );
}
