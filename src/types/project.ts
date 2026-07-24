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
  image: string; // Primary image for card
  images?: string[]; // Multiple images for detail carousel
  type: ProjectType;
  status: ProjectStatus;
  techStack: string[]; // Full stack shown in the detail view
  cardTech?: string[]; // Optional override for the badges shown on the card
  role: string;
  responsibilities: string[];
  architecture?: string;
  challenges: string[];
  links: ProjectLink[];
  featured?: boolean;
}
