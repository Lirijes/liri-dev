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

describe("project data", () => {
  it("has unique ids and at least one decision per project", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const p of projects) expect(p.decisions.length).toBeGreaterThan(0);
  });

  it("gives featured projects a story and implementation notes, and secondary projects highlights", () => {
    for (const p of projects) {
      if (p.featured) {
        expect(p.story).toBeTruthy();
        expect(p.implementation?.length).toBeGreaterThan(0);
      } else {
        expect(p.highlights?.length).toBeGreaterThan(0);
      }
    }
  });

  it.each(["en", "sv"] as const)("never presents Nodia's planned features as built (%s)", (lang) => {
    const nodia = projectsByLang[lang].find((p) => p.id === "nodia")!;
    const plannedTerms = /semantic kernel|ollama|\brag\b|retrieval|agent|embedding/i;
    const presentedAsDone = [
      nodia.summary,
      nodia.story ?? "",
      ...(nodia.keyPoints ?? []),
      ...nodia.progress!.built,
      ...(nodia.progress!.inProgress ?? []),
      ...nodia.cardTech,
      ...nodia.tech.flatMap((g) => g.items),
      ...nodia.decisions.flatMap((d) => [d.problem, d.decision, d.why ?? ""]),
      ...nodia.implementation!.flatMap((n) => [n.title, n.text]),
    ];
    for (const text of presentedAsDone) expect(text).not.toMatch(plannedTerms);
    expect(nodia.progress!.planned!.join(" ")).toMatch(/Semantic Kernel/);
    // Planned technologies live in their own field, never in the implemented stack.
    expect(nodia.plannedTech).toEqual(["Semantic Kernel", "Ollama"]);
  });

  it("lists Nodia's merged workspace work as built, not in progress", () => {
    const nodia = projects.find((p) => p.id === "nodia")!;
    expect(nodia.progress!.built.join(" ")).toMatch(/onboarding.*workspace switcher.*active workspace/);
    expect(nodia.progress!.inProgress ?? []).toHaveLength(0);
  });

  it("only links to https URLs", () => {
    for (const link of projects.flatMap((p) => p.links)) expect(link.url).toMatch(/^https:\/\//);
  });
});

describe("homepage projects", () => {
  it("links each featured project to its case study", () => {
    renderIn("en", <Projects />);
    for (const p of projects.filter((x) => x.featured)) {
      expect(screen.getByRole("link", { name: new RegExp(`Explore project: ${p.title}`) })).toHaveAttribute(
        "href",
        `#project/${p.id}`
      );
    }
  });

  it("starts every secondary row closed and opens one on click", () => {
    renderIn("en", <Projects />);
    const others = projects.filter((p) => !p.featured);
    const toggles = others.map((p) => screen.getByRole("button", { name: new RegExp(p.title) }));
    for (const t of toggles) expect(t).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggles[0]);
    expect(toggles[0]).toHaveAttribute("aria-expanded", "true");
    const panel = screen.getByRole("region", { name: `${others[0].title} details` });
    expect(within(panel).getByText("Technical highlights")).toBeInTheDocument();
  });
});

describe("case study pages", () => {
  afterEach(() => window.history.replaceState(null, "", "/"));

  it("renders Nodia as its own page with chapters, keeping planned work apart", () => {
    window.history.replaceState(null, "", "/#project/nodia");
    renderIn("en", <Index />);
    expect(screen.getByRole("heading", { level: 1, name: "Nodia" })).toBeInTheDocument();
    const chapters = screen.getByRole("navigation", { name: "Chapters" });
    expect(within(chapters).getByRole("link", { name: "Progress" })).toHaveAttribute("href", "#project/nodia/progress");
    expect(within(chapters).queryByRole("link", { name: "Screenshots" })).toBeNull();

    const planned = screen.getByRole("heading", { name: "Planned" }).parentElement!;
    expect(planned).toHaveTextContent("Not built yet");
    expect(planned).toHaveTextContent("Semantic Kernel");
    const built = screen.getByRole("heading", { name: "Built" }).parentElement!;
    expect(built).not.toHaveTextContent("Semantic Kernel");
    expect(screen.queryByRole("heading", { name: "In progress" })).toBeNull();
    // The tech list keeps planned technologies in their own, labelled row.
    expect(screen.getByText("Planned, not used yet").nextElementSibling).toHaveTextContent("Semantic Kernel · Ollama");
  });

  it("skip link moves focus to the content without leaving a case study", () => {
    window.history.replaceState(null, "", "/#project/nodia");
    renderIn("en", <Index />);
    fireEvent.click(screen.getByRole("link", { name: "Skip to content" }));
    expect(document.activeElement).toBe(document.getElementById("main"));
    expect(window.location.hash).toBe("#project/nodia");
    expect(screen.getByRole("heading", { level: 1, name: "Nodia" })).toBeInTheDocument();
  });

  it("shows one decision at a time, starting with the first", () => {
    window.history.replaceState(null, "", "/#project/nodia");
    renderIn("en", <Index />);
    const first = screen.getByRole("button", { name: /The API is the only path to the data/ });
    const second = screen.getByRole("button", { name: /Identity only from the verified token/ });
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(second).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(second);
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(first).toHaveAttribute("aria-expanded", "false");
  });

  it("gives MinSommar a screenshots chapter and links to the next project", () => {
    window.history.replaceState(null, "", "/#project/minsommar");
    renderIn("en", <Index />);
    expect(screen.getByRole("heading", { level: 2, name: "Screenshots" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Nodia →/ })).toHaveAttribute("href", "#project/nodia");
  });

  it("switches between the portfolio and a case study when the hash changes", () => {
    renderIn("en", <Index />);
    expect(screen.getByRole("heading", { level: 1, name: /Lirije/ })).toBeInTheDocument();
    goTo("#project/minsommar");
    expect(screen.getByRole("heading", { level: 1, name: "MinSommar" })).toBeInTheDocument();
    goTo("#featured-minsommar");
    expect(screen.getByRole("heading", { level: 1, name: /Lirije/ })).toBeInTheDocument();
  });

  it("opens a secondary project's row instead of a page", () => {
    window.history.replaceState(null, "", "/#project/review-management-tool");
    renderIn("en", <Index />);
    expect(screen.queryByRole("heading", { level: 1, name: "Review Management Tool" })).toBeNull();
    expect(screen.getByRole("button", { name: /Review Management Tool/ })).toHaveAttribute("aria-expanded", "true");
  });

  it("ignores unknown project ids", () => {
    window.history.replaceState(null, "", "/#project/does-not-exist");
    renderIn("en", <Index />);
    expect(screen.getByRole("heading", { level: 1, name: /Lirije/ })).toBeInTheDocument();
  });
});
