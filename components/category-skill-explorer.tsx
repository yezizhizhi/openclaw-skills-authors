"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";
import {
  searchExplorerSkills,
  type CategoryExplorerData,
  type ExplorerScenario,
  type ExplorerSkill,
} from "@/lib/skill-search";
import { useLanguage } from "@/components/language-provider";

type CategorySkillExplorerProps = {
  categorySlug: string;
  categoryLabel: string;
  workflowTags: string[];
  scenarios: ExplorerScenario[];
  skills: ExplorerSkill[];
};

export function CategorySkillExplorer({
  categorySlug,
  categoryLabel,
  workflowTags,
  scenarios,
  skills,
}: CategorySkillExplorerProps) {
  const { translations } = useLanguage();
  const { home, skillWorkflows, skillDescriptions } = translations;
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim();
  const explorerData: CategoryExplorerData = {
    categorySlug,
    workflowTags,
    scenarios,
    skills,
  };
  const filteredSkills = normalizedQuery ? searchExplorerSkills(explorerData, normalizedQuery) : [];

  return (
    <div className="explorer-shell">
      <div className="explorer-input-wrap">
        <input
          className="explorer-input"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={`${home.categoriesTitle} ${workflowTags.slice(0, 3).join(", ")}`}
        />
      </div>

      <div className="explorer-chip-row">
        {workflowTags.map((tag) => (
          <button
            key={tag}
            type="button"
            className="explorer-chip"
            onClick={() => setQuery(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <p className="explorer-meta">
        {normalizedQuery
          ? `${filteredSkills.length} ${home.spotlightTitle} ${normalizedQuery}`
          : `${home.categoriesDescription}`}
      </p>

      {filteredSkills.length ? (
        <div className="explorer-grid">
          {filteredSkills.map((skill) => (
            <article key={skill.name} className="explorer-card">
              <div>
                <p className="explorer-label">{home.spotlightName}</p>
                <h3 className="explorer-title">{skill.name}</h3>
              </div>

              <div className="explorer-block">
                <p className="explorer-label">{home.spotlightScene}</p>
                <p className="explorer-scene">
                  {categoryLabel} / {skillWorkflows[skill.workflow] || skill.workflow}
                </p>
              </div>

              <p className="explorer-copy">{skillDescriptions[skill.name] || skill.description}</p>

              {skill.sourceUrl ? (
                <a
                  href={skill.sourceUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="primary-button explorer-button"
                >
                  {home.spotlightCta}
                </a>
              ) : (
                <Link href={`/skills/${skill.id}`} className="secondary-button explorer-button">
                  {home.spotlightCta}
                </Link>
              )}
            </article>
          ))}
        </div>
      ) : null}

      {normalizedQuery && filteredSkills.length === 0 ? (
        <div className="explorer-empty">
          <p className="explorer-empty-title">{home.spotlightTitle}</p>
          <p className="explorer-empty-copy">
            {workflowTags[0]} / {workflowTags[1]}
          </p>
        </div>
      ) : null}

      {!normalizedQuery ? (
        <div className="explorer-empty">
          <p className="explorer-empty-title">{home.categoriesTitle}</p>
          <p className="explorer-empty-copy">
            {workflowTags[2]} / {workflowTags[3]}
          </p>
        </div>
      ) : null}
    </div>
  );
}
