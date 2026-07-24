import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

const statusVariant = {
  Live: "live",
  Case: "case",
  Concept: "concept",
  Internal: "internal",
} as const;

const ProjectCard = ({ project, index, onClick }: ProjectCardProps) => {
  const demoLink = project.links.find((l) => l.type === "demo");
  const githubLinks = project.links.filter((l) => l.type === "github");
  const featured = Boolean(project.featured);
  // Cards show at most 5 badges — an optional cardTech overrides which ones.
  const cardTech = (project.cardTech ?? project.techStack).slice(0, 5);
  const extraTech = Math.max(0, project.techStack.length - cardTech.length);

  return (
    <motion.article
      className={cn(
        // Each project is now a self-contained surface that lifts on hover.
        "group cursor-pointer flex flex-col rounded-xl border border-border bg-card",
        "p-3 sm:p-4 transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_hsl(var(--foreground)/0.18)] hover:border-primary/40",
        featured && "sm:col-span-2 sm:p-5"
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
    >
      <div
        className={cn(
          "flex-1",
          featured && "md:grid md:grid-cols-2 md:gap-6 md:items-center"
        )}
      >
        {/* Image Container */}
        <div
          className={cn(
            "relative overflow-hidden rounded-lg border border-border bg-muted",
            featured ? "aspect-[16/10] mb-4 md:mb-0" : "aspect-[16/10] mb-4"
          )}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />

          {/* Status Badge */}
          <Badge variant={statusVariant[project.status]} className="absolute top-3 right-3">
            {project.status}
          </Badge>

          {/* Type Badge */}
          <Badge variant="outline" className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm">
            {project.type}
          </Badge>

          {featured && (
            <Badge className="absolute bottom-3 left-3 bg-primary/90 backdrop-blur-sm">
              Featured
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 sm:gap-3">
          <div className="space-y-1">
            {/* Role eyebrow — the "what was your role" a recruiter scans for */}
            <p className="text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground">
              {project.role}
            </p>
            <h3
              className={cn(
                "font-display text-foreground group-hover:text-primary transition-colors",
                featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
              )}
            >
              {project.title}
            </h3>
          </div>

          <p
            className={cn(
              "text-muted-foreground text-sm leading-relaxed",
              featured ? "line-clamp-3" : "line-clamp-2"
            )}
          >
            {project.shortDescription}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5">
            {cardTech.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 bg-secondary/70 border border-border text-secondary-foreground rounded-md"
              >
                {tech}
              </span>
            ))}
            {extraTech > 0 && (
              <span className="text-xs px-2 py-1 text-muted-foreground">
                +{extraTech}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer — separated from the content for a clear card structure */}
      <div className="mt-4 pt-3 border-t border-border flex flex-wrap items-center gap-2">
        {/* Links stop propagation so they don't also open the modal */}
        <div className="flex flex-wrap items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {demoLink && (
            <Button variant="default" size="sm" className="text-xs h-8" asChild>
              <a href={demoLink.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3 mr-1" />
                Visit Site
              </a>
            </Button>
          )}
          {githubLinks.map((link, i) => (
            <Button key={i} variant="outline" size="sm" className="text-xs h-8" asChild>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <Github className="w-3 h-3 mr-1" />
                {link.label ?? "GitHub"}
              </a>
            </Button>
          ))}
        </div>

        {/* View details affordance — inherits the card's onClick to open the modal */}
        <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
          View details
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
