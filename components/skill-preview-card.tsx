"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { SkillPreview } from "@/lib/site-data";

type SkillPreviewCardProps = {
  skill: SkillPreview;
  compact?: boolean;
};

export function SkillPreviewCard({ skill, compact = false }: SkillPreviewCardProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timer = window.setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(skill.configSnippet);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article className={`skill-card-shell ${compact ? "compact" : "featured"}`}>
      <div className="skill-header">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            {skill.badge ? <span className="stamp-badge">{skill.badge}</span> : null}
            <span className="skill-meta">{skill.version}</span>
          </div>
          <h3 className="skill-title">{skill.name}</h3>
          <p className="skill-workflow">流程：{skill.workflow}</p>
        </div>

        <div className="skill-models">
          {skill.models.map((model) => (
            <span key={model} className="model-pill">
              {model}
            </span>
          ))}
        </div>
      </div>

      <p className="skill-copy">{skill.description}</p>

      {compact ? (
        <div className="compact-preview">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-ink)]">
            Preview
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--soft-ink)]">
            <span className="font-semibold text-[var(--ink)]">Before:</span> {skill.inputPreview}
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--soft-ink)]">
            <span className="font-semibold text-[var(--accent)]">After:</span> {skill.outputPreview}
          </p>
        </div>
      ) : (
        <div className="compare-grid">
          <div className="compare-pane input">
            <p className="compare-label">Input</p>
            <p className="compare-copy">{skill.inputPreview}</p>
          </div>
          <div className="compare-pane output">
            <p className="compare-label accent">Output</p>
            <p className="compare-copy strong">{skill.outputPreview}</p>
          </div>
        </div>
      )}

      <div className={`skill-actions ${compact ? "compact" : ""}`}>
        <Link href="/install-guide" className="primary-button flex-1">
          {skill.primaryAction}
        </Link>
        <button
          type="button"
          className={`secondary-button flex-1 cursor-pointer ${copied ? "success" : ""}`}
          onClick={handleCopy}
        >
          {copied ? "Success!" : "Copy Config"}
        </button>
      </div>

      {!compact ? (
        <details className="code-shell">
          <summary>查看逻辑</summary>
          <pre>
            <code>{skill.configSnippet}</code>
          </pre>
        </details>
      ) : null}
    </article>
  );
}
