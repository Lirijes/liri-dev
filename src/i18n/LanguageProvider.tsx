import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { LangContext } from "./context";
import { readInitialLang, storeLang, syncUrl, type Lang } from "./lang";

/**
 * Holds the current language and keeps <html lang>, the URL (?lang=en) and the
 * saved preference in step with it. Switching never touches the hash, so the
 * visitor stays on the same page, chapter and scroll position.
 */
export function LanguageProvider({ children, initialLang }: { children: ReactNode; initialLang?: Lang }) {
  const [lang, setLangState] = useState<Lang>(() => initialLang ?? readInitialLang());

  useEffect(() => {
    document.documentElement.lang = lang;
    syncUrl(lang);
    storeLang(lang);
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
