import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/lib/site-data";
import { getCategoryExplorerData } from "@/lib/skills-repository";
import { getSiteUrl } from "@/lib/site-url";
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
  const siteUrl = getSiteUrl();

  if (!category) {
    return {};
  }

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    alternates: {
      canonical: `${siteUrl}/categories/${slug}`,
    },
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      url: `${siteUrl}/categories/${slug}`,
      images: [
        {
          url: `${siteUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: category.metaTitle,
        },
      ],
    },
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
