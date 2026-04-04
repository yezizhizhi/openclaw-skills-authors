"use client";

import { useState } from "react";

type CopyConfigButtonProps = {
  configSnippet: string;
  idleLabel?: string;
  successLabel?: string;
};

export function CopyConfigButton({
  configSnippet,
  idleLabel = "复制配置",
  successLabel = "已复制配置",
}: CopyConfigButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(configSnippet);
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
      {copied ? successLabel : idleLabel}
    </button>
  );
}
