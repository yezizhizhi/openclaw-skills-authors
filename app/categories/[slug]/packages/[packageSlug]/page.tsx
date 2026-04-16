import { notFound, redirect } from "next/navigation";
import { getCategoryBySlug } from "@/lib/site-data";
import { getWorkflowPackageDetail } from "@/lib/workflow-packages";

type CategoryPackageDetailPageProps = {
  params: Promise<{
    slug: string;
    packageSlug: string;
  }>;
};

export default async function CategoryPackageDetailPage({ params }: CategoryPackageDetailPageProps) {
  const { slug, packageSlug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const detail = await getWorkflowPackageDetail(packageSlug);

  if (!detail || detail.categorySlug !== category.slug) {
    notFound();
  }

  redirect(`/workflow-packages/${packageSlug}`);
}
