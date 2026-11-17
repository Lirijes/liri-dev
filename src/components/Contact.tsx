import { Coffee } from "lucide-react";
import { Reveal } from "@/components/editorial";
import { ProfileLinks } from "@/components/Header";
import { useT } from "@/i18n/context";
import { links } from "@/lib/links";

/** The closing line of the page. Email and LinkedIn only — no phone number. */
const Contact = () => {
  const t = useT();
  return (
    <section id="contact" aria-label={t.contact.sectionLabel} className="page section-gap scroll-mt-4">
      <Reveal>
        <p className="type-closing">
          {t.contact.closingBefore}
          <em className="text-primary">{t.contact.closingEmphasis}</em>
        </p>
        <div className="mt-12 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4 border-t border-foreground pt-4">
          <a href={`mailto:${links.email}`} className="link text-[clamp(1.125rem,1.8vw,1.375rem)]">
            {links.email}
          </a>
          <ProfileLinks className="text-sm" />
        </div>
        {/* A quiet personal detail, not a call to action. */}
        <p className="mt-5 text-[0.8125rem]">
          <a
            href={links.kofi}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline hover:decoration-rose"
          >
            <Coffee className="h-3.5 w-3.5" aria-hidden />
            {t.links.kofi}
          </a>
        </p>
      </Reveal>
    </section>
  );
};

export default Contact;
