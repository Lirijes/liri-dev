import { SectionHead } from "@/components/editorial";
import { useProjects } from "@/data/projects";
import { useT } from "@/i18n/context";
import FeaturedChapter from "./projects/FeaturedChapter";
import ProjectIndex from "./projects/ProjectIndex";

/** Selected work: featured chapters first, then the numbered index. */
const Projects = ({ openRowId = null }: { openRowId?: string | null }) => {
  const t = useT();
  const projects = useProjects();
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  const years = projects.map((p) => Number(p.year));

  return (
    <section id="work" aria-label={t.projects.sectionLabel} className="page section-gap scroll-mt-4">
      <SectionHead label={t.projects.selectedWork} aside={`${Math.min(...years)} — ${Math.max(...years)}`} />

      <div className="mt-[clamp(4rem,7vw,5.5rem)] space-y-[clamp(7rem,13vw,11rem)]">
        {featured.map((project, i) => (
          <FeaturedChapter key={project.id} project={project} index={i} />
        ))}
      </div>

      {others.length > 0 && (
        <div className="section-gap">
          <p className="label mb-3.5">{t.projects.moreProjects}</p>
          <ProjectIndex projects={others} startNumber={featured.length + 1} openId={openRowId} />
        </div>
      )}
    </section>
  );
};

export default Projects;
