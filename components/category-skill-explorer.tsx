"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";
import {
  searchExplorerSkills,
  type CategoryExplorerData,
  type ExplorerScenario,
  type ExplorerSkill,
} from "@/lib/skill-search";

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
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim();
  const explorerData: CategoryExplorerData = {
    categorySlug,
    workflowTags,
    scenarios,
    skills,
  };
  const filteredSkills = searchExplorerSkills(explorerData, normalizedQuery);

  return (
    <div className="explorer-shell">
      <div className="explorer-input-wrap">
        <input
          className="explorer-input"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={`输入你需要的场景，例如：${workflowTags.slice(0, 3).join("、")}`}
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
          ? `已为你找到 ${filteredSkills.length} 个与“${normalizedQuery}”相关的 ${categoryLabel} Skills`
          : `先输入场景，或直接从下方推荐的 ${categoryLabel} Skills 开始`}
      </p>

      <div className="explorer-grid">
        {filteredSkills.map((skill) => (
          <article key={skill.name} className="explorer-card">
            <div>
              <p className="explorer-label">Skill 名称</p>
              <h3 className="explorer-title">{skill.name}</h3>
            </div>

            <div className="explorer-block">
              <p className="explorer-label">适用场景</p>
              <p className="explorer-scene">
                {categoryLabel} / {skill.workflow}
              </p>
            </div>

            <p className="explorer-copy">{skill.description}</p>

            <Link href="/install-guide" className="secondary-button explorer-button">
              查看详情
            </Link>
          </article>
        ))}
      </div>

      {normalizedQuery && filteredSkills.length === 0 ? (
        <div className="explorer-empty">
          <p className="explorer-empty-title">暂时没有完全匹配的结果</p>
          <p className="explorer-empty-copy">
            试试输入更接近流程的词，比如“{workflowTags[0]}”或“{workflowTags[1]}”。
          </p>
        </div>
      ) : null}
    </div>
  );
}
