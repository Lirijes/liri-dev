import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import type { Lang } from "@/i18n/lang";

/** Renders inside the language provider with a fixed language. */
export const renderIn = (lang: Lang, ui: ReactElement) =>
  render(<LanguageProvider initialLang={lang}>{ui}</LanguageProvider>);
