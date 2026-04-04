export type ExplorerScenario = {
  id: string;
  categorySlug: string;
  name: string;
  sortOrder: number;
  aliases: string[];
};

export type ExplorerSkill = {
  id: string;
  categorySlug: string;
  name: string;
  workflow: string;
  description: string;
  models: string[];
  tags: string[];
  badge?: string;
  sourceUrl: string | null;
  installMode: string;
  primaryAction: string;
  inputPreview: string;
  outputPreview: string;
  configSnippet: string;
  sortOrder: number;
  scenarioIds: string[];
};

export type CategoryExplorerData = {
  categorySlug: string;
  workflowTags: string[];
  scenarios: ExplorerScenario[];
  skills: ExplorerSkill[];
};

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function getSearchUnits(query: string) {
  const normalized = normalizeText(query);

  if (!normalized) {
    return [];
  }

  const units = new Set<string>([normalized]);

  normalized
    .split(/[\s,，、/|]+/)
    .filter((part) => part.length >= 2)
    .forEach((part) => units.add(part));

  if (/[\u4e00-\u9fff]/.test(normalized) && normalized.length >= 2) {
    for (let index = 0; index < normalized.length - 1; index += 1) {
      units.add(normalized.slice(index, index + 2));
    }
  }

  return Array.from(units);
}

function getScenarioTokens(scenario: ExplorerScenario) {
  return [scenario.name, ...scenario.aliases].map(normalizeText).filter(Boolean);
}

function getSkillHaystack(skill: ExplorerSkill, scenariosById: Map<string, ExplorerScenario>) {
  const scenarioTokens = skill.scenarioIds.flatMap((scenarioId) => {
    const scenario = scenariosById.get(scenarioId);
    return scenario ? [scenario.name, ...scenario.aliases] : [];
  });

  return [
    skill.name,
    skill.workflow,
    skill.description,
    skill.inputPreview,
    skill.outputPreview,
    skill.primaryAction,
    skill.badge ?? "",
    ...skill.models,
    ...skill.tags,
    ...scenarioTokens,
  ]
    .join(" ")
    .toLowerCase();
}

export function sortExplorerSkills(skills: ExplorerSkill[]) {
  return [...skills].sort((left, right) => {
    if (left.sortOrder !== right.sortOrder) {
      return left.sortOrder - right.sortOrder;
    }

    return left.name.localeCompare(right.name);
  });
}

export function searchExplorerSkills(data: CategoryExplorerData, query: string) {
  const normalized = normalizeText(query);

  if (!normalized) {
    return sortExplorerSkills(data.skills);
  }

  const units = getSearchUnits(normalized);
  const scenariosById = new Map(data.scenarios.map((scenario) => [scenario.id, scenario]));
  const scenarioScoreById = new Map<string, number>();

  for (const scenario of data.scenarios) {
    const tokens = getScenarioTokens(scenario);
    let scenarioScore = 0;

    for (const token of tokens) {
      if (token === normalized) {
        scenarioScore = Math.max(scenarioScore, 220);
      }

      for (const unit of units) {
        if (token.includes(unit)) {
          scenarioScore = Math.max(scenarioScore, 150);
        }
      }
    }

    if (scenarioScore > 0) {
      scenarioScoreById.set(scenario.id, scenarioScore);
    }
  }

  return data.skills
    .map((skill) => {
      const haystack = getSkillHaystack(skill, scenariosById);
      let score = 0;

      if (normalizeText(skill.name) === normalized) {
        score += 210;
      }

      if (normalizeText(skill.workflow) === normalized) {
        score += 180;
      }

      for (const scenarioId of skill.scenarioIds) {
        score += scenarioScoreById.get(scenarioId) ?? 0;
      }

      for (const unit of units) {
        if (haystack.includes(unit)) {
          score += 45;
        }
      }

      return {
        skill,
        score,
      };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => {
      if (left.score !== right.score) {
        return right.score - left.score;
      }

      if (left.skill.sortOrder !== right.skill.sortOrder) {
        return left.skill.sortOrder - right.skill.sortOrder;
      }

      return left.skill.name.localeCompare(right.skill.name);
    })
    .map((entry) => entry.skill);
}
