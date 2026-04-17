"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  defaultLanguage,
  getTranslations,
  htmlLangByLanguage,
  languageStorageKey,
  type LanguageCode,
  type TranslationSet,
} from "@/lib/i18n";

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  translations: TranslationSet;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>(defaultLanguage);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedLanguage = window.localStorage.getItem(
      languageStorageKey,
    ) as LanguageCode | null;

    if (storedLanguage && storedLanguage !== defaultLanguage) {
      const frame = window.requestAnimationFrame(() => {
        setLanguage(storedLanguage);
      });

      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(languageStorageKey, language);
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = htmlLangByLanguage[language] ?? htmlLangByLanguage[defaultLanguage];
    }
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      translations: getTranslations(language),
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
