import { Github, Linkedin } from "lucide-react";
import LanguageSwitch from "@/components/LanguageSwitch";
import ThemeToggle from "@/components/ThemeToggle";
import { useActiveSection } from "@/hooks/use-active-section";
import { useLang, useT } from "@/i18n/context";
import { links } from "@/lib/links";
import { cn } from "@/lib/utils";

const sectionIds = ["work", "experience", "contact"] as const;

const iconLink = "-m-3 flex min-h-[44px] min-w-[44px] items-center justify-center p-3 transition-colors hover:text-primary";

/** The CV as a text link, GitHub and LinkedIn as icons. Used in the hero. */
export const ProfileLinks = ({ className }: { className?: string }) => {
  const t = useT();
  return (
    <p className={cn("flex items-center gap-7", className)}>
      <a href={links.cv[useLang()]} download className="link">
        {t.links.cv}
      </a>
      <a
        href={links.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.links.github}
        title={t.links.github}
        className={iconLink}
      >
        <Github className="h-5 w-5" strokeWidth={1.6} aria-hidden />
      </a>
      <a
        href={links.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.links.linkedin}
        title={t.links.linkedin}
        className={iconLink}
      >
        <Linkedin className="h-5 w-5" strokeWidth={1.6} aria-hidden />
      </a>
    </p>
  );
};

/**
 * One quiet line: name on the left; three section links, SV · EN and the
 * theme toggle on the right. On phones the section links are hidden — the
 * page is short enough to scroll.
 */
const Header = () => {
  const t = useT();
  const active = useActiveSection(sectionIds);

  return (
    <header className="page flex items-center justify-between gap-4 py-4 text-sm sm:py-6">
      <a href="#top" className="font-semibold tracking-[-0.01em] hover:text-primary">
        Lirije Shabani
      </a>

      <div className="flex items-center gap-6 sm:gap-8">
        <nav aria-label={t.a11y.mainNav} className="hidden sm:block">
          <ul className="flex gap-8">
            {sectionIds.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "location" : undefined}
                  className={cn(
                    "transition-colors hover:text-primary",
                    active === id && "underline decoration-rose underline-offset-4"
                  )}
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <LanguageSwitch />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
