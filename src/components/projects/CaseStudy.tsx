import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ProjectDiagram } from "@/components/diagrams";
import { Fact, Reveal } from "@/components/editorial";
import ImageLightbox from "@/components/ImageLightbox";
import { useActiveSection } from "@/hooks/use-active-section";
import { useT } from "@/i18n/context";
import { projectHash } from "@/lib/hash-route";
import { paragraphs } from "@/lib/text";
import { cn } from "@/lib/utils";
import type { Project, ProjectDecision } from "@/types/project";

/**
 * A featured project's own page (#project/<id>). The technical depth lives
 * here, split into chapters so a visitor can jump straight to what they want.
 */

const ChapterHead = ({ label, title }: { label: string; title?: string }) => (
  <div className="space-y-4">
    <h2 className="label text-muted-foreground">{label}</h2>
    {title && <p className="type-title">{title}</p>}
  </div>
);

const Decision = ({
  decision,
  decisionLabel,
  number,
  open,
  onToggle,
}: {
  decision: ProjectDecision;
  decisionLabel: string;
  number: string;
  open: boolean;
  onToggle: () => void;
}) => {
  const t = useT();
  const reduce = useReducedMotion();
  const panelId = useId();
  const rows = [
    { key: "problem", label: t.caseStudy.problem, text: decision.problem },
    { key: "decision", label: decisionLabel, text: decision.decision },
    ...(decision.why ? [{ key: "why", label: t.caseStudy.why, text: decision.why }] : []),
  ];
  return (
    <li className="border-b border-rule">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group grid w-full grid-cols-[2.5rem_1fr_1.5rem] items-baseline gap-x-4 py-6 text-left md:grid-cols-[3.5rem_1fr_1.5rem] md:gap-x-6"
        >
          <span className="font-display text-xl text-primary">{number}</span>
          <span
            className={cn(
              "font-display leading-tight transition-colors group-hover:text-primary",
              open ? "text-[clamp(1.875rem,3.4vw,2.75rem)]" : "text-[clamp(1.5rem,2.4vw,2rem)]"
            )}
          >
            {decision.title}
          </span>
          <span aria-hidden className="text-right text-xl leading-none">
            {open ? "−" : "+"}
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <dl className="grid max-w-3xl gap-x-6 gap-y-4 pb-10 sm:grid-cols-[7rem_1fr] md:ml-[4.25rem] md:pb-12">
              {rows.map((row) => (
                <div key={row.key} className="contents">
                  <dt className={cn("label pt-1.5", row.key === "decision" ? "text-primary" : "text-muted-foreground")}>
                    {row.label}
                  </dt>
                  <dd className={cn("text-[1.0625rem] leading-relaxed", row.key !== "decision" && "text-ink-soft")}>
                    {row.text}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

const Screenshots = ({ images, title }: { images: string[]; title: string }) => {
  const t = useT();
  const [index, setIndex] = useState<number | null>(null);
  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2">
        {images.map((src, i) => (
          <li key={src} className={cn(i === 0 && "sm:col-span-2")}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="block w-full cursor-zoom-in bg-mint p-[clamp(1rem,3vw,2.5rem)]"
              aria-label={t.caseStudy.openScreenshot(title, i + 1, images.length)}
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
        title={title}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </>
  );
};

interface CaseStudyProps {
  project: Project;
  number: string;
  next: Project | null;
}

const CaseStudy = ({ project, number, next }: CaseStudyProps) => {
  const t = useT();
  const [openDecision, setOpenDecision] = useState(0);
  const solutions = project.decisionsTerm === "solutions";

  const chapters = useMemo(
    () =>
      [
        { id: "overview", label: t.caseStudy.chapters.overview, show: true },
        { id: "architecture", label: t.caseStudy.chapters.architecture, show: Boolean(project.diagrams?.length || project.architecture) },
        { id: "decisions", label: t.caseStudy.chapters[solutions ? "solutions" : "decisions"], show: project.decisions.length > 0 },
        { id: "implementation", label: t.caseStudy.chapters.implementation, show: Boolean(project.implementation?.length) },
        { id: "screenshots", label: t.caseStudy.chapters.screenshots, show: Boolean(project.images?.length) },
        { id: "progress", label: t.caseStudy.chapters.progress, show: Boolean(project.progress) },
      ].filter((c) => c.show),
    [project, t, solutions]
  );
  const chapterIds = useMemo(() => chapters.map((c) => `chapter-${c.id}`), [chapters]);
  const active = useActiveSection(chapterIds);
  const demo = project.links.find((l) => l.type === "demo");
  const code = project.links.filter((l) => l.type === "github");

  return (
    <article aria-labelledby="case-title" className="page pb-8 pt-6 sm:pt-10">
      <a href={`#featured-${project.id}`} className="link text-sm">
        {t.caseStudy.allWork}
      </a>

      {/* Title block */}
      <Reveal className="mt-10 grid gap-10 md:grid-cols-12 md:items-end md:gap-x-6">
        <div className="md:col-span-8">
          <p className="font-display text-2xl text-primary">{number}</p>
          <h1 id="case-title" className="type-case mt-3">
            {project.title}
          </h1>
        </div>
        <dl className="grid grid-cols-2 gap-5 md:col-span-3 md:col-start-10 md:grid-cols-1">
          <Fact term={t.caseStudy.role}>{project.role}</Fact>
          <Fact term={t.caseStudy.status}>{t.status[project.status]}</Fact>
          <Fact term={t.caseStudy.year}>{project.year}</Fact>
          {(demo || code.length > 0) && (
            <Fact term={t.caseStudy.links}>
              <span className="flex flex-wrap gap-x-4 gap-y-1">
                {demo && (
                  <a href={demo.url} target="_blank" rel="noopener noreferrer" className="link">
                    {demo.label} ↗
                  </a>
                )}
                {code.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="link">
                    {l.label === "GitHub" ? t.caseStudy.code : l.label} ↗
                  </a>
                ))}
              </span>
            </Fact>
          )}
        </dl>
      </Reveal>
      <p className="type-statement mt-12 max-w-5xl border-t border-foreground pt-6 !text-[clamp(1.75rem,3.2vw,2.5rem)]">
        {project.summary}
      </p>

      {/* Chapters */}
      <div className="section-gap grid gap-y-12 lg:grid-cols-12 lg:gap-x-6">
        <nav aria-label={t.caseStudy.chaptersLabel} className="lg:col-span-2">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm lg:sticky lg:top-10 lg:flex-col lg:gap-3">
            {chapters.map((c) => (
              <li key={c.id}>
                <a
                  href={projectHash(project.id, c.id)}
                  aria-current={active === `chapter-${c.id}` ? "location" : undefined}
                  className={cn(
                    "transition-colors hover:text-primary",
                    active === `chapter-${c.id}`
                      ? "text-primary underline decoration-rose underline-offset-4"
                      : "text-muted-foreground"
                  )}
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-[clamp(6rem,10vw,8.75rem)] lg:col-span-9 lg:col-start-4">
          <section id="chapter-overview" className="scroll-mt-10 space-y-8">
            <ChapterHead label={t.caseStudy.headings.overview} />
            <div className="max-w-3xl space-y-5 text-[1.1875rem] leading-[1.7] text-ink-soft">
              {paragraphs(project.overview).map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
            <p className="max-w-3xl text-[0.9375rem] leading-relaxed">
              <span className="label mr-3 text-muted-foreground">{t.caseStudy.myRole}</span>
              {project.myRole}
            </p>
            <dl className="border-t border-foreground">
              {project.tech.map((group) => (
                <div
                  key={group.label}
                  className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[13rem_1fr] sm:gap-6"
                >
                  <dt className="label pt-1 text-muted-foreground">{group.label}</dt>
                  <dd className="text-[0.9375rem] leading-relaxed">{group.items.join(" · ")}</dd>
                </div>
              ))}
              {project.plannedTech?.length ? (
                <div className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                  <dt className="label pt-1 text-muted-foreground">{t.caseStudy.plannedTech}</dt>
                  <dd className="text-[0.9375rem] italic leading-relaxed text-muted-foreground">
                    {project.plannedTech.join(" · ")}
                  </dd>
                </div>
              ) : null}
            </dl>
          </section>

          {chapters.some((c) => c.id === "architecture") && (
            <section id="chapter-architecture" className="scroll-mt-10 space-y-8">
              <ChapterHead label={t.caseStudy.headings.architecture} />
              {project.architecture && (
                <p className="max-w-3xl text-[1.0625rem] leading-[1.7] text-ink-soft">{project.architecture}</p>
              )}
              <div className="space-y-16">
                {project.diagrams?.map((id) => <ProjectDiagram key={id} id={id} />)}
              </div>
            </section>
          )}

          <section id="chapter-decisions" className="scroll-mt-10 space-y-6">
            <ChapterHead label={t.caseStudy.headings[solutions ? "solutions" : "decisions"]} />
            <ol className="border-t border-foreground">
              {project.decisions.map((d, i) => (
                <Decision
                  key={d.title}
                  decision={d}
                  decisionLabel={solutions ? t.caseStudy.solution : t.caseStudy.decision}
                  number={String(i + 1).padStart(2, "0")}
                  open={openDecision === i}
                  onToggle={() => setOpenDecision((cur) => (cur === i ? -1 : i))}
                />
              ))}
            </ol>
          </section>

          {project.implementation && (
            <section id="chapter-implementation" className="scroll-mt-10 space-y-8">
              <ChapterHead label={t.caseStudy.headings.implementation} />
              <div className="grid gap-x-14 gap-y-10 md:grid-cols-2">
                {project.implementation.map((note) => (
                  <div key={note.title}>
                    <h3 className="font-display text-[1.75rem] leading-tight">{note.title}</h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">{note.text}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.images?.length ? (
            <section id="chapter-screenshots" className="scroll-mt-10 space-y-8">
              <ChapterHead label={t.caseStudy.headings.screenshots} />
              <Screenshots images={project.images} title={project.title} />
            </section>
          ) : null}

          {project.progress && (
            <section id="chapter-progress" className="scroll-mt-10 space-y-8">
              <ChapterHead label={t.caseStudy.headings.progress} />
              <div className="grid gap-10 border-t border-foreground pt-6 md:grid-cols-3 md:gap-10">
                <div>
                  <h3 className="font-display text-3xl">{t.caseStudy.built}</h3>
                  <ul className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed">
                    {project.progress.built.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                {project.progress.inProgress?.length ? (
                  <div>
                    <h3 className="font-display text-3xl">{t.caseStudy.inProgress}</h3>
                    <ul className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed">
                      {project.progress.inProgress.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {project.progress.planned?.length ? (
                  <div>
                    <h3 className="font-display text-3xl italic text-muted-foreground">{t.caseStudy.planned}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{t.caseStudy.notBuiltYet}</p>
                    <ul className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                      {project.progress.planned.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </section>
          )}
        </div>
      </div>

      {next && (
        <a
          href={projectHash(next.id)}
          className="group mt-[var(--section-gap)] flex flex-wrap items-baseline justify-between gap-4 border-t border-foreground pt-5"
        >
          <span className="label text-muted-foreground">{t.caseStudy.nextProject}</span>
          <span className="type-project transition-colors group-hover:text-primary">{next.title} →</span>
        </a>
      )}
    </article>
  );
};

export default CaseStudy;
