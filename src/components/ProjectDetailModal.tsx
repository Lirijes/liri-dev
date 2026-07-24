import { ExternalLink, Github, GitBranch, Check } from "lucide-react";
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

// Small consistent section label used throughout the detail view.
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <h4 className="text-[0.7rem] font-medium uppercase tracking-wider text-primary mb-2">
    {children}
  </h4>
);

const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  if (!project) return null;

  // Use images array if available, otherwise fall back to single image
  const projectImages = project.images?.length ? project.images : [project.image];

  const facts = [
    { label: "Role", value: project.role },
    { label: "Type", value: project.type },
    { label: "Status", value: project.status },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-4xl h-[90vh] sm:h-[86vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-4 sm:px-6 pt-5 sm:pt-6 pb-4 shrink-0 border-b border-border text-left space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={statusVariant[project.status]}>{project.status}</Badge>
            <Badge variant="outline">{project.type}</Badge>
          </div>
          <DialogTitle className="font-display text-2xl sm:text-3xl font-normal">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            {project.shortDescription}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="grid gap-6 p-4 sm:p-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            {/* Left column — at a glance */}
            <div className="min-w-0 space-y-5">
              <ProjectImageCarousel images={projectImages} title={project.title} />

              {/* Facts */}
              <dl className="rounded-lg border border-border bg-secondary/40 divide-y divide-border overflow-hidden">
                {facts.map((f) => (
                  <div key={f.label} className="flex items-center justify-between gap-3 px-4 py-2.5">
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                      {f.label}
                    </dt>
                    <dd className="text-sm font-medium text-foreground text-right">{f.value}</dd>
                  </div>
                ))}
              </dl>

              {/* Links */}
              {project.links.length > 0 && (
                <div className="space-y-2">
                  <SectionLabel>Links</SectionLabel>
                  <div className="flex flex-col gap-2">
                    {project.links.map((link, i) => (
                      <Button
                        key={i}
                        variant={link.type === "demo" ? "default" : "outline"}
                        size="sm"
                        className="justify-start"
                        asChild
                      >
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {getLinkIcon(link.type)}
                          <span className="ml-2">{link.label}</span>
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right column — the story */}
            <div className="min-w-0 space-y-6">
              {/* Overview */}
              <section>
                <SectionLabel>Overview</SectionLabel>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.overview}
                </p>
              </section>

              {/* Tech Stack */}
              <section>
                <SectionLabel>Tech Stack</SectionLabel>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm px-3 py-1 bg-secondary/70 border border-border text-secondary-foreground rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.architecture && (
                  <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                    {project.architecture}
                  </p>
                )}
              </section>

              {/* Responsibilities */}
              <section>
                <SectionLabel>My Responsibilities</SectionLabel>
                <ul className="space-y-2">
                  {project.responsibilities.map((resp, i) => (
                    <li key={i} className="text-muted-foreground text-sm flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-3 w-3" />
                      </span>
                      {resp}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Challenges */}
              {project.challenges.length > 0 && (
                <section>
                  <SectionLabel>Challenges &amp; Decisions</SectionLabel>
                  <ul className="space-y-2">
                    {project.challenges.map((challenge, i) => (
                      <li key={i} className="text-muted-foreground text-sm flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;
