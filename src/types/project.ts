export type ProjectType = "Web" | "App" | "Backend" | "Fullstack";
export type ProjectStatus = "Live" | "Case" | "Concept" | "Internal";

export interface ProjectLink {
  label: string;
  url: string;
  type: "demo" | "github" | "frontend" | "backend" | "other";
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string; // 1-2 sentences, max ~25 words
  overview: string; // Longer description for detail view
  image: string;
  type: ProjectType;
  status: ProjectStatus;
  techStack: string[];
  role: string;
  responsibilities: string[];
  architecture?: string;
  challenges: string[];
  links: ProjectLink[];
  featured?: boolean;
}
