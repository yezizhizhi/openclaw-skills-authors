import "server-only";
import type { CategoryExplorerData, ExplorerScenario, ExplorerSkill } from "@/lib/skill-search";
import { categories } from "@/lib/site-data";
import { getStaticCategoryExplorerData, getStaticSkillDetail, type StaticSkillDetail } from "@/lib/static-catalog";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type DbScenarioRow = {
  id: string;
  category_slug: string;
  name: string;
  sort_order: number;
};

type DbScenarioAliasRow = {
  scenario_id: string;
  alias: string;
};

type DbSkillRow = {
  id: string;
  category_slug: string;
  name: string;
  workflow: string;
  description: string;
  source_url: string | null;
  install_mode: string;
  primary_action: string;
  badge: string | null;
  models: string[] | null;
  tags: string[] | null;
  input_preview: string;
  output_preview: string;
  config_snippet: string;
  sort_order: number;
  is_published: boolean;
};

type DbSkillScenarioRow = {
  skill_id: string;
  scenario_id: string;
  sort_order: number;
  relevance_score: number;
};

type DbCategoryRow = {
  slug: string;
  label: string;
};

export type SkillDetail = StaticSkillDetail;

function getCanonicalSkillName(skillName: string) {
  return skillName;
}

function getFallback(categorySlug: string) {
  return getStaticCategoryExplorerData(categorySlug);
}

function logFallback(categorySlug: string, reason: string) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[skills-repository] Fallback to static catalog for ${categorySlug}: ${reason}`);
  }
}

function normalizeSkills(
  categorySlug: string,
  scenarios: ExplorerScenario[],
  skills: DbSkillRow[],
  mappings: DbSkillScenarioRow[],
) {
  const mappingsBySkillId = new Map<string, DbSkillScenarioRow[]>();

  for (const mapping of mappings) {
    const currentMappings = mappingsBySkillId.get(mapping.skill_id) ?? [];
    currentMappings.push(mapping);
    mappingsBySkillId.set(mapping.skill_id, currentMappings);
  }

  const scenarioIdByName = new Map(scenarios.map((scenario) => [scenario.name, scenario.id]));

  return skills.map<ExplorerSkill>((skill) => {
    const explicitMappings = (mappingsBySkillId.get(skill.id) ?? [])
      .sort((left, right) => {
        if (left.sort_order !== right.sort_order) {
          return left.sort_order - right.sort_order;
        }

        return right.relevance_score - left.relevance_score;
      })
      .map((mapping) => mapping.scenario_id);

    const fallbackScenarioId = scenarioIdByName.get(skill.workflow);
    const scenarioIds = explicitMappings.length
      ? explicitMappings
      : fallbackScenarioId
        ? [fallbackScenarioId]
        : [];

    return {
      id: skill.id,
      categorySlug,
      name: getCanonicalSkillName(skill.name),
      workflow: skill.workflow,
      description: skill.description,
      models: skill.models ?? [],
      tags: skill.tags ?? [],
      badge: skill.badge ?? undefined,
      sourceUrl: skill.source_url,
      installMode: skill.install_mode,
      primaryAction: skill.primary_action,
      inputPreview: skill.input_preview,
      outputPreview: skill.output_preview,
      configSnippet: skill.config_snippet,
      sortOrder: skill.sort_order,
      scenarioIds,
    };
  });
}

export async function getCategoryExplorerData(categorySlug: string): Promise<CategoryExplorerData | null> {
  const fallback = getFallback(categorySlug);

  if (categorySlug === "books") {
    return fallback;
  }

  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return fallback;
  }

  try {
    const { data: scenarioRows, error: scenariosError } = await supabase
      .from("scenarios")
      .select("id, category_slug, name, sort_order")
      .eq("category_slug", categorySlug)
      .order("sort_order", { ascending: true });

    if (scenariosError || !scenarioRows?.length) {
      logFallback(categorySlug, scenariosError?.message ?? "No scenarios found");
      return fallback;
    }

    const scenarioIds = scenarioRows.map((scenario) => scenario.id);

    const { data: aliasRows, error: aliasesError } = await supabase
      .from("scenario_aliases")
      .select("scenario_id, alias")
      .in("scenario_id", scenarioIds);

    if (aliasesError) {
      logFallback(categorySlug, aliasesError.message);
      return fallback;
    }

    const aliasesByScenarioId = new Map<string, string[]>();

    for (const aliasRow of (aliasRows ?? []) as DbScenarioAliasRow[]) {
      const currentAliases = aliasesByScenarioId.get(aliasRow.scenario_id) ?? [];
      currentAliases.push(aliasRow.alias);
      aliasesByScenarioId.set(aliasRow.scenario_id, currentAliases);
    }

    const scenarios = (scenarioRows as DbScenarioRow[]).map<ExplorerScenario>((scenario) => ({
      id: scenario.id,
      categorySlug: scenario.category_slug,
      name: scenario.name,
      sortOrder: scenario.sort_order,
      aliases: aliasesByScenarioId.get(scenario.id) ?? [],
    }));

    const { data: skillRows, error: skillsError } = await supabase
      .from("skills")
      .select(
        "id, category_slug, name, workflow, description, source_url, install_mode, primary_action, badge, models, tags, input_preview, output_preview, config_snippet, sort_order, is_published",
      )
      .eq("category_slug", categorySlug)
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (skillsError || !skillRows?.length) {
      logFallback(categorySlug, skillsError?.message ?? "No published skills found");
      return fallback;
    }

    const { data: mappingRows, error: mappingsError } = await supabase
      .from("skill_scenarios")
      .select("skill_id, scenario_id, sort_order, relevance_score")
      .in("scenario_id", scenarioIds);

    if (mappingsError) {
      logFallback(categorySlug, mappingsError.message);
      return fallback;
    }

    const skills = normalizeSkills(
      categorySlug,
      scenarios,
      skillRows as DbSkillRow[],
      (mappingRows ?? []) as DbSkillScenarioRow[],
    );

    return {
      categorySlug,
      workflowTags: scenarios.map((scenario) => scenario.name),
      scenarios,
      skills,
    };
  } catch (error) {
    logFallback(categorySlug, error instanceof Error ? error.message : "Unknown error");
    return fallback;
  }
}

export async function getSkillDetail(skillId: string): Promise<SkillDetail | null> {
  const fallback = getStaticSkillDetail(skillId);

  if (skillId.startsWith("books-")) {
    return fallback;
  }

  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return fallback;
  }

  try {
    const { data: skillRow, error: skillError } = await supabase
      .from("skills")
      .select(
        "id, category_slug, name, workflow, description, source_url, install_mode, primary_action, badge, models, tags, input_preview, output_preview, config_snippet, sort_order, is_published",
      )
      .eq("id", skillId)
      .eq("is_published", true)
      .maybeSingle();

    if (skillError || !skillRow) {
      logFallback(skillId, skillError?.message ?? "Skill not found");
      return fallback;
    }

    const categoryMeta = categories.find((category) => category.slug === skillRow.category_slug);

    if (!categoryMeta) {
      logFallback(skillId, "Category metadata not found");
      return fallback;
    }

    const { data: categoryRow, error: categoryError } = await supabase
      .from("categories")
      .select("slug, label")
      .eq("slug", skillRow.category_slug)
      .maybeSingle();

    if (categoryError) {
      logFallback(skillId, categoryError.message);
      return fallback;
    }

    const { data: scenarioRows, error: scenariosError } = await supabase
      .from("scenarios")
      .select("id, category_slug, name, sort_order")
      .eq("category_slug", skillRow.category_slug)
      .order("sort_order", { ascending: true });

    if (scenariosError || !scenarioRows?.length) {
      logFallback(skillId, scenariosError?.message ?? "No scenarios found for skill");
      return fallback;
    }

    const { data: mappings, error: mappingsError } = await supabase
      .from("skill_scenarios")
      .select("skill_id, scenario_id, sort_order, relevance_score")
      .eq("skill_id", skillId)
      .order("sort_order", { ascending: true });

    if (mappingsError) {
      logFallback(skillId, mappingsError.message);
      return fallback;
    }

    const scenarios = (scenarioRows as DbScenarioRow[]).map<ExplorerScenario>((scenario) => ({
      id: scenario.id,
      categorySlug: scenario.category_slug,
      name: scenario.name,
      sortOrder: scenario.sort_order,
      aliases: [],
    }));

    const normalizedSkill = normalizeSkills(
      skillRow.category_slug,
      scenarios,
      [skillRow as DbSkillRow],
      (mappings ?? []) as DbSkillScenarioRow[],
    )[0];

    const scenarioNameById = new Map(scenarios.map((scenario) => [scenario.id, scenario.name]));

    return {
      ...normalizedSkill,
      categoryLabel: (categoryRow as DbCategoryRow | null)?.label ?? categoryMeta.navLabel,
      categoryTitle: categoryMeta.heroTitle,
      categorySubtitle: categoryMeta.heroSubtitle,
      categoryDescription: categoryMeta.heroDescription,
      workflowTags: categoryMeta.workflowTags,
      scenarioNames: normalizedSkill.scenarioIds
        .map((scenarioId) => scenarioNameById.get(scenarioId))
        .filter((value): value is string => Boolean(value)),
    };
  } catch (error) {
    logFallback(skillId, error instanceof Error ? error.message : "Unknown error");
    return fallback;
  }
}
