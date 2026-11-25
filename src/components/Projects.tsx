import { Reveal } from "@/components/editorial";
import { useProjects } from "@/data/projects";
import { useT } from "@/i18n/context";
import FeaturedTile from "./projects/FeaturedTile";
import ProjectIndex from "./projects/ProjectIndex";

/** Projects: the featured ones as two tiles, the rest as one-line rows. */
const Projects = ({ openRowId = null }: { openRowId?: string | null }) => {
  const t = useT();
  const projects = useProjects();
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="work" aria-labelledby="work-heading" className="page section-gap scroll-mt-4">
      <h2 id="work-heading" className="label text-muted-foreground">
        {t.projects.heading}
      </h2>

      <Reveal className="mt-6 grid gap-x-6 gap-y-12 md:grid-cols-2">
        {featured.map((project) => (
          <FeaturedTile key={project.id} project={project} />
        ))}
      </Reveal>

      {others.length > 0 && (
        <div className="mt-14">
          <ProjectIndex projects={others} openId={openRowId} />
        </div>
      )}
    </section>
  );
};

export default Projects;
