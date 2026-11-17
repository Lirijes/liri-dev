import { Reveal, SectionHead } from "@/components/editorial";
import { aiAssistedTools, skillAreasByLang } from "@/data/skills";
import { useLang, useT } from "@/i18n/context";

/** Skills as a typographic table: area, main tools in large serif, the rest small. */
const Skills = () => {
  const t = useT();
  const skillAreas = skillAreasByLang[useLang()];
  return (
    <section id="skills" aria-label={t.skills.sectionLabel} className="page section-gap scroll-mt-4">
      <SectionHead
        label={t.skills.sectionLabel}
        aside={<span className="normal-case tracking-normal">{t.skills.aside}</span>}
      />
      <Reveal>
        <dl>
          {skillAreas.map((area) => (
            <div
              key={area.label}
              className="grid gap-x-6 gap-y-2 border-b border-rule py-6 md:grid-cols-[12rem_minmax(0,1.4fr)_minmax(0,1fr)] md:items-baseline md:py-8"
            >
              <dt className="label text-muted-foreground">{area.label}</dt>
              <dd className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15]">{area.primary.join(", ")}</dd>
              <dd className="text-sm leading-relaxed text-muted-foreground">{area.secondary.join(" · ")}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-muted-foreground">{t.skills.aiNote(aiAssistedTools)}</p>
      </Reveal>
    </section>
  );
};

export default Skills;
