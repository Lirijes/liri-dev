import { ProjectDiagram } from "@/components/diagrams";
import { useT } from "@/i18n/context";
import { projectHash } from "@/lib/hash-route";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

/**
 * A featured project as one clickable tile: the visual, then the name and
 * "tagline · status". The whole tile opens the case study.
 */
const FeaturedTile = ({ project }: { project: Project }) => {
  const t = useT();
  return (
    <article id={`featured-${project.id}`}>
      <a
        href={projectHash(project.id)}
        aria-label={t.projects.exploreLabel(project.title)}
        className="group block"
      >
        <div
          className={cn(
            "flex items-center justify-center overflow-hidden rounded-md",
            // A diagram stacks vertically on phones, so it gets its natural height there.
            project.visual.kind === "diagram" ? "py-8 md:aspect-[4/3] md:py-0" : "aspect-[4/3]",
            project.visualTone === "mint" ? "bg-mint" : "bg-paper-deep"
          )}
        >
          {project.visual.kind === "diagram" ? (
            <div className="w-full px-[clamp(1.25rem,3vw,2.5rem)]">
              <ProjectDiagram id={project.visual.id} compact />
            </div>
          ) : (
            <img
              src={project.visual.src}
              alt={project.visual.alt}
              loading="lazy"
              className="mt-[12%] block h-auto w-[84%] self-start shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:-translate-y-1"
            />
          )}
        </div>
        <h3 className="mt-4 font-display text-[1.75rem] leading-tight transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mt-1.5 font-mono text-[0.8125rem] text-muted-foreground">
          {project.tagline} · {t.status[project.status].toLowerCase()}
        </p>
      </a>
    </article>
  );
};

export default FeaturedTile;
