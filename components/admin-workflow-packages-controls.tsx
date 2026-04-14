"use client";

import { useMemo, useState } from "react";
import { AuthDialogTrigger } from "@/components/auth-dialog-trigger";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

type RebuildResult = {
  template: string;
  package: string;
  assignedCount: number;
  totalSteps: number;
};

export function AdminWorkflowPackagesControls() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [results, setResults] = useState<RebuildResult[]>([]);

  async function handleRebuild() {
    if (!supabase) {
      setMessage("Supabase browser client is unavailable.");
      return;
    }

    setLoading(true);
    setMessage("");

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      setLoading(false);
      setMessage("Please sign in with an admin account first.");
      return;
    }

    try {
      const response = await fetch("/api/admin/workflow-packages/rebuild", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      const payload = (await response.json()) as {
        error?: string;
        ok?: boolean;
        results?: RebuildResult[];
      };

      if (!response.ok) {
        throw new Error(payload.error || "Failed to rebuild workflow packages.");
      }

      setResults(payload.results ?? []);
      setMessage("Workflow packages rebuilt successfully. Refresh the page to see the latest stats.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to rebuild workflow packages.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10 rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-soft)]">Admin Action</p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">Rebuild Workflow Packages</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted-ink)]">
            这会重新写入模板、步骤和 package-skill 关系，并按照当前已批准的 skills 再选一轮 package 组合。
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={handleRebuild} disabled={loading} className="primary-button disabled:opacity-60">
            {loading ? "重建中..." : "一键重建 Packages"}
          </button>
          <AuthDialogTrigger label="Admin Sign In" className="secondary-button" />
        </div>
      </div>

      {message ? <p className="mt-4 text-sm leading-7 text-[var(--soft-ink)]">{message}</p> : null}

      {results.length ? (
        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          {results.map((item) => (
            <article key={item.package} className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-4">
              <p className="text-sm font-semibold text-[var(--ink)]">{item.package}</p>
              <p className="mt-2 text-sm text-[var(--muted-ink)]">
                {item.assignedCount} / {item.totalSteps} steps assigned
              </p>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}
