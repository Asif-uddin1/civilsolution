import { useCallback, useEffect, useState } from "react";

export type Language = "en" | "bn";

export const LANGUAGE_STORAGE_KEY = "civil-language";

function readStoredLanguage(): Language {
  if (typeof window === "undefined") return "en";
  return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === "bn" ? "bn" : "en";
}

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    window.dispatchEvent(new CustomEvent<Language>("civil-language-change", { detail: next }));
  }, []);

  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const next = (event as CustomEvent<Language>).detail;
      if (next === "en" || next === "bn") setLanguageState(next);
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === LANGUAGE_STORAGE_KEY) setLanguageState(event.newValue === "bn" ? "bn" : "en");
    };

    window.addEventListener("civil-language-change", handleLanguageChange);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("civil-language-change", handleLanguageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return {
    language,
    isBn: language === "bn",
    setLanguage,
    toggleLanguage: () => setLanguage(language === "bn" ? "en" : "bn"),
  };
}
