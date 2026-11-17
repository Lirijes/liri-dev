/**
 * Two languages: Swedish (default) and English.
 *
 * The language lives in the query string (`?lang=en`), not the hash, so it
 * survives every hash navigation (#work, #project/nodia/decisions) and works
 * on a static host. Swedish is the default and needs no parameter.
 *
 * Precedence on load: URL parameter → saved preference → Swedish.
 */
export type Lang = "sv" | "en";
export const LANGS: readonly Lang[] = ["sv", "en"];
export const DEFAULT_LANG: Lang = "sv";
const STORAGE_KEY = "liri-dev.lang";

export const isLang = (value: unknown): value is Lang => value === "sv" || value === "en";

export function readStoredLang(): Lang | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isLang(value) ? value : null;
  } catch {
    return null; // storage can be blocked (private mode, disabled cookies)
  }
}

export function storeLang(lang: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Not fatal: the URL still carries the language.
  }
}

export function readInitialLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (isLang(fromUrl)) return fromUrl;
  return readStoredLang() ?? DEFAULT_LANG;
}

/**
 * Puts the language in the URL (only when it isn't the default) while keeping
 * the path and hash, so the visitor stays on the same page and chapter.
 */
export function syncUrl(lang: Lang) {
  const url = new URL(window.location.href);
  if (lang === DEFAULT_LANG) url.searchParams.delete("lang");
  else url.searchParams.set("lang", lang);
  const next = url.pathname + url.search + url.hash;
  if (next !== window.location.pathname + window.location.search + window.location.hash) {
    window.history.replaceState(window.history.state, "", next);
  }
}
