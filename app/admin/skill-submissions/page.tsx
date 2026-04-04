import { AdminSubmissionsView } from "@/components/admin-submissions-view";

export default function AdminSkillSubmissionsPage() {
  return (
    <main className="site-shell section-gap pb-24">
      <section className="hero-center pt-6 md:pt-10">
        <h1 className="display-title hero-headline">后台提交列表</h1>
        <h2 className="hero-subheadline">查看所有用户提交的 Skills 推荐记录</h2>
        <p className="hero-copy hero-copy-lg">
          这里会显示提交链接、技能包地址、推荐理由、提交账号与提交时间，方便你统一审核和后续收录。
        </p>
      </section>

      <AdminSubmissionsView />
    </main>
  );
}
