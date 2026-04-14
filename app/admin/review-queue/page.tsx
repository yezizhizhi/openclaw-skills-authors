"use client";

import { AdminReviewQueueView } from "@/components/admin-review-queue-view";
import { useLanguage } from "@/components/language-provider";

export default function AdminReviewQueuePage() {
  const { language } = useLanguage();
  const isZh = language === "zh";

  return (
    <main className="site-shell section-gap pb-24">
      <section className="hero-center pt-6 md:pt-10">
        <h1 className="display-title hero-headline">{isZh ? "自动采集待审核队列" : "Auto-Ingest Review Queue"}</h1>
        <h2 className="hero-subheadline">
          {isZh ? "查看自动抓取后尚未自动发布的 Skills" : "Review auto-ingested skills that were held for manual review"}
        </h2>
        <p className="hero-copy hero-copy-lg">
          {isZh
            ? "这里会显示规则评分未达到自动发布阈值、字段不完整、或分类信心不足的 Skills，方便你集中处理。"
            : "This queue shows skills that missed the auto-publish threshold, have incomplete fields, or need a manual category/workflow check."}
        </p>
      </section>

      <AdminReviewQueueView />
    </main>
  );
}
