import { ExternalLink, Github, GitBranch } from "lucide-react";
import { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProjectImageCarousel from "./ProjectImageCarousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusVariant = {
  Live: "live",
  Case: "case",
  Concept: "concept",
  Internal: "internal",
} as const;

const getLinkIcon = (type: string) => {
  switch (type) {
    case "github":
    case "frontend":
    case "backend":
      return <Github className="w-4 h-4" />;
    case "demo":
      return <ExternalLink className="w-4 h-4" />;
    default:
      return <GitBranch className="w-4 h-4" />;
  }
};

const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  if (!project) return null;

  const frontendLink = project.links.find((l) => l.type === "frontend");
  const backendLink = project.links.find((l) => l.type === "backend");
  const hasRepoLinks = frontendLink || backendLink;
  
  // Use images array if available, otherwise fall back to single image
  const projectImages = project.images?.length ? project.images : [project.image];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-2xl h-[90vh] sm:h-[85vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 shrink-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge variant={statusVariant[project.status]}>
              {project.status}
            </Badge>
            <Badge variant="outline">{project.type}</Badge>
          </div>
          <DialogTitle className="font-display text-xl sm:text-2xl">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            {project.role}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-4 sm:px-6">
          <div className="space-y-4 sm:space-y-6 pb-6">
            {/* Project Image Carousel */}
            <ProjectImageCarousel images={projectImages} title={project.title} />

            {/* Overview */}
            <section className="space-y-2">
              <h4 className="font-semibold text-foreground">Overview</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {project.overview}
              </p>
            </section>

            {/* Tech Stack */}
            <section className="space-y-2">
              <h4 className="font-semibold text-foreground">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm px-3 py-1 bg-secondary text-secondary-foreground rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {project.architecture && (
                <p className="text-muted-foreground text-sm mt-2">
                  {project.architecture}
                </p>
              )}
            </section>

            {/* Responsibilities */}
            <section className="space-y-2">
              <h4 className="font-semibold text-foreground">My Responsibilities</h4>
              <ul className="space-y-1">
                {project.responsibilities.map((resp, i) => (
                  <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    {resp}
                  </li>
                ))}
              </ul>
            </section>

            {/* Challenges */}
            {project.challenges.length > 0 && (
              <section className="space-y-2">
                <h4 className="font-semibold text-foreground">Challenges & Decisions</h4>
                <ul className="space-y-1">
                  {project.challenges.map((challenge, i) => (
                    <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      {challenge}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Links */}
            {project.links.length > 0 && (
              <section className="space-y-3 pt-4 border-t border-border">
                <h4 className="font-semibold text-foreground">Links</h4>
                
                <div className="flex flex-wrap gap-2">
                  {project.links.map((link, i) => (
                    <Button
                      key={i}
                      variant={link.type === "demo" ? "default" : "outline"}
                      size="sm"
                      asChild
                    >
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {getLinkIcon(link.type)}
                        <span className="ml-2">{link.label}</span>
                      </a>
                    </Button>
                  ))}
                </div>

                {hasRepoLinks && (
                  <div className="flex gap-2 pt-2">
                    {frontendLink && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={frontendLink.url} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Frontend Repo
                        </a>
                      </Button>
                    )}
                    {backendLink && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={backendLink.url} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Backend Repo
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </section>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;
