import { ProjectDiagram } from "@/components/diagrams";
import { Reveal } from "@/components/editorial";
import { useT } from "@/i18n/context";
import { projectHash } from "@/lib/hash-route";
import { paragraphs } from "@/lib/text";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

/**
 * A featured project as an editorial chapter: number, large title and a short
 * story on one side; a large visual that runs off the page edge on the other.
 * Chapters alternate sides. On phones: title, visual, then the story.
 */
const FeaturedChapter = ({ project, index }: { project: Project; index: number }) => {
  const t = useT();
  const reversed = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");
  const demo = project.links.find((l) => l.type === "demo");
  const titleId = `featured-${project.id}-title`;

  return (
    <Reveal>
      <article
        id={`featured-${project.id}`}
        aria-labelledby={titleId}
        className="grid gap-y-8 md:grid-cols-12 md:gap-x-6 md:gap-y-6"
      >
        {/* Number and title */}
        <header
          className={cn(
            "md:row-start-1 md:self-end",
            reversed ? "md:col-span-5 md:col-start-8" : "md:col-span-5 lg:col-span-4"
          )}
        >
          <p className="font-display text-2xl text-primary">{number}</p>
          <h3 id={titleId} className="type-project mt-3">
            {project.title}
          </h3>
        </header>

        {/* Visual, bleeding to the page edge from md up */}
        <figure
          className={cn(
            "-mx-[var(--gutter)] md:row-span-2 md:row-start-1",
            reversed
              ? "md:col-span-7 md:col-start-1 md:mr-0"
              : "md:col-span-7 md:col-start-6 md:ml-0"
          )}
        >
          {project.visual.kind === "diagram" ? (
            <div className="bg-paper-deep px-[var(--gutter)] py-10 md:px-12 md:py-14 lg:px-16">
              <ProjectDiagram id={project.visual.id} compact />
            </div>
          ) : (
            <div
              className={cn(
                "h-[clamp(18rem,42vw,37.5rem)] overflow-hidden px-[clamp(1.5rem,5vw,4.5rem)] pt-[clamp(1.5rem,4.5vw,4rem)]",
                project.visualTone === "mint" ? "bg-mint" : "bg-paper-deep"
              )}
            >
              <img
                src={project.visual.src}
                alt={project.visual.alt}
                loading="lazy"
                className="block h-auto w-full shadow-[0_24px_60px_-30px_hsl(var(--foreground)/0.35)]"
              />
            </div>
          )}
        </figure>

        {/* Story and links */}
        <div
          className={cn(
            "space-y-6 md:row-start-2 md:self-start",
            reversed ? "md:col-span-5 md:col-start-8" : "md:col-span-5 lg:col-span-4"
          )}
        >
          <div className="max-w-xl space-y-4 text-lg leading-relaxed text-ink-soft">
            {paragraphs(project.story ?? project.summary).map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.role} · {t.status[project.status].toLowerCase()}
            <br />
            {project.cardTech.join(", ")}
          </p>
          <p className="flex flex-wrap gap-x-7 gap-y-2">
            <a href={projectHash(project.id)} aria-label={t.projects.exploreLabel(project.title)} className="link font-medium">
              {t.projects.explore}
            </a>
            {demo && (
              <a href={demo.url} target="_blank" rel="noopener noreferrer" className="link">
                {new URL(demo.url).hostname.replace(/^www\./, "")} ↗
              </a>
            )}
          </p>
        </div>
      </article>
    </Reveal>
  );
};

export default FeaturedChapter;
