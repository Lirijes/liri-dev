export type ProjectType = "Web" | "App" | "Backend" | "Fullstack";
export type ProjectStatus = "Live" | "Demo" | "Internal" | "In development";

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

/** A technical decision told as problem → decision → reason. */
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

/** What the project shows as its main visual on the overview. */
export type ProjectVisual = { kind: "image"; src: string; alt: string } | { kind: "diagram"; id: DiagramId };

export interface ImplementationNote {
  title: string;
  text: string;
}

export interface Project {
  id: string;
  title: string;
  /** Where the work was done, e.g. "RevolutionRace". Personal projects leave it out. */
  context?: string;
  year: string;
  role: string;
  type: ProjectType;
  status: ProjectStatus;
  featured?: boolean;

  /** One or two sentences, shown on cards and in the detail header. */
  summary: string;
  /** Longer description for the Overview tab. */
  overview: string;
  /** One sentence describing my role — replaces long responsibility lists. */
  myRole: string;
  /** Featured projects: three short "what I built" points. */
  keyPoints?: string[];
  /** Featured projects: the homepage text, written as a short story. */
  story?: string;
  /** Background of the featured visual panel. */
  visualTone?: "paper" | "mint";
  /** Secondary projects: technical highlights shown when the row is opened. */
  highlights?: string[];
  /** Featured projects: the Implementation chapter of the case study. */
  implementation?: ImplementationNote[];

  visual: ProjectVisual;
  /** Screenshots for the Screenshots tab. */
  images?: string[];
  diagrams?: DiagramId[];
  /** Short text shown above the diagrams in the Architecture tab. */
  architecture?: string;

  cardTech: string[];
  /** Implemented technologies only. */
  tech: TechGroup[];
  /** Technologies that are planned but not used yet — shown separately, never mixed into `tech`. */
  plannedTech?: string[];
  /** The first decision is shown as the key decision on featured projects. */
  decisions: ProjectDecision[];
  /**
   * How the decisions chapter is labelled. "solutions" (Technical solutions /
   * Solution) is used where the solutions were largely proposed with AI
   * assistance, so the wording doesn't imply sole authorship. Default: "decisions".
   */
  decisionsTerm?: "decisions" | "solutions";
  progress?: ProjectProgress;
  links: ProjectLink[];
}
