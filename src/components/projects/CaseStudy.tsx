import { useState, type ReactNode } from "react";
import { ProjectDiagram } from "@/components/diagrams";
import { Reveal } from "@/components/editorial";
import ImageLightbox from "@/components/ImageLightbox";
import { useT } from "@/i18n/context";
import { projectHash } from "@/lib/hash-route";
import { paragraphs } from "@/lib/text";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

/**
 * A project's own page (#project/<id>). Every project uses this one template:
 * background → tech → architecture → screenshots → challenges → status →
 * learnings. A part is shown only when the project has content for it, so a
 * small project gets a short page instead of an inflated one.
 *
 * One column of text with a quiet label to the left of each part — no cards,
 * no boxes, no chapter menu. Section ids keep the old chapter names, so
 * earlier links such as #project/nodia/decisions still land in the right place.
 */

const Section = ({ id, label, children }: { id: string; label: string; children: ReactNode }) => (
  <Reveal>
    <section id={id} aria-labelledby={`${id}-label`} className="grid scroll-mt-10 gap-y-6 lg:grid-cols-12 lg:gap-x-6">
      <h2 id={`${id}-label`} className="label pt-1.5 text-muted-foreground lg:col-span-3">
        {label}
      </h2>
      <div className="lg:col-span-8 lg:col-start-4">{children}</div>
    </section>
  </Reveal>
);

const prose = "max-w-2xl space-y-5 text-[1.125rem] leading-[1.75] text-ink-soft";

const Dash = ({ muted }: { muted?: boolean }) => (
  <span aria-hidden className={muted ? undefined : "text-primary"}>
    {muted ? "○" : "—"}
  </span>
);

const Screenshots = ({ project }: { project: Project }) => {
  const t = useT();
  const [index, setIndex] = useState<number | null>(null);
  const images = project.images ?? [];
  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2">
        {images.map((src, i) => (
          <li key={src} className={cn((i === 0 || images.length === 1) && "sm:col-span-2")}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "block w-full cursor-zoom-in rounded-md p-[clamp(1rem,3vw,2.5rem)]",
                project.visualTone === "mint" ? "bg-mint" : "bg-paper-deep"
              )}
              aria-label={t.caseStudy.openScreenshot(project.title, i + 1, images.length)}
            >
              <img src={src} alt="" loading="lazy" className="mx-auto block h-auto max-h-[70vh] w-auto max-w-full" />
            </button>
          </li>
        ))}
      </ul>
      <ImageLightbox
        images={images}
        index={index ?? 0}
        open={index !== null}
        title={project.title}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </>
  );
};

interface CaseStudyProps {
  project: Project;
  next: Project | null;
}

const CaseStudy = ({ project, next }: CaseStudyProps) => {
  const t = useT();
  const n = t.caseStudy.narrative;
  const ongoing = project.status === "In development";
  const code = project.links.filter((l) => l.type === "github");
  const demo = project.links.find((l) => l.type === "demo");
  const diagram = project.diagrams?.[0];
  // The homepage tile's simplified diagram reads better on the page too.
  const compactDiagram = project.visual.kind === "diagram" && project.visual.id === diagram;

  const backgroundLabel = project.context
    ? n.background
    : ongoing
      ? n.whyStarted(project.title)
      : n.whyBuilt(project.title);

  const facts = [
    { term: t.caseStudy.role, value: project.role },
    { term: t.caseStudy.status, value: t.status[project.status] },
    { term: t.caseStudy.year, value: <span className="font-mono text-[0.875rem]">{project.year}</span> },
  ];

  return (
    <article aria-labelledby="case-title" className="page pb-8 pt-6 sm:pt-10">
      <a href={project.featured ? `#featured-${project.id}` : `#project-${project.id}`} className="link text-sm">
        {t.caseStudy.allWork}
      </a>

      {/* Name, one sentence, and the facts on one line */}
      <Reveal className="mt-12 sm:mt-16">
        <h1 id="case-title" className="type-case">
          {project.title}
        </h1>
        <p className="type-statement mt-8 max-w-4xl text-ink-soft">{project.summary}</p>
        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-rule py-6 md:grid-cols-[1.4fr_1fr_0.6fr_1fr]">
          {facts.map((f) => (
            <div key={f.term}>
              <dt className="label text-muted-foreground">{f.term}</dt>
              <dd className="mt-2 text-[0.9375rem] leading-snug">{f.value}</dd>
            </div>
          ))}
          <div>
            <dt className="label text-muted-foreground">{t.caseStudy.links}</dt>
            <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem]">
              {demo && (
                <a href={demo.url} target="_blank" rel="noopener noreferrer" className="link">
                  {demo.label}
                </a>
              )}
              {code.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="link">
                  {l.label}
                </a>
              ))}
              {!demo && code.length === 0 && <span className="text-muted-foreground">{t.caseStudy.noPublicCode}</span>}
            </dd>
          </div>
        </dl>
      </Reveal>

      <div className="mt-[clamp(5rem,10vw,8rem)] space-y-[clamp(5.5rem,10vw,8.5rem)]">
        {/* Background, then how I worked — including how AI was or wasn't used */}
        <Section id="chapter-overview" label={backgroundLabel}>
          <div className={prose}>
            {paragraphs(project.background).map((text) => (
              <p key={text}>{text}</p>
            ))}
            {project.currentFocus && <p className="text-foreground">{project.currentFocus}</p>}
          </div>
          <div className="mt-12 max-w-2xl border-t border-rule pt-5">
            <h3 className="label text-muted-foreground">{ongoing ? n.howIWork : n.howIWorked}</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{project.myRole}</p>
          </div>
        </Section>

        {/* Tech: compact rows in the monospace */}
        <Section id="chapter-tech" label={n.tech}>
          <dl className="grid max-w-3xl gap-x-6 gap-y-3 font-mono text-[0.8125rem] leading-relaxed sm:grid-cols-[9.5rem_1fr] sm:text-[0.875rem]">
            {project.tech.map((group) => (
              <div key={group.label} className="contents">
                <dt className="text-muted-foreground max-sm:mt-2">{group.label}</dt>
                <dd>{group.items.join(" · ")}</dd>
              </div>
            ))}
            {project.plannedTech?.length ? (
              <div className="contents">
                <dt className="text-muted-foreground max-sm:mt-2">{t.caseStudy.planned}</dt>
                <dd className="text-muted-foreground">{project.plannedTech.join(" · ")}</dd>
              </div>
            ) : null}
          </dl>
          {project.techNote && <p className="mt-6 max-w-2xl text-[0.9375rem] text-ink-soft">{project.techNote}</p>}
        </Section>

        {/* Architecture (or how it works): a few sentences and one diagram */}
        {diagram && (
          <Section
            id="chapter-architecture"
            label={project.architectureLabel === "howItWorks" ? n.howItWorks : n.architecture}
          >
            {project.architecture && <p className={prose}>{project.architecture}</p>}
            {compactDiagram ? (
              <figure className="mt-10 rounded-md bg-paper-deep px-[clamp(1.25rem,3.5vw,3rem)] py-[clamp(1.75rem,4vw,3rem)]">
                <ProjectDiagram id={diagram} compact />
              </figure>
            ) : (
              <div className="mt-10">
                <ProjectDiagram id={diagram} />
              </div>
            )}
          </Section>
        )}

        {project.images?.length ? (
          <Section id="chapter-screenshots" label={n.screenshots}>
            <Screenshots project={project} />
          </Section>
        ) : null}

        {/* Challenges: numbered, open, one sentence per row */}
        {project.decisions.length > 0 && (
          <Section id="chapter-decisions" label={n.challenges}>
            {project.challengesIntro && <p className={cn(prose, "mb-10")}>{project.challengesIntro}</p>}
            <ol className="border-t border-rule">
              {project.decisions.map((d, i) => {
                const rows = [
                  { label: t.caseStudy.problem, text: d.problem },
                  { label: t.caseStudy.solution, text: d.decision },
                  ...(d.why ? [{ label: t.caseStudy.why, text: d.why }] : []),
                ];
                return (
                  <li key={d.title} className="grid gap-x-6 gap-y-4 border-b border-rule py-10 sm:grid-cols-[3rem_1fr]">
                    <span className="font-mono text-sm text-primary">{String(i + 1).padStart(2, "0")}</span>
                    <div className="max-w-2xl">
                      <h3 className="font-display text-[clamp(1.5rem,2.4vw,1.875rem)] leading-tight">{d.title}</h3>
                      <dl className="mt-5 grid gap-x-5 gap-y-3 sm:grid-cols-[6rem_1fr]">
                        {rows.map((row) => (
                          <div key={row.label} className="contents">
                            <dt className="label pt-1 text-muted-foreground">{row.label}</dt>
                            <dd className="leading-relaxed text-ink-soft max-sm:mb-2">{row.text}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Section>
        )}

        {/* What I built: for projects where a problem/solution story would be inflated */}
        {project.builtItems?.length ? (
          <Section id="chapter-built" label={n.whatIBuilt}>
            <ul className="max-w-2xl space-y-4 text-[1.125rem] leading-[1.7] text-ink-soft">
              {project.builtItems.map((item) => (
                <li key={item} className="flex gap-4">
                  <Dash />
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        {/* Built and planned, side by side; planned is muted so it never reads as done */}
        {project.progress && (
          <Section id="chapter-progress" label={n.status}>
            <div className="grid gap-12 sm:grid-cols-2 sm:gap-10">
              <div>
                <h3 className="font-display text-2xl">{t.caseStudy.built}</h3>
                <ul className="mt-5 space-y-3 leading-relaxed text-ink-soft">
                  {project.progress.built.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Dash />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {project.progress.planned?.length ? (
                <div className="text-muted-foreground">
                  <h3 className="font-display text-2xl">
                    {t.caseStudy.planned}
                    <span className="ml-3 font-mono text-xs font-normal tracking-normal">{t.caseStudy.notBuiltYet}</span>
                  </h3>
                  <ul className="mt-5 space-y-3 leading-relaxed">
                    {project.progress.planned.map((item) => (
                      <li key={item} className="flex gap-3">
                        <Dash muted />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </Section>
        )}

        {project.learnings?.length ? (
          <Section id="chapter-learnings" label={n.learnings}>
            <ul className="max-w-2xl space-y-5 text-[1.125rem] leading-[1.7] text-ink-soft">
              {project.learnings.map((item) => (
                <li key={item} className="flex gap-4">
                  <Dash />
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}
      </div>

      {next && (
        <a
          href={projectHash(next.id)}
          className="group mt-[var(--section-gap)] flex flex-wrap items-baseline justify-between gap-4 border-t border-rule pt-6"
        >
          <span className="label text-muted-foreground">{t.caseStudy.nextProject}</span>
          <span className="type-project transition-colors group-hover:text-primary">{next.title} →</span>
        </a>
      )}
    </article>
  );
};

export default CaseStudy;
