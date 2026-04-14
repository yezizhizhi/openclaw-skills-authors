"use client";

import { useState } from "react";
import { useLanguage } from "@/components/language-provider";

type CopyConfigButtonProps = {
  configSnippet: string;
  idleLabel?: string;
  successLabel?: string;
  trackingPayload?: Record<string, unknown>;
};

export function CopyConfigButton({
  configSnippet,
  idleLabel,
  successLabel,
  trackingPayload,
}: CopyConfigButtonProps) {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(configSnippet);
      if (trackingPayload) {
        void fetch("/api/track/skill", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...trackingPayload,
            eventType: "copy_config",
          }),
          keepalive: true,
        });
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      className={copied ? "secondary-button success skill-detail-button" : "primary-button skill-detail-button"}
      onClick={handleCopy}
    >
      {copied
        ? successLabel || (isZh ? "已复制" : "Copied")
        : idleLabel || (isZh ? "复制配置" : "Copy Config")}
    </button>
  );
}
