import { afterEach, describe, it, expect } from "vitest";
import { act, fireEvent, screen, within } from "@testing-library/react";
import Index from "@/pages/Index";
import Projects from "@/components/Projects";
import { projectsByLang } from "@/data/projects";
import { renderIn } from "./render";

// These tests check the English version; Swedish has its own tests in i18n.test.tsx.
const projects = projectsByLang.en;

const goTo = (hash: string) =>
  act(() => {
    window.location.hash = hash;
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });

const sectionsOf = () => screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);

describe("project data", () => {
  it("has unique ids, a background and a role for every project", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const p of projects) {
      expect(p.background.length).toBeGreaterThan(40);
      expect(p.myRole.length).toBeGreaterThan(20);
    }
  });

  it("gives every project either challenges or a 'what I built' list, never both", () => {
    for (const p of projects) {
      const hasChallenges = p.decisions.length > 0;
      const hasBuilt = Boolean(p.builtItems?.length);
      expect(hasChallenges !== hasBuilt).toBe(true);
      expect(p.decisions.length).toBeLessThanOrEqual(3);
    }
  });

  it("keeps learnings short, and leaves them out rather than inventing them", () => {
    for (const p of projects) if (p.learnings) expect(p.learnings.length).toBeLessThanOrEqual(3);
    expect(projects.find((p) => p.id === "inspecto")!.learnings).toBeUndefined();
    expect(projects.find((p) => p.id === "sitemap-generator")!.learnings).toBeUndefined();
  });

  it.each(["en", "sv"] as const)("never presents Nodia's planned features as built (%s)", (lang) => {
    const nodia = projectsByLang[lang].find((p) => p.id === "nodia")!;
    const plannedTerms = /semantic kernel|ollama|\brag\b|retrieval|agent|embedding/i;
    const presentedAsDone = [
      nodia.summary,
      nodia.currentFocus ?? "",
      nodia.techNote ?? "",
      nodia.architecture ?? "",
      ...nodia.progress!.built,
      ...(nodia.progress!.inProgress ?? []),
      ...nodia.cardTech,
      ...nodia.tech.flatMap((g) => g.items),
      ...nodia.decisions.flatMap((d) => [d.problem, d.decision, d.why ?? ""]),
    ];
    for (const text of presentedAsDone) expect(text).not.toMatch(plannedTerms);
    expect(nodia.progress!.planned!.join(" ")).toMatch(/Semantic Kernel/);
    // Quote generation is part of the vision, so it is listed as planned only.
    expect(nodia.progress!.planned!.join(" ")).toMatch(lang === "sv" ? /Offertförslag/ : /Quote drafts/);
    expect(nodia.progress!.built.join(" ")).not.toMatch(/offert|quote/i);
    // Planned technologies live in their own field, never in the implemented stack.
    expect(nodia.plannedTech).toEqual(["Semantic Kernel", "Ollama"]);
  });

  it("lists Nodia's merged workspace work as built, not in progress", () => {
    const nodia = projects.find((p) => p.id === "nodia")!;
    expect(nodia.progress!.built.join(" ")).toMatch(/onboarding.*switcher.*active workspace/);
    expect(nodia.progress!.inProgress ?? []).toHaveLength(0);
  });

  it("describes how AI was or wasn't used on every project", () => {
    const role = (id: string) => projects.find((p) => p.id === id)!;
    for (const id of ["nodia", "minsommar", "inspecto"]) expect(role(id).role).toMatch(/AI-assisted/);
    expect(role("nodia").myRole).toMatch(/Claude/);
    expect(role("minsommar").myRole).toMatch(/Claude Code/);
    expect(role("inspecto").myRole).toMatch(/Claude Code/);
    expect(role("review-management-tool").myRole).toMatch(/ChatGPT.*not to write the code/);
    expect(role("sitemap-generator").myRole).toMatch(/didn't use AI/);
    // Lovable is only part of Nodia's history.
    for (const p of projects.filter((x) => x.id !== "nodia")) {
      expect(JSON.stringify(p)).not.toMatch(/Lovable/);
    }
  });

  it("marks Inspecto as paused, without a 'next step'", () => {
    const inspecto = projects.find((p) => p.id === "inspecto")!;
    expect(inspecto.status).toBe("Paused");
    expect(JSON.stringify(inspecto)).not.toMatch(/next step/i);
  });

  it("only links to https URLs", () => {
    for (const link of projects.flatMap((p) => p.links)) expect(link.url).toMatch(/^https:\/\//);
  });
});

describe("homepage projects", () => {
  it("links every project to its own page", () => {
    renderIn("en", <Projects />);
    for (const p of projects) {
      expect(screen.getByRole("link", { name: `Explore project: ${p.title}` })).toHaveAttribute(
        "href",
        `#project/${p.id}`
      );
    }
    // The smaller projects are plain links now, not expandable rows.
    expect(screen.queryByRole("button", { expanded: false })).toBeNull();
  });
});

describe("project pages", () => {
  afterEach(() => window.history.replaceState(null, "", "/"));

  it("renders Nodia as a story-led page, keeping planned work apart", () => {
    window.history.replaceState(null, "", "/#project/nodia");
    renderIn("en", <Index />);
    expect(screen.getByRole("heading", { level: 1, name: "Nodia" })).toBeInTheDocument();
    expect(sectionsOf()).toEqual([
      "Why I started building Nodia",
      "Tech",
      "Architecture",
      "Technical challenges",
      "Where it stands",
      "What I've learned",
    ]);
    expect(screen.getByRole("heading", { level: 3, name: "How I work" })).toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Chapters" })).toBeNull();

    // Three challenges, open (no accordions), each with problem, solution and why.
    const challenges = document.querySelectorAll("#chapter-decisions ol > li");
    expect(challenges).toHaveLength(3);
    expect(screen.queryAllByRole("button", { expanded: false })).toHaveLength(0);
    expect(challenges[0]).toHaveTextContent("No shortcut past the API");

    const planned = screen.getByRole("heading", { name: /^Planned/ }).parentElement!;
    expect(planned).toHaveTextContent("Not built yet");
    expect(planned).toHaveTextContent("Semantic Kernel");
    expect(planned).toHaveTextContent("Quote drafts");
    const built = screen.getByRole("heading", { name: "Built" }).parentElement!;
    expect(built).not.toHaveTextContent("Semantic Kernel");
    // Planned technologies sit in their own, labelled row of the tech list.
    const plannedTech = within(document.getElementById("chapter-tech")!).getByText("Planned");
    expect(plannedTech.nextElementSibling).toHaveTextContent("Semantic Kernel · Ollama");
  });

  it("gives MinSommar the full page, with screenshots and no status section", () => {
    window.history.replaceState(null, "", "/#project/minsommar");
    renderIn("en", <Index />);
    expect(sectionsOf()).toEqual([
      "Why I built MinSommar",
      "Tech",
      "Architecture",
      "Screenshots",
      "Technical challenges",
      "What I've learned",
    ]);
    expect(screen.getByRole("heading", { level: 3, name: "How I worked" })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Open MinSommar screenshot/ })).toHaveLength(5);
  });

  it("gives Inspecto a medium page: paused, no status or learnings", () => {
    window.history.replaceState(null, "", "/#project/inspecto");
    renderIn("en", <Index />);
    expect(sectionsOf()).toEqual(["Why I built Inspecto", "Tech", "Architecture", "Screenshots", "Technical challenges"]);
    expect(screen.getByText("Paused")).toBeInTheDocument();
    // Paused: nothing on the page — the diagram included — promises a next step.
    expect(document.getElementById("main")!.textContent).not.toMatch(/next step|planned/i);
    window.history.replaceState(null, "", "/?lang=sv#project/inspecto");
  });

  it("shows no next step on Inspecto's Swedish page either", () => {
    renderIn("sv", <Index />);
    window.history.replaceState(null, "", "/#project/inspecto");
    goTo("#project/inspecto");
    expect(screen.getByText("Pausat")).toBeInTheDocument();
    expect(document.getElementById("main")!.textContent).not.toMatch(/nästa steg|planerat/i);
  });

  it("gives the Review Management Tool a short page with background and what I built", () => {
    window.history.replaceState(null, "", "/#project/review-management-tool");
    renderIn("en", <Index />);
    expect(screen.getByRole("heading", { level: 1, name: "Review Management Tool" })).toBeInTheDocument();
    expect(sectionsOf()).toEqual(["Background", "Tech", "Screenshots", "What I built", "What I've learned"]);
    expect(screen.getByText("Internal tool, no public code")).toBeInTheDocument();
  });

  it("labels the Sitemap Generator's diagram 'How it works'", () => {
    window.history.replaceState(null, "", "/#project/sitemap-generator");
    renderIn("en", <Index />);
    expect(sectionsOf()).toEqual(["Why I built Sitemap Generator", "Tech", "How it works", "Screenshots", "Technical challenges"]);
  });

  it("links every page to the next project, wrapping around", () => {
    window.history.replaceState(null, "", "/#project/sitemap-generator");
    renderIn("en", <Index />);
    expect(screen.getByRole("link", { name: /Nodia →/ })).toHaveAttribute("href", "#project/nodia");
    goTo("#project/nodia");
    expect(screen.getByRole("link", { name: /MinSommar →/ })).toHaveAttribute("href", "#project/minsommar");
  });

  it("skip link moves focus to the content without leaving a project page", () => {
    window.history.replaceState(null, "", "/#project/nodia");
    renderIn("en", <Index />);
    fireEvent.click(screen.getByRole("link", { name: "Skip to content" }));
    expect(document.activeElement).toBe(document.getElementById("main"));
    expect(window.location.hash).toBe("#project/nodia");
    expect(screen.getByRole("heading", { level: 1, name: "Nodia" })).toBeInTheDocument();
  });

  it("switches between the portfolio and a project page when the hash changes", () => {
    renderIn("en", <Index />);
    expect(screen.getByRole("heading", { level: 1, name: /Lirije/ })).toBeInTheDocument();
    goTo("#project/minsommar");
    expect(screen.getByRole("heading", { level: 1, name: "MinSommar" })).toBeInTheDocument();
    goTo("#featured-minsommar");
    expect(screen.getByRole("heading", { level: 1, name: /Lirije/ })).toBeInTheDocument();
  });

  it("ignores unknown project ids", () => {
    window.history.replaceState(null, "", "/#project/does-not-exist");
    renderIn("en", <Index />);
    expect(screen.getByRole("heading", { level: 1, name: /Lirije/ })).toBeInTheDocument();
  });
});
