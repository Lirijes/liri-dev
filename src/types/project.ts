export type ProjectType = "Web" | "App" | "Backend" | "Fullstack";
export type ProjectStatus = "Live" | "Demo" | "Internal" | "In development" | "Paused";

/** Ids of the diagram components in src/components/diagrams. */
export type DiagramId =
  | "nodia-architecture"
  | "nodia-request-flow"
  | "minsommar-access"
  | "minsommar-rewards"
  | "inspecto-architecture"
  | "sitemap-pipeline";

export interface ProjectLink {
  label: string;
  url: string;
  type: "demo" | "github";
}

/** A technical challenge told as problem → solution → reason. */
export interface ProjectDecision {
  title: string;
  problem: string;
  decision: string;
  /** Left out when the reasoning can't be stated from verified facts. */
  why?: string;
}

export interface TechGroup {
  label: string;
  items: string[];
}

// Keeps implemented, ongoing and planned work strictly apart for projects
// that are still being built, so planned items never read as finished.
export interface ProjectProgress {
  built: string[];
  inProgress?: string[];
  planned?: string[];
}

/** What the project shows as its main visual on the homepage. */
export type ProjectVisual = { kind: "image"; src: string; alt: string } | { kind: "diagram"; id: DiagramId };

/**
 * One project. Every project has its own page (#project/<id>) built from the
 * same template; a section is shown only when its field has content, so a
 * small project gets a short page.
 */
export interface Project {
  id: string;
  title: string;
  /** A few words shown next to the title on the homepage, e.g. "Summer planner for families". */
  tagline: string;
  /** Where the work was done, e.g. "RevolutionRace". Personal projects leave it out. */
  context?: string;
  year: string;
  role: string;
  type: ProjectType;
  status: ProjectStatus;
  /** Shown as a large tile on the homepage; the others are one-line rows. */
  featured?: boolean;

  /** One or two sentences: the lede of the project page. */
  summary: string;
  /** Why the project exists (or, for an assignment, its background). Paragraphs split on a blank line. */
  background: string;
  /** Where the work is focused right now (projects in development). */
  currentFocus?: string;
  /** How I worked, including exactly how AI was or wasn't used. */
  myRole: string;

  /** Background of the homepage tile and the screenshots. */
  visualTone?: "paper" | "mint";
  visual: ProjectVisual;
  images?: string[];
  /** The diagram shown on the page (the first one). */
  diagrams?: DiagramId[];
  /** Two or three sentences shown with the diagram. */
  architecture?: string;
  /** Labels the diagram section "How it works" instead of "Architecture". */
  architectureLabel?: "architecture" | "howItWorks";

  cardTech: string[];
  /** Implemented technologies only. */
  tech: TechGroup[];
  /** Technologies that are planned but not used yet — shown separately, never mixed into `tech`. */
  plannedTech?: string[];
  /** One line under the tech list, e.g. where the frontend started or how it's deployed. */
  techNote?: string;

  /** Technical challenges as problem → solution → why. Small projects may have none. */
  decisions: ProjectDecision[];
  /** One sentence introducing the challenges. */
  challengesIntro?: string;
  /** "What I built": used instead of challenges where there is no real problem/solution to tell. */
  builtItems?: string[];
  progress?: ProjectProgress;
  /** Concrete things I learned. Left out rather than invented. */
  learnings?: string[];
  links: ProjectLink[];
}
