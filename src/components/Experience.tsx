import { Reveal, SectionHead } from "@/components/editorial";
import { educationByLang, rolesByLang, type Role } from "@/data/experience";
import { useLang, useT } from "@/i18n/context";
import { projectHash } from "@/lib/hash-route";

const Description = ({ description }: { description: Role["description"] }) =>
  typeof description === "string" ? (
    <>{description}</>
  ) : (
    <>
      {description.before}
      <a href={projectHash(description.projectId)} className="link">
        {description.linkText}
      </a>
      {description.after}
    </>
  );

/**
 * Experience (about 65%) and education (about 35%) side by side on desktop,
 * stacked on phones with experience first.
 */
const Experience = () => {
  const t = useT();
  const lang = useLang();
  const roles = rolesByLang[lang];
  const education = educationByLang[lang];

  return (
    <section
      id="experience"
      aria-label={t.experience.sectionLabel}
      className="page section-gap grid scroll-mt-4 gap-y-20 lg:grid-cols-[65fr_35fr] lg:gap-x-[4.5rem]"
    >
      <div>
        <SectionHead label={t.experience.experience} />
        <Reveal>
          <ol>
            {roles.map((r) => (
              <li
                key={r.company}
                className="grid gap-x-6 gap-y-1.5 border-b border-rule py-7 sm:grid-cols-[9.5rem_1fr]"
              >
                <p className="text-[0.8125rem] text-muted-foreground sm:pt-2.5">{r.period}</p>
                <div>
                  <h3 className="font-display text-[clamp(1.75rem,2.6vw,2rem)] leading-tight">{r.company}</h3>
                  <p className="mt-1 text-[0.8125rem] text-muted-foreground">
                    {r.role} · {r.location}
                  </p>
                  <p className="mt-2.5 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">
                    <Description description={r.description} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      <div>
        <SectionHead label={t.experience.education} />
        <Reveal>
          <ol>
            {education.map((e) => (
              <li key={e.title} className="border-b border-rule py-5">
                <h3
                  className={
                    e.small
                      ? "text-[0.9375rem] leading-relaxed text-ink-soft"
                      : "font-display text-2xl leading-tight"
                  }
                >
                  {e.title}
                </h3>
                <p className="mt-1.5 text-[0.8125rem] text-muted-foreground">{e.meta}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
};

export default Experience;
