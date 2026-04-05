"use client";

import { useEffect, useRef, useState } from "react";
import { languageOptions } from "@/lib/i18n";
import { useLanguage } from "@/components/language-provider";

export function LanguageSwitcher() {
  const { language, setLanguage, translations } = useLanguage();
  const [open, setOpen] = useState(false);
  const shellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!shellRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const currentLabel =
    languageOptions.find((option) => option.code === language)?.label ?? translations.languageLabel;

  return (
    <div className="header-language-shell" ref={shellRef}>
      <button
        type="button"
        className="header-nav-link header-language-button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((current) => !current)}
      >
        <span>{translations.languageLabel}</span>
        <span className="header-language-current">{currentLabel}</span>
      </button>

      {open ? (
        <div className="header-language-menu" role="menu" aria-label={translations.languageLabel}>
          {languageOptions.map((option) => (
            <button
              key={option.code}
              type="button"
              className="header-language-option"
              data-active={option.code === language}
              onClick={() => {
                setLanguage(option.code);
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
