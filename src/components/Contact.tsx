import { useT } from "@/i18n/context";
import { links } from "@/lib/links";

/**
 * One closing line with the email address, both in Inter: the greeting
 * heavier, the address lighter in the accent colour. No phone number.
 */
const Contact = () => {
  const t = useT();
  return (
    <section id="contact" aria-label={t.contact.sectionLabel} className="page section-gap scroll-mt-4">
      <p className="font-display text-[clamp(2.125rem,4vw,2.75rem)] leading-tight tracking-[-0.04em]">
        {t.contact.closing}
        <br className="sm:hidden" />
        <a
          href={`mailto:${links.email}`}
          className="link break-all font-normal tracking-[-0.03em] text-primary max-sm:text-2xl sm:break-normal"
        >
          {links.email}
        </a>
      </p>
    </section>
  );
};

export default Contact;
