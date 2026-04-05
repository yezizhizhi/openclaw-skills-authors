import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/lib/site-data";
import { getCategoryExplorerData } from "@/lib/skills-repository";
import { CategoryPageClient } from "./category-page-client";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  return {
    title: category.metaTitle,
    description: category.metaDescription,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const explorerData = await getCategoryExplorerData(category.slug);
  const workflowTags =
    explorerData?.workflowTags.length ? explorerData.workflowTags : category.workflowTags;
  const explorerScenarios = explorerData?.scenarios ?? [];
  const explorerSkills = explorerData?.skills ?? [];

  return (
    <CategoryPageClient
      category={category}
      workflowTags={workflowTags}
      explorerScenarios={explorerScenarios}
      explorerSkills={explorerSkills}
    />
  );
}
