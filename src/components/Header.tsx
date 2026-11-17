import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import LanguageSwitch from "@/components/LanguageSwitch";
import { useActiveSection } from "@/hooks/use-active-section";
import { useLang, useT } from "@/i18n/context";
import { links } from "@/lib/links";
import { cn } from "@/lib/utils";

const sectionIds = ["work", "skills", "experience", "contact"] as const;

/** Text links to the CV, GitHub and LinkedIn, used in the hero, menu and contact. */
export const ProfileLinks = ({ className }: { className?: string }) => {
  const t = useT();
  return (
    <p className={cn("flex flex-wrap gap-x-5 gap-y-2", className)}>
      <a href={links.cv[useLang()]} download className="link">
        {t.links.cv}
      </a>
      <a href={links.github} target="_blank" rel="noopener noreferrer" className="link">
        {t.links.github}
      </a>
      <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="link">
        {t.links.linkedin}
      </a>
    </p>
  );
};

/** Minimal one-line header: name on the left; four quiet links and SV · EN on the right. */
const Header = () => {
  const t = useT();
  const active = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const sections = sectionIds.map((id) => ({ id, label: t.nav[id] }));

  return (
    <header className="page flex items-baseline justify-between gap-4 py-6 text-[0.8125rem] sm:py-7">
      <a href="#top" className="font-medium hover:text-primary">
        Lirije Shabani
      </a>

      <div className="flex items-baseline gap-6 sm:gap-9">
        <nav aria-label={t.a11y.mainNav} className="hidden sm:block">
          <ul className="flex gap-9">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? "location" : undefined}
                  className={cn(
                    "transition-colors hover:text-primary",
                    active === s.id && "underline decoration-rose underline-offset-4"
                  )}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <LanguageSwitch />

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger className="-my-3 -mr-3 min-h-[44px] min-w-[44px] px-3 sm:hidden" aria-label={t.a11y.openMenu}>
            {t.nav.menu}
          </SheetTrigger>
          <SheetContent side="right" className="flex w-full flex-col border-0 bg-background px-[var(--gutter)] sm:max-w-sm">
            <SheetTitle className="text-[0.8125rem] font-medium">Lirije Shabani</SheetTitle>
            <nav aria-label={t.a11y.mobileNav} className="mt-16">
              <ul className="space-y-3">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="font-display text-5xl leading-tight hover:text-primary"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <ProfileLinks className="mt-auto pb-6 text-sm" />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
