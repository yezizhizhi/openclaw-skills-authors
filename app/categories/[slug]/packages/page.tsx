import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/lib/site-data";
import { getSiteUrl } from "@/lib/site-url";
import { getWorkflowPackagesByCategory } from "@/lib/workflow-packages";
import { CategoryPackagesPageClient } from "@/app/categories/[slug]/packages/category-packages-page-client";

type CategoryPackagesPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPackagesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  return {
    title: `${category.metaTitle} Packages`,
    description: `Browse curated package bundles for ${category.metaTitle}.`,
    alternates: {
      canonical: `${getSiteUrl()}/categories/${slug}/packages`,
    },
  };
}

export default async function CategoryPackagesPage({ params }: CategoryPackagesPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const workflowPackages = await getWorkflowPackagesByCategory(category.slug);
  return <CategoryPackagesPageClient category={category} workflowPackages={workflowPackages} />;
}
