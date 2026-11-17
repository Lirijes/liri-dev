import { Reveal, SectionHead } from "@/components/editorial";
import { aiAssistedTools, skillAreas } from "@/data/skills";

/** Skills as a typographic table: area, main tools in large serif, the rest small. */
const Skills = () => (
  <section id="skills" aria-label="Skills" className="page section-gap scroll-mt-4">
    <SectionHead label="Skills" aside={<span className="normal-case tracking-normal">Large: what I use most</span>} />
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
      <p className="mt-6 text-sm text-muted-foreground">
        I also use AI-assisted development day to day, with {aiAssistedTools.join(" and ")}.
      </p>
    </Reveal>
  </section>
);

export default Skills;
