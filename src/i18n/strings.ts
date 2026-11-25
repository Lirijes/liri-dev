import type { ProjectStatus } from "@/types/project";

/**
 * Interface text in both languages. Swedish defines the shape; English must
 * match it key for key (TypeScript fails the build otherwise). Project
 * content lives in src/data/projects/<lang>.ts, not here.
 *
 * Technical terms that are more natural in English (API, backend, frontend,
 * Entity Framework …) are deliberately left in English in the Swedish text.
 */
const sv = {
  meta: {
    title: "Lirije Shabani | Fullstackutvecklare",
    /** Title in link previews (og:title). */
    shareTitle: "Lirije | Fullstackutvecklare",
    description:
      "Fullstackutvecklare i Sverige med fokus på backend: API:er i C#/.NET, databaser, integrationer och AI. Bygger just nu Nodia, en .NET-plattform för att arbeta med företagsdata med hjälp av AI.",
    caseTitle: (project: string) => `${project} — Lirije Shabani`,
  },
  a11y: {
    skipToContent: "Hoppa till innehållet",
    mainNav: "Huvudmeny",
    language: "Språk",
    darkMode: "Byt till mörkt läge",
    lightMode: "Byt till ljust läge",
  },
  nav: {
    work: "Projekt",
    experience: "Erfarenhet",
    contact: "Kontakt",
  },
  languageNames: { sv: "Svenska", en: "English" },
  links: {
    cv: "CV ↓",
    github: "GitHub",
    linkedin: "LinkedIn",
    kofi: "Bjud mig på en kaffe ↗",
  },
  hero: {
    sectionLabel: "Introduktion",
    greetingBefore: "Hej, jag är ",
    greetingName: "Lirije.",
    intro:
      "Jag är fullstackutvecklare med ett särskilt intresse för backend, API:er och hur saker fungerar bakom gränssnittet. När jag inte kodar är jag på gymmet eller ute i naturen.",
    portraitAlt: "Porträtt av Lirije Shabani",
  },
  status: {
    Live: "Live",
    Demo: "Demo",
    Internal: "Internt",
    "In development": "Under utveckling",
    Paused: "Pausat",
  } satisfies Record<ProjectStatus, string>,
  projects: {
    heading: "Projekt",
    exploreLabel: (title: string) => `Utforska projektet: ${title}`,
  },
  caseStudy: {
    allWork: "← Alla projekt",
    role: "Roll",
    status: "Status",
    year: "År",
    links: "Länkar",
    problem: "Problem",
    solution: "Lösning",
    why: "Varför",
    built: "Byggt",
    inProgress: "Pågår",
    planned: "Planerat",
    notBuiltYet: "Inte byggt än",
    nextProject: "Nästa projekt",
    openScreenshot: (title: string, i: number, n: number) => `Öppna skärmbild ${i} av ${n} från ${title} i full storlek`,
    /** Section headings of a project page. */
    narrative: {
      whyStarted: (title: string) => `Varför jag började bygga ${title}`,
      whyBuilt: (title: string) => `Varför jag byggde ${title}`,
      background: "Bakgrund",
      howIWork: "Så arbetar jag",
      howIWorked: "Så arbetade jag",
      tech: "Teknik",
      architecture: "Arkitektur",
      howItWorks: "Så fungerar det",
      screenshots: "Skärmbilder",
      challenges: "Tekniska utmaningar",
      whatIBuilt: "Vad jag byggde",
      status: "Var projektet står",
      learnings: "Vad jag lärt mig",
    },
    noPublicCode: "Internt verktyg, ingen publik kod",
  },
  experience: {
    sectionLabel: "Erfarenhet",
    heading: "Erfarenhet",
    education: "Utbildning",
    tools: "C# · .NET · PostgreSQL · TypeScript · React",
  },
  contact: {
    sectionLabel: "Kontakt",
    closing: "Hör av dig — ",
  },
  lightbox: {
    title: (title: string, i: number, n: number) => `${title} — bild ${i} av ${n}`,
    zoomIn: "Zooma in",
    zoomOut: "Zooma ut",
    close: "Stäng",
    previous: "Föregående bild",
    next: "Nästa bild",
    viewImage: (i: number) => `Visa bild ${i}`,
  },
  diagram: {
    legend: "Teckenförklaring",
    built: "Byggt",
    planned: "Planerat",
    client: "Frontend",
    server: "Backend",
    data: "Databas",
    blocked: "Ingen åtkomst",
  },
  notFound: {
    message: "Sidan finns inte.",
    home: "Till startsidan",
  },
};

export type Strings = typeof sv;

const en: Strings = {
  meta: {
    title: "Lirije Shabani | Fullstack Developer",
    shareTitle: "Lirije | Fullstack Developer",
    description:
      "Fullstack developer in Sweden with a focus on backend: C#/.NET APIs, databases, integrations and AI. Currently building Nodia, a .NET platform for working with company data using AI.",
    caseTitle: (project) => `${project} — Lirije Shabani`,
  },
  a11y: {
    skipToContent: "Skip to content",
    mainNav: "Main",
    language: "Language",
    darkMode: "Switch to dark mode",
    lightMode: "Switch to light mode",
  },
  nav: {
    work: "Projects",
    experience: "Experience",
    contact: "Contact",
  },
  languageNames: { sv: "Svenska", en: "English" },
  links: {
    cv: "CV ↓",
    github: "GitHub",
    linkedin: "LinkedIn",
    kofi: "Buy me a coffee ↗",
  },
  hero: {
    sectionLabel: "Introduction",
    greetingBefore: "Hi, I'm ",
    greetingName: "Lirije.",
    intro:
      "I'm a full-stack developer with a particular interest in backend, APIs and how things work behind the interface. When I'm not coding, I'm at the gym or out in nature.",
    portraitAlt: "Portrait of Lirije Shabani",
  },
  status: {
    Live: "Live",
    Demo: "Demo",
    Internal: "Internal",
    "In development": "In development",
    Paused: "Paused",
  },
  projects: {
    heading: "Projects",
    exploreLabel: (title) => `Explore project: ${title}`,
  },
  caseStudy: {
    allWork: "← All work",
    role: "Role",
    status: "Status",
    year: "Year",
    links: "Links",
    problem: "Problem",
    solution: "Solution",
    why: "Why",
    built: "Built",
    inProgress: "In progress",
    planned: "Planned",
    notBuiltYet: "Not built yet",
    nextProject: "Next project",
    openScreenshot: (title, i, n) => `Open ${title} screenshot ${i} of ${n} full size`,
    narrative: {
      whyStarted: (title) => `Why I started building ${title}`,
      whyBuilt: (title) => `Why I built ${title}`,
      background: "Background",
      howIWork: "How I work",
      howIWorked: "How I worked",
      tech: "Tech",
      architecture: "Architecture",
      howItWorks: "How it works",
      screenshots: "Screenshots",
      challenges: "Technical challenges",
      whatIBuilt: "What I built",
      status: "Where it stands",
      learnings: "What I've learned",
    },
    noPublicCode: "Internal tool, no public code",
  },
  experience: {
    sectionLabel: "Experience",
    heading: "Experience",
    education: "Education",
    tools: "C# · .NET · PostgreSQL · TypeScript · React",
  },
  contact: {
    sectionLabel: "Contact",
    closing: "Get in touch — ",
  },
  lightbox: {
    title: (title, i, n) => `${title} — image ${i} of ${n}`,
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    close: "Close",
    previous: "Previous image",
    next: "Next image",
    viewImage: (i) => `View image ${i}`,
  },
  diagram: {
    legend: "Legend",
    built: "Built",
    planned: "Planned",
    client: "Frontend",
    server: "Backend",
    data: "Database",
    blocked: "No access",
  },
  notFound: {
    message: "Oops! Page not found",
    home: "Return to Home",
  },
};

export const strings = { sv, en } as const;
