import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStaticSkillIds } from "@/lib/static-catalog";
import { getSkillDetail } from "@/lib/skills-repository";
import { getSiteUrl } from "@/lib/site-url";
import { SkillDetailClient } from "./skill-detail-client";

type SkillDetailPageProps = {
  params: Promise<{
    skillId: string;
  }>;
};

export async function generateStaticParams() {
  return getStaticSkillIds().map((skillId) => ({
    skillId,
  }));
}

export async function generateMetadata({ params }: SkillDetailPageProps): Promise<Metadata> {
  const { skillId } = await params;
  const skill = await getSkillDetail(skillId);
  const siteUrl = getSiteUrl();

  if (!skill) {
    return {};
  }

  return {
    title: skill.name,
    description: skill.description,
    alternates: {
      canonical: `${siteUrl}/skills/${skillId}`,
    },
    openGraph: {
      title: skill.name,
      description: skill.description,
      url: `${siteUrl}/skills/${skillId}`,
      images: [
        {
          url: `${siteUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: skill.name,
        },
      ],
    },
  };
}

function getStableSourceLink(
  skill: NonNullable<Awaited<ReturnType<typeof getSkillDetail>>>,
) {
  if (!skill.sourceUrl) {
    return null;
  }

  try {
    const sourceUrl = new URL(skill.sourceUrl);

    if (sourceUrl.hostname === "clawhub.ai") {
      const segments = sourceUrl.pathname.split("/").filter(Boolean);
      if (segments[0] === "skills") {
        return null;
      }
      return skill.sourceUrl;
    }

    return skill.sourceUrl;
  } catch {
    return skill.sourceUrl;
  }
}

function buildOpenClawPrompt(
  skill: NonNullable<Awaited<ReturnType<typeof getSkillDetail>>>,
) {
  const sourceLine = getStableSourceLink(skill) ?? "Not provided";
  const scenarioLine = skill.scenarioNames.length
    ? skill.scenarioNames.join(", ")
    : skill.workflow;

  const tagLine = skill.tags.length ? skill.tags.join(", ") : `${skill.categoryLabel}, ${skill.workflow}`;

  return [
    `OpenClaw Skill: ${skill.name}`,
    "",
    `Category: ${skill.categoryLabel}`,
    `Workflow: ${skill.workflow}`,
    `Use Case: ${scenarioLine}`,
    `Tags: ${tagLine}`,
    `Source: ${sourceLine}`,
    "",
    "Description:",
    skill.description,
    "",
    "Please follow this Skill's capabilities and output:",
    "1. Execution steps suitable for the current task",
    "2. Structured results you can directly continue writing from",
    "3. Suggestions for next steps if applicable",
  ].join("\n");
}

export default async function SkillDetailPage({ params }: SkillDetailPageProps) {
  const { skillId } = await params;
  const skill = await getSkillDetail(skillId);

  if (!skill) {
    notFound();
  }

  const stableSourceLink = getStableSourceLink(skill);
  const openClawPrompt = buildOpenClawPrompt(skill);

  return (
    <SkillDetailClient
      skill={skill}
      openClawPrompt={openClawPrompt}
      stableSourceLink={stableSourceLink}
    />
  );
}
