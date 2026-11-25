import { Reveal } from "@/components/editorial";
import { educationByLang, rolesByLang } from "@/data/experience";
import { useLang, useT } from "@/i18n/context";

const row = "flex flex-col gap-x-5 gap-y-1 border-b border-rule sm:grid sm:grid-cols-[1fr_1fr_9rem] sm:items-baseline";

/**
 * Experience: one line per role, then education in the same compact form
 * (programme and school only), then the tools I use most.
 */
const Experience = () => {
  const t = useT();
  const lang = useLang();
  const roles = rolesByLang[lang];
  // Full programmes only; the short university courses stay off the homepage.
  const education = educationByLang[lang].filter((e) => !e.small);

  return (
    <section id="experience" aria-labelledby="experience-heading" className="page section-gap scroll-mt-4">
      <h2 id="experience-heading" className="label text-muted-foreground">
        {t.experience.heading}
      </h2>
      <Reveal>
        <ul className="mt-5 border-t border-rule">
          {roles.map((r) => (
            <li key={r.company} className={`${row} py-[1.125rem]`}>
              <h3 className="text-[1.1875rem] font-medium tracking-[-0.02em]">{r.company}</h3>
              <p className="text-[0.9375rem] text-muted-foreground">{r.role}</p>
              <p className="font-mono text-[0.8125rem] text-muted-foreground sm:text-right">
                {r.period.replace(" — ", "–")}
              </p>
            </li>
          ))}
        </ul>

        <h3 className="label mt-12 text-muted-foreground">{t.experience.education}</h3>
        <ul className="mt-4 border-t border-rule">
          {education.map((e) => (
            <li key={e.title} className={`${row} py-4`}>
              <p className="text-[1.0625rem] font-medium tracking-[-0.01em]">{e.title}</p>
              <p className="text-[0.9375rem] text-muted-foreground">{e.meta.split(" · ")[0]}</p>
            </li>
          ))}
        </ul>

        <p className="mt-7 font-mono text-[0.8125rem] leading-relaxed text-muted-foreground">{t.experience.tools}</p>
      </Reveal>
    </section>
  );
};

export default Experience;
