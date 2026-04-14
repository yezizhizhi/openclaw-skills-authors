import { notFound } from "next/navigation";
import { AdminWorkflowPackageEditor } from "@/components/admin-workflow-package-editor";
import { getWorkflowPackageDetail } from "@/lib/workflow-packages";

type AdminWorkflowPackageDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AdminWorkflowPackageDetailPage({ params }: AdminWorkflowPackageDetailPageProps) {
  const { slug } = await params;
  const detail = await getWorkflowPackageDetail(slug);

  if (!detail) {
    notFound();
  }

  return (
    <main className="site-shell section-gap pb-24">
      <section className="hero-center pt-6 md:pt-10">
        <h1 className="display-title hero-headline">{detail.name}</h1>
        <h2 className="hero-subheadline">手动替换单个 step 绑定的 skill</h2>
        <p className="hero-copy hero-copy-lg">
          这里会保留自动编排结果，但允许你对某一步做人工覆盖，适合需要更强运营控制的 package。
        </p>
      </section>

      <AdminWorkflowPackageEditor detail={detail} />
    </main>
  );
}
