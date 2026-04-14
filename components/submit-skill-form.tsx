"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { AuthDialogTrigger } from "@/components/auth-dialog-trigger";
import { useLanguage } from "@/components/language-provider";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

function getSubmitterEmail(session: Session | null) {
  const user = session?.user;
  if (!user) return "";
  return user.email || user.phone || "";
}

export function SubmitSkillForm() {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [skillLink, setSkillLink] = useState("");
  const [skillPackage, setSkillPackage] = useState("");
  const [recommendationReason, setRecommendationReason] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) return;

    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session ?? null);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase || !session?.user) {
      setError(isZh ? "请先登录后再提交推荐。" : "Please sign in before submitting a recommendation.");
      return;
    }

    setBusy(true);
    setError("");
    setMessage("");

    const trimmedLink = skillLink.trim();
    const trimmedPackage = skillPackage.trim();
    const trimmedReason = recommendationReason.trim();

    if (!trimmedLink && !trimmedPackage) {
      setError(
        isZh
          ? "请至少填写一个 Skills 链接或 Skills 包地址。"
          : "Please provide at least one skill link or skill package address.",
      );
      setBusy(false);
      return;
    }

    const { error: insertError } = await supabase.from("skill_submissions").insert({
      skill_link: trimmedLink || null,
      skill_package: trimmedPackage || null,
      recommendation_reason: trimmedReason,
      submitter_email: getSubmitterEmail(session),
      submitter_user_id: session.user.id,
    });

    if (insertError) {
      setError(insertError.message);
      setBusy(false);
      return;
    }

    setSkillLink("");
    setSkillPackage("");
    setRecommendationReason("");
    setMessage(isZh ? "感谢你的推荐！" : "Thanks for your recommendation!");
    setBusy(false);
  }

  if (!session) {
    return (
      <div className="grid gap-5 text-center">
        <p className="text-[1rem] leading-8 text-[var(--muted-ink)]">
          {isZh
            ? "推荐提交需要先登录，这样我们才能记录推荐来源，并在后续收录时和你同步结果。"
            : "You need to sign in before submitting so we can track the source of the recommendation and follow up if it gets included."}
        </p>
        <div className="mx-auto w-full max-w-sm">
          <AuthDialogTrigger
            label={isZh ? "登录后提交推荐" : "Sign In to Submit"}
            className="primary-button w-full"
          />
        </div>
      </div>
    );
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <label className="grid gap-3">
        <span className="text-sm font-semibold tracking-[0.08em] text-[var(--accent-soft)]">
          {isZh ? "Skills 链接" : "Skill Link"}
        </span>
        <input
          type="url"
          value={skillLink}
          onChange={(event) => setSkillLink(event.target.value)}
          placeholder={isZh ? "例如：https://clawhub.ai/... " : "Example: https://clawhub.ai/..."}
          className="submission-input"
        />
      </label>

      <label className="grid gap-3">
        <span className="text-sm font-semibold tracking-[0.08em] text-[var(--accent-soft)]">
          {isZh ? "Skills 包地址" : "Skill Package Address"}
        </span>
        <input
          type="text"
          value={skillPackage}
          onChange={(event) => setSkillPackage(event.target.value)}
          placeholder={
            isZh
              ? "例如：GitHub Releases、Google Drive 或其它可安装包地址"
              : "Example: GitHub Releases, Google Drive, or another installable package link"
          }
          className="submission-input"
        />
      </label>

      <label className="grid gap-3">
        <span className="text-sm font-semibold tracking-[0.08em] text-[var(--accent-soft)]">
          {isZh ? "为什么推荐" : "Why Recommend It"}
        </span>
        <textarea
          rows={6}
          value={recommendationReason}
          onChange={(event) => setRecommendationReason(event.target.value)}
          placeholder={
            isZh
              ? "简单写一下它适合哪个创作环节、为什么值得收录。"
              : "Briefly explain which workflow it fits and why it should be included."
          }
          className="submission-input submission-textarea"
          required
        />
      </label>

      <div className="flex justify-center pt-2">
        <button type="submit" className="secondary-button" disabled={busy}>
          {busy ? (isZh ? "提交中..." : "Submitting...") : isZh ? "提交推荐" : "Submit Recommendation"}
        </button>
      </div>

      {error ? <p className="text-center text-sm text-[var(--accent-soft)]">{error}</p> : null}
      <p className="text-center text-[1rem] font-semibold text-[var(--soft-ink)]">
        {message || (isZh ? "感谢你的推荐！" : "Thanks for your recommendation!")}
      </p>
    </form>
  );
}
