 "use client";

import { AdminSubmissionsView } from "@/components/admin-submissions-view";
import { useLanguage } from "@/components/language-provider";

export default function AdminSkillSubmissionsPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";

  return (
    <main className="site-shell section-gap pb-24">
      <section className="hero-center pt-6 md:pt-10">
        <h1 className="display-title hero-headline">{isZh ? "后台提交列表" : "Admin Submission List"}</h1>
        <h2 className="hero-subheadline">
          {isZh ? "查看所有用户提交的 Skills 推荐记录" : "Review all skill recommendations submitted by users"}
        </h2>
        <p className="hero-copy hero-copy-lg">
          {isZh
            ? "这里会显示提交链接、技能包地址、推荐理由、提交账号与提交时间，方便你统一审核和后续收录。"
            : "This page shows submitted links, package addresses, recommendation notes, submitter accounts, and timestamps so you can review and curate them centrally."}
        </p>
      </section>

      <AdminSubmissionsView />
    </main>
  );
}
