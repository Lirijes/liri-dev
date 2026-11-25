import { Coffee } from "lucide-react";
import { useT } from "@/i18n/context";
import { links } from "@/lib/links";

const Footer = () => {
  const t = useT();
  return (
    <footer className="page mt-16 flex flex-wrap justify-between gap-4 border-t border-rule pb-10 pt-6 font-mono text-xs text-muted-foreground">
      <p>© {new Date().getFullYear()} Lirije Shabani</p>
      {/* A quiet personal detail, not a call to action. */}
      <a
        href={links.kofi}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:text-primary hover:underline hover:decoration-rose"
      >
        <Coffee className="h-3.5 w-3.5" aria-hidden />
        {t.links.kofi}
      </a>
    </footer>
  );
};

export default Footer;
