import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useT } from "@/i18n/context";
import { cn } from "@/lib/utils";

/** A quiet sun/moon button next to SV · EN. Shows what you'll switch to. */
const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, toggle } = useTheme();
  const t = useT();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? t.a11y.lightMode : t.a11y.darkMode}
      title={isDark ? t.a11y.lightMode : t.a11y.darkMode}
      className={cn(
        "-m-3 flex min-h-[44px] min-w-[44px] items-center justify-center p-3 transition-colors hover:text-primary",
        className
      )}
    >
      {isDark ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
    </button>
  );
};

export default ThemeToggle;
