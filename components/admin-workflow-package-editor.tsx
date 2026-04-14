"use client";

import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { AuthDialogTrigger } from "@/components/auth-dialog-trigger";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { WorkflowPackageDetail } from "@/lib/workflow-packages";

type Candidate = {
  skillVersionId: string;
  name: string;
  description: string;
  sourceType: string;
  sourceUrl: string | null;
  categorySlug: string | null;
  workflow: string;
  finalScore: number;
  preferredHits: number;
};

type AdminWorkflowPackageEditorProps = {
  detail: WorkflowPackageDetail;
};

export function AdminWorkflowPackageEditor({ detail }: AdminWorkflowPackageEditorProps) {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [message, setMessage] = useState("");
  const [loadingStepId, setLoadingStepId] = useState("");
  const [candidatesByStepId, setCandidatesByStepId] = useState<Record<string, Candidate[]>>({});
  const [selectedByStepId, setSelectedByStepId] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!supabase) {
      return;
    }

    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session ?? null);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (mounted) {
        setSession(nextSession);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  async function loadCandidates(templateStepId: string) {
    if (!session?.access_token) {
      setMessage("Please sign in with an admin account first.");
      return;
    }

    setLoadingStepId(templateStepId);
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/workflow-packages/candidates?packageId=${encodeURIComponent(detail.id)}&templateStepId=${encodeURIComponent(templateStepId)}`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
          cache: "no-store",
        },
      );
      const payload = (await response.json()) as {
        error?: string;
        candidates?: Candidate[];
      };

      if (!response.ok) {
        throw new Error(payload.error || "Failed to load candidates.");
      }

      setCandidatesByStepId((current) => ({
        ...current,
        [templateStepId]: payload.candidates ?? [],
      }));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to load candidates.");
    } finally {
      setLoadingStepId("");
    }
  }

  async function replaceSkill(templateStepId: string) {
    const skillVersionId = selectedByStepId[templateStepId];
    if (!skillVersionId) {
      setMessage("Pick a candidate first.");
      return;
    }

    if (!session?.access_token) {
      setMessage("Please sign in with an admin account first.");
      return;
    }

    setLoadingStepId(templateStepId);
    setMessage("");

    try {
      const response = await fetch("/api/admin/workflow-packages/override", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageId: detail.id,
          templateStepId,
          skillVersionId,
        }),
      });

      const payload = (await response.json()) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error || "Failed to replace skill.");
      }

      setMessage("Override saved. Refresh the page to see the updated package selection.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to replace skill.");
    } finally {
      setLoadingStepId("");
    }
  }

  if (!session) {
    return (
      <section className="mt-10 rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6">
        <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">Admin Sign In Required</h2>
        <p className="mt-3 text-sm leading-7 text-[var(--muted-ink)]">
          只有管理员账号可以替换 workflow 某一步当前绑定的 skill。
        </p>
        <div className="mt-5">
          <AuthDialogTrigger label="Admin Sign In" className="primary-button" />
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10 space-y-5">
      {message ? (
        <div className="rounded-[18px] border border-[var(--line)] bg-[var(--panel)] p-4 text-sm leading-7 text-[var(--soft-ink)]">
          {message}
        </div>
      ) : null}

      {detail.steps.map((step) => {
        const stepId = step.templateStepId || step.id;
        const candidates = candidatesByStepId[stepId] ?? [];

        return (
          <article key={step.id} className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-[var(--ink)]">{step.stepName}</h2>
                <p className="mt-2 text-sm leading-7 text-[var(--muted-ink)]">{step.stepDescription}</p>
                <p className="mt-3 text-sm text-[var(--soft-ink)]">
                  当前 Skill：<strong>{step.selectedSkill.name}</strong>
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted-ink)]">{step.selectedSkill.selectionReason}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => void loadCandidates(stepId)}
                  disabled={loadingStepId === stepId}
                  className="secondary-button disabled:opacity-60"
                >
                  {loadingStepId === stepId ? "Loading..." : "Load Candidates"}
                </button>
              </div>
            </div>

            {candidates.length ? (
              <div className="mt-5 space-y-3">
                <select
                  className="w-full rounded-[16px] border border-[var(--line)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-[var(--ink)]"
                  value={selectedByStepId[stepId] ?? ""}
                  onChange={(event) =>
                    setSelectedByStepId((current) => ({
                      ...current,
                      [stepId]: event.target.value,
                    }))
                  }
                >
                  <option value="">Select a candidate...</option>
                  {candidates.map((candidate) => (
                    <option key={candidate.skillVersionId} value={candidate.skillVersionId}>
                      {candidate.name} | score {candidate.finalScore} | {candidate.sourceType}
                    </option>
                  ))}
                </select>

                <div className="grid gap-3 lg:grid-cols-2">
                  {candidates.slice(0, 6).map((candidate) => (
                    <article key={candidate.skillVersionId} className="rounded-[18px] border border-[var(--line)] bg-[rgba(255,255,255,0.02)] p-4">
                      <p className="text-sm font-semibold text-[var(--ink)]">{candidate.name}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[var(--accent-soft)]">
                        score {candidate.finalScore} / hits {candidate.preferredHits}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[var(--muted-ink)]">{candidate.description}</p>
                    </article>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => void replaceSkill(stepId)}
                  disabled={loadingStepId === stepId || !selectedByStepId[stepId]}
                  className="primary-button disabled:opacity-60"
                >
                  {loadingStepId === stepId ? "Saving..." : "Replace Step Skill"}
                </button>
              </div>
            ) : null}
          </article>
        );
      })}
    </section>
  );
}
