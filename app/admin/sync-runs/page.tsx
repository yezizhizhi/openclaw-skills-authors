"use client";

import { AdminSyncRunsView } from "@/components/admin-sync-runs-view";
import { useLanguage } from "@/components/language-provider";

export default function AdminSyncRunsPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";

  return (
    <main className="site-shell section-gap pb-24">
      <section className="hero-center pt-6 md:pt-10">
        <h1 className="display-title hero-headline">{isZh ? "自动同步记录" : "Auto Sync Runs"}</h1>
        <h2 className="hero-subheadline">
          {isZh ? "查看 ClawHub / GitHub 抓取任务每天的执行情况" : "Monitor daily ingestion runs from ClawHub and GitHub"}
        </h2>
        <p className="hero-copy hero-copy-lg">
          {isZh
            ? "这里会显示每次同步抓取、标准化、自动发布和待审核数量，便于你判断任务是否稳定执行。"
            : "This page tracks fetched, normalized, published, and pending-review counts for each sync run."}
        </p>
      </section>

      <AdminSyncRunsView />
    </main>
  );
}
