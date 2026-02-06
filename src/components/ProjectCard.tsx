import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "@/types/project";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  const githubLink = project.links.find((l) => l.type === "github");

  return (
    <motion.article
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
    >
      {/* Image Container */}
      <motion.div
        className="relative aspect-[16/10] mb-4 overflow-hidden rounded-lg bg-muted"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
        
        {/* Status Badge */}
        <Badge
          variant={statusVariant[project.status]}
          className="absolute top-3 right-3"
        >
          {project.status}
        </Badge>
        
        {/* Type Badge */}
        <Badge variant="outline" className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm">
          {project.type}
        </Badge>
      </motion.div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="font-display text-xl text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-xs px-2 py-1 text-muted-foreground">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
          {demoLink && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              asChild
            >
              <a href={demoLink.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3 mr-1" />
                Live Demo
              </a>
            </Button>
          )}
          {githubLink && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              asChild
            >
              <a href={githubLink.url} target="_blank" rel="noopener noreferrer">
                <Github className="w-3 h-3 mr-1" />
                GitHub
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
