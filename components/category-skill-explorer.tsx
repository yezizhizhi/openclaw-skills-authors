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
  const filteredSkills = normalizedQuery ? searchExplorerSkills(explorerData, normalizedQuery) : [];

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
          : `先输入具体工作环节，再查看我们已经筛过的 ${categoryLabel} Skills`}
      </p>

      {filteredSkills.length ? (
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

              {skill.sourceUrl ? (
                <a
                  href={skill.sourceUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="primary-button explorer-button"
                >
                  前往 ClawHub ↗
                </a>
              ) : (
                <Link href={`/skills/${skill.id}`} className="secondary-button explorer-button">
                  查看详情
                </Link>
              )}
            </article>
          ))}
        </div>
      ) : null}

      {normalizedQuery && filteredSkills.length === 0 ? (
        <div className="explorer-empty">
          <p className="explorer-empty-title">暂时没有完全匹配的结果</p>
          <p className="explorer-empty-copy">
            试试输入更接近流程的词，比如“{workflowTags[0]}”或“{workflowTags[1]}”。
          </p>
        </div>
      ) : null}

      {!normalizedQuery ? (
        <div className="explorer-empty">
          <p className="explorer-empty-title">先输入工作环节，再看对应 Skills</p>
          <p className="explorer-empty-copy">
            比如输入“{workflowTags[2]}”“{workflowTags[3]}”，系统会优先返回已经筛选过、可直跳 ClawHub 的结果。
          </p>
        </div>
      ) : null}
    </div>
  );
}
