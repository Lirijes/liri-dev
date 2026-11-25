import { useT } from "@/i18n/context";
import { projectHash } from "@/lib/hash-route";
import type { Project } from "@/types/project";

/**
 * The smaller projects as one-line rows: name and tagline, linking to the
 * project's own page. Each row keeps the id "project-<id>", so a project
 * page's back link returns the visitor to the same spot.
 */
const ProjectIndex = ({ projects }: { projects: Project[] }) => {
  const t = useT();
  return (
    <ul className="border-t border-rule">
      {projects.map((project) => (
        <li key={project.id} id={`project-${project.id}`} className="scroll-mt-8 border-b border-rule">
          <a
            href={projectHash(project.id)}
            aria-label={t.projects.exploreLabel(project.title)}
            className="group flex w-full items-baseline gap-x-4 py-5"
          >
            <span className="flex min-w-0 flex-1 flex-col gap-x-5 gap-y-1 sm:flex-row sm:items-baseline">
              <span className="text-[1.3125rem] font-medium leading-tight tracking-[-0.02em] transition-colors group-hover:text-primary">
                {project.title}
              </span>
              <span className="font-mono text-[0.8125rem] text-muted-foreground">{project.tagline}</span>
            </span>
            <span aria-hidden className="text-lg leading-none transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ProjectIndex;
