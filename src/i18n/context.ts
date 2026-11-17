import { createContext, useContext } from "react";
import { DEFAULT_LANG, type Lang } from "./lang";
import { strings, type Strings } from "./strings";

export interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const LangContext = createContext<LangContextValue>({ lang: DEFAULT_LANG, setLang: () => {} });

export const useLang = () => useContext(LangContext).lang;
export const useSetLang = () => useContext(LangContext).setLang;

/** The interface strings for the current language. */
export const useT = (): Strings => strings[useLang()];

/** Picks the current language's entry from a local `{ sv, en }` table (used by diagrams). */
export function useCopy<T>(copy: Record<Lang, T>): T {
  return copy[useLang()];
}
