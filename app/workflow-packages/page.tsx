import type { Metadata } from "next";
import { getWorkflowPackages } from "@/lib/workflow-packages";
import { getSiteUrl } from "@/lib/site-url";
import { WorkflowPackagesPageClient } from "@/app/workflow-packages/workflow-packages-page-client";

export const metadata: Metadata = {
  title: "Workflow Packages | OpenClaw Skills for Authors",
  description: "Download workflow-ready skill bundles for writing articles, reports, and academic work.",
  alternates: {
    canonical: `${getSiteUrl()}/workflow-packages`,
  },
};

export default async function WorkflowPackagesPage() {
  const packages = await getWorkflowPackages();
  return <WorkflowPackagesPageClient packages={packages} />;
}
