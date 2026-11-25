import { describe, it, expect } from "vitest";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import App from "@/App";
import { projectsByLang } from "@/data/projects";
import { readInitialLang } from "@/i18n/lang";
import type { Project } from "@/types/project";

const goTo = (hash: string) =>
  act(() => {
    window.location.hash = hash;
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  });

const switchTo = (code: "SV" | "EN") => fireEvent.click(screen.getByRole("button", { name: new RegExp(`^${code}`) }));

describe("translation parity", () => {
  // Everything that isn't prose must be identical, so a translation can never change a fact.
  const facts = (p: Project) => ({
    id: p.id,
    title: p.title,
    year: p.year,
    type: p.type,
    status: p.status,
    featured: p.featured,
    context: p.context,
    decisionsTerm: p.decisionsTerm,
    visualTone: p.visualTone,
    visual: p.visual.kind === "image" ? p.visual.src : p.visual.id,
    images: p.images,
    diagrams: p.diagrams,
    cardTech: p.cardTech,
    plannedTech: p.plannedTech,
    links: p.links.map((l) => [l.type, l.url]),
    tech: p.tech.map((g) => g.items.length),
    keyPoints: p.keyPoints?.length,
    highlights: p.highlights?.length,
    implementation: p.implementation?.length,
    decisions: p.decisions.map((d) => Boolean(d.why)),
    built: p.progress?.built.length,
    inProgress: p.progress?.inProgress?.length,
    planned: p.progress?.planned?.length,
  });

  it("has the same projects, facts and structure in Swedish and English", () => {
    expect(projectsByLang.sv.map(facts)).toEqual(projectsByLang.en.map(facts));
  });

  it("actually translates the prose", () => {
    projectsByLang.sv.forEach((sv, i) => {
      const en = projectsByLang.en[i];
      expect(sv.summary).not.toBe(en.summary);
      expect(sv.overview).not.toBe(en.overview);
      expect(sv.decisions[0].title).not.toBe(en.decisions[0].title);
    });
  });
});

describe("language choice", () => {
  it("defaults to Swedish", () => {
    expect(readInitialLang()).toBe("sv");
  });

  it("prefers ?lang in the URL over a saved preference", () => {
    window.localStorage.setItem("liri-dev.lang", "sv");
    window.history.replaceState(null, "", "/?lang=en#work");
    expect(readInitialLang()).toBe("en");
  });

  it("falls back to the saved preference", () => {
    window.localStorage.setItem("liri-dev.lang", "en");
    expect(readInitialLang()).toBe("en");
  });

  it("ignores unknown values", () => {
    window.history.replaceState(null, "", "/?lang=de");
    expect(readInitialLang()).toBe("sv");
  });
});

describe("switching language", () => {
  it("renders the homepage in Swedish with Swedish metadata", () => {
    render(<App />);
    expect(document.documentElement.lang).toBe("sv");
    expect(document.title).toBe("Lirije Shabani | Fullstackutvecklare");
    expect(screen.getByRole("region", { name: "Projekt" })).toBeInTheDocument();
    expect(window.location.search).toBe("");
  });

  it("switches the homepage to English and back, saving the choice", () => {
    // jsdom doesn't load index.html, so add the meta tag the app updates.
    const meta = document.createElement("meta");
    meta.name = "description";
    document.head.appendChild(meta);
    render(<App />);
    expect(meta.content).toMatch(/^Fullstackutvecklare i Sverige/);
    switchTo("EN");
    expect(document.documentElement.lang).toBe("en");
    expect(document.title).toBe("Lirije Shabani | Fullstack Developer");
    expect(document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "").toMatch(/^Fullstack developer/);
    expect(screen.getByRole("region", { name: "Projects" })).toBeInTheDocument();
    expect(window.location.search).toBe("?lang=en");
    expect(window.localStorage.getItem("liri-dev.lang")).toBe("en");

    switchTo("SV");
    expect(screen.getByRole("region", { name: "Projekt" })).toBeInTheDocument();
    expect(window.location.search).toBe("");
    expect(window.localStorage.getItem("liri-dev.lang")).toBe("sv");
  });

  it("stays on the same case study and chapter when switching", () => {
    window.history.replaceState(null, "", "/#project/nodia/decisions");
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: "Nodia" })).toBeInTheDocument();
    const chaptersSv = screen.getByRole("navigation", { name: "Kapitel" });
    expect(within(chaptersSv).getByRole("link", { name: "Lösningar" })).toHaveAttribute("href", "#project/nodia/decisions");
    expect(document.title).toBe("Nodia — Lirije Shabani");

    switchTo("EN");
    expect(window.location.hash).toBe("#project/nodia/decisions");
    expect(window.location.search).toBe("?lang=en");
    expect(screen.getByRole("heading", { level: 1, name: "Nodia" })).toBeInTheDocument();
    const chaptersEn = screen.getByRole("navigation", { name: "Chapters" });
    expect(within(chaptersEn).getByRole("link", { name: "Solutions" })).toHaveAttribute("href", "#project/nodia/decisions");
    expect(screen.getByRole("button", { name: /The API is the only path to the data/ })).toBeInTheDocument();
  });

  it("keeps the language while navigating between pages", () => {
    window.history.replaceState(null, "", "/?lang=en");
    render(<App />);
    goTo("#project/minsommar");
    expect(window.location.search).toBe("?lang=en");
    expect(screen.getByRole("navigation", { name: "Chapters" })).toBeInTheDocument();
    goTo("#featured-minsommar");
    expect(screen.getByRole("region", { name: "Projects" })).toBeInTheDocument();
  });

  it("keeps an open secondary project row open when switching", () => {
    window.history.replaceState(null, "", "/#project/inspecto");
    render(<App />);
    expect(screen.getByRole("button", { name: /Inspecto/ })).toHaveAttribute("aria-expanded", "true");
    switchTo("EN");
    expect(screen.getByRole("button", { name: /Inspecto/ })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region", { name: "Inspecto details" })).toBeInTheDocument();
  });
});

describe("no English left in the Swedish interface", () => {
  const englishUi =
    /\b(Selected work|More projects|Explore project|Technical highlights|Experience|Education|Skills|Let's|Overview|Architecture|Technical decisions|Implementation|Screenshots|Progress|Built|Planned|Not built yet|Next project|My role|All work|Sole Developer|Personal)\b/;

  it("on the homepage", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /Inspecto/ }));
    expect(document.getElementById("main")!.textContent).not.toMatch(englishUi);
  });

  it.each(["nodia", "minsommar"])("on the %s case study", (id) => {
    window.history.replaceState(null, "", `/#project/${id}`);
    render(<App />);
    expect(document.getElementById("main")!.textContent).not.toMatch(englishUi);
  });
});

describe("multi-paragraph project texts", () => {
  it("shows Nodia on the homepage as a tile with a Swedish tagline and status", () => {
    render(<App />);
    const nodia = document.getElementById("featured-nodia")!;
    expect(within(nodia).getByText("AI-plattform för företagsdata · under utveckling")).toBeInTheDocument();
    expect(within(nodia).getByRole("link", { name: "Utforska projektet: Nodia" })).toHaveAttribute("href", "#project/nodia");
  });

  it.each(["SV", "EN"] as const)("shows no pull quote on the homepage (%s)", (code) => {
    render(<App />);
    if (code === "EN") switchTo("EN");
    const nodia = document.getElementById("featured-nodia")!;
    expect(nodia.querySelector("blockquote")).toBeNull();
    expect(nodia.textContent).not.toMatch(/404/);
  });

  it("shows the Swedish Nodia overview on the case study as three paragraphs", () => {
    window.history.replaceState(null, "", "/#project/nodia");
    render(<App />);
    expect(screen.getByText(/^Nodia är en AI-plattform jag utvecklar/).tagName).toBe("P");
    expect(screen.getByText(/^Jag har börjat med den tekniska grunden/).tagName).toBe("P");
    expect(screen.getByText(/^Frontenden är byggd i React och TypeScript/).tagName).toBe("P");
  });
});

describe("transparent Nodia presentation", () => {
  it.each([
    ["sv", "Tekniska lösningar", "Lösningar", "Lösning"],
    ["en", "Technical solutions", "Solutions", "Solution"],
  ] as const)("labels Nodia's chapter as solutions (%s)", (lang, heading, menu, rowLabel) => {
    window.history.replaceState(null, "", `/?lang=${lang}#project/nodia`);
    render(<App />);
    expect(screen.getByRole("heading", { level: 2, name: heading })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: lang === "sv" ? "Kapitel" : "Chapters" })).toHaveTextContent(menu);
    expect(screen.getAllByText(rowLabel, { selector: "dt" }).length).toBeGreaterThan(0);
  });

  it.each([
    ["sv", "Tekniska beslut", "Beslut"],
    ["en", "Technical decisions", "Decisions"],
  ] as const)("keeps 'decisions' for other projects (%s)", (lang, heading, menu) => {
    window.history.replaceState(null, "", `/?lang=${lang}#project/minsommar`);
    render(<App />);
    expect(screen.getByRole("heading", { level: 2, name: heading })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: lang === "sv" ? "Kapitel" : "Chapters" })).toHaveTextContent(menu);
  });

  it.each(["sv", "en"] as const)("states the AI-assisted role and the Lovable origin (%s)", (lang) => {
    const nodia = projectsByLang[lang].find((p) => p.id === "nodia")!;
    expect(nodia.role).toMatch(lang === "sv" ? /AI-assisterat/ : /AI-assisted/);
    expect(nodia.myRole).toMatch(/Claude/);
    expect(nodia.overview).toMatch(/Lovable/);
    expect(nodia.overview).toMatch(/Vite/);
    expect(nodia.overview).toMatch(/React Router/);
  });
});
