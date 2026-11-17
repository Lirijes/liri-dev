import { useLang, useSetLang, useT } from "@/i18n/context";
import { LANGS } from "@/i18n/lang";
import { cn } from "@/lib/utils";

/**
 * "SV · EN" in the same small type as the navigation. The current language is
 * in ink with the rose underline used for the active nav item; the other is
 * muted. Switching keeps the visitor exactly where they are.
 */
const LanguageSwitch = ({ className }: { className?: string }) => {
  const lang = useLang();
  const setLang = useSetLang();
  const t = useT();

  return (
    <div role="group" aria-label={t.a11y.language} className={cn("flex items-baseline gap-1.5", className)}>
      {LANGS.map((code, i) => (
        <span key={code} className="flex items-baseline gap-1.5">
          {i > 0 && (
            <span aria-hidden className="text-muted-foreground">
              ·
            </span>
          )}
          <button
            type="button"
            lang={code}
            aria-pressed={lang === code}
            aria-label={`${code.toUpperCase()} – ${t.languageNames[code]}`}
            onClick={() => setLang(code)}
            className={cn(
              "-my-2 py-2 transition-colors hover:text-primary",
              lang === code
                ? "font-medium text-foreground underline decoration-rose underline-offset-4"
                : "text-muted-foreground"
            )}
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
};

export default LanguageSwitch;
