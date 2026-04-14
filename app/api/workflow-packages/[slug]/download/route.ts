import JSZip from "jszip";
import { NextResponse } from "next/server";
import { getWorkflowPackageDetail } from "@/lib/workflow-packages";

type RouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteProps) {
  const { slug } = await params;
  const detail = await getWorkflowPackageDetail(slug);

  if (!detail) {
    return NextResponse.json({ error: "Workflow package not found." }, { status: 404 });
  }

  const zip = new JSZip();

  const manifest = {
    id: detail.id,
    slug: detail.slug,
    name: detail.name,
    version: detail.version,
    category: detail.categorySlug,
    audience: detail.audience,
    goal: detail.goal,
    template: detail.templateName,
    status: detail.status,
    steps: detail.steps.map((step, index) => ({
      order: index + 1,
      step_key: step.stepKey,
      step_name: step.stepName,
      required: step.isRequired,
      selected_skill: step.selectedSkill,
      input_contract: step.inputContract,
      output_contract: step.outputContract,
    })),
  };

  const workflowMarkdown = [
    `# ${detail.name}`,
    "",
    `Version: ${detail.version}`,
    `Audience: ${detail.audience}`,
    `Goal: ${detail.goal}`,
    "",
    "## Steps",
    ...detail.steps.flatMap((step, index) => [
      `${index + 1}. ${step.stepName}`,
      `   - Why: ${step.stepDescription}`,
      `   - Skill: ${step.selectedSkill.name}`,
      `   - Reason: ${step.selectedSkill.selectionReason}`,
    ]),
    "",
  ].join("\n");

  zip.file("manifest.json", JSON.stringify(manifest, null, 2));
  zip.file("workflow.md", workflowMarkdown);
  zip.file(
    "skills.json",
    JSON.stringify(
      detail.steps.map((step, index) => ({
        order: index + 1,
        step: step.stepName,
        selected_skill: step.selectedSkill,
      })),
      null,
      2,
    ),
  );

  detail.steps.forEach((step, index) => {
    zip.file(
      `prompts/step-${String(index + 1).padStart(2, "0")}-${step.stepKey}.md`,
      [
        `# ${step.stepName}`,
        "",
        `Goal: ${step.stepDescription}`,
        "",
        "## Input Contract",
        ...Object.entries(step.inputContract).map(([key, value]) => `- ${key}: ${value}`),
        "",
        "## Output Contract",
        ...Object.entries(step.outputContract).map(([key, value]) => `- ${key}: ${value}`),
        "",
        `Selected Skill: ${step.selectedSkill.name}`,
        `Selection Reason: ${step.selectedSkill.selectionReason}`,
        step.selectedSkill.sourceUrl ? `Source URL: ${step.selectedSkill.sourceUrl}` : "",
        "",
      ].filter(Boolean).join("\n"),
    );
  });

  const buffer = await zip.generateAsync({ type: "arraybuffer", compression: "DEFLATE" });
  const file = new Blob([buffer], { type: "application/zip" });

  return new NextResponse(file, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${detail.slug}-${detail.version}.zip"`,
      "Cache-Control": "no-store",
    },
  });
}
