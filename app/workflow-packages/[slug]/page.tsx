import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getStaticWorkflowPackageSlugs,
  getWorkflowPackageDetail,
} from "@/lib/workflow-packages";
import { getSiteUrl } from "@/lib/site-url";
import { WorkflowPackageDetailClient } from "@/app/workflow-packages/[slug]/workflow-package-detail-client";

type WorkflowPackagePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getStaticWorkflowPackageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: WorkflowPackagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = await getWorkflowPackageDetail(slug);

  if (!detail) {
    return {};
  }

  return {
    title: `${detail.name} | Workflow Package`,
    description: detail.description,
    alternates: {
      canonical: `${getSiteUrl()}/workflow-packages/${slug}`,
    },
  };
}

export default async function WorkflowPackageDetailPage({ params }: WorkflowPackagePageProps) {
  const { slug } = await params;
  const detail = await getWorkflowPackageDetail(slug);

  if (!detail) {
    notFound();
  }
  return <WorkflowPackageDetailClient detail={detail} />;
}
