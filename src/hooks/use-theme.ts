import { useCallback, useEffect, useState } from "react";

/**
 * Light or dark theme.
 *
 * By default the site follows the visitor's system setting (and keeps
 * following it if it changes). Once the visitor uses the toggle, their choice
 * is remembered and wins over the system setting.
 *
 * The initial class is set by a small script in index.html before React
 * loads, so dark-mode visitors never see a flash of the light theme.
 */
export type Theme = "light" | "dark";
export const THEME_STORAGE_KEY = "liri-dev.theme";

const systemQuery = () =>
  typeof window.matchMedia === "function" ? window.matchMedia("(prefers-color-scheme: dark)") : null;

function readStoredTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = readStoredTheme();
    if (stored) return stored;
    return systemQuery()?.matches ? "dark" : "light";
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Follow system changes until the visitor has made their own choice.
  useEffect(() => {
    const query = systemQuery();
    if (!query) return;
    const onChange = (e: MediaQueryListEvent) => {
      if (!readStoredTheme()) setTheme(e.matches ? "dark" : "light");
    };
    query.addEventListener?.("change", onChange);
    return () => query.removeEventListener?.("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Not fatal: the theme still changes for this visit.
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
