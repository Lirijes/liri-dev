import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useActiveSection } from "@/hooks/use-active-section";
import { links } from "@/lib/links";
import { cn } from "@/lib/utils";

const sections = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;
const sectionIds = sections.map((s) => s.id);

/** Text links to GitHub, LinkedIn and the CV, used in the hero, menu and footer. */
export const ProfileLinks = ({ className }: { className?: string }) => (
  <p className={cn("flex flex-wrap gap-x-5 gap-y-2", className)}>
    <a href={links.cv} download className="link">
      CV ↓
    </a>
    <a href={links.github} target="_blank" rel="noopener noreferrer" className="link">
      GitHub ↗
    </a>
    <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="link">
      LinkedIn ↗
    </a>
  </p>
);

/** Minimal one-line header: name on the left, four quiet links on the right. */
const Header = () => {
  const active = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="page flex items-baseline justify-between gap-4 py-6 text-[0.8125rem] sm:py-7">
      <a href="#top" className="font-medium hover:text-primary">
        Lirije Shabani
      </a>

      <nav aria-label="Main" className="hidden sm:block">
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

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetTrigger className="-my-3 -mr-3 min-h-[44px] min-w-[44px] px-3 sm:hidden" aria-label="Open menu">
          Menu
        </SheetTrigger>
        <SheetContent side="right" className="flex w-full flex-col border-0 bg-background px-[var(--gutter)] sm:max-w-sm">
          <SheetTitle className="text-[0.8125rem] font-medium">Lirije Shabani</SheetTitle>
          <nav aria-label="Mobile" className="mt-16">
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
    </header>
  );
};

export default Header;
