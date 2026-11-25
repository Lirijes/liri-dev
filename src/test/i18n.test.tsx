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
    architectureLabel: p.architectureLabel,
    visualTone: p.visualTone,
    visual: p.visual.kind === "image" ? p.visual.src : p.visual.id,
    images: p.images,
    diagrams: p.diagrams,
    cardTech: p.cardTech,
    plannedTech: p.plannedTech,
    links: p.links.map((l) => [l.type, l.url]),
    tech: p.tech.map((g) => g.items.length),
    paragraphs: p.background.split("\n\n").length,
    currentFocus: Boolean(p.currentFocus),
    techNote: Boolean(p.techNote),
    challengesIntro: Boolean(p.challengesIntro),
    builtItems: p.builtItems?.length,
    learnings: p.learnings?.length,
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
      expect(sv.background).not.toBe(en.background);
      expect(sv.myRole).not.toBe(en.myRole);
      if (sv.decisions.length) expect(sv.decisions[0].title).not.toBe(en.decisions[0].title);
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
    expect(screen.getByRole("heading", { level: 2, name: "Tekniska utmaningar" })).toBeInTheDocument();
    expect(document.title).toBe("Nodia — Lirije Shabani");

    switchTo("EN");
    expect(window.location.hash).toBe("#project/nodia/decisions");
    expect(window.location.search).toBe("?lang=en");
    expect(screen.getByRole("heading", { level: 1, name: "Nodia" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Technical challenges" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "No shortcut past the API" })).toBeInTheDocument();
  });

  it("keeps the language while navigating between pages", () => {
    window.history.replaceState(null, "", "/?lang=en");
    render(<App />);
    goTo("#project/minsommar");
    expect(window.location.search).toBe("?lang=en");
    expect(screen.getByRole("heading", { level: 1, name: "MinSommar" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Technical challenges" })).toBeInTheDocument();
    goTo("#featured-minsommar");
    expect(screen.getByRole("region", { name: "Projects" })).toBeInTheDocument();
  });

  it("stays on a smaller project's page when switching", () => {
    window.history.replaceState(null, "", "/#project/inspecto");
    render(<App />);
    expect(screen.getByRole("heading", { level: 2, name: "Varför jag byggde Inspecto" })).toBeInTheDocument();
    expect(screen.getByText("Pausat")).toBeInTheDocument();
    switchTo("EN");
    expect(window.location.hash).toBe("#project/inspecto");
    expect(screen.getByRole("heading", { level: 2, name: "Why I built Inspecto" })).toBeInTheDocument();
    expect(screen.getByText("Paused")).toBeInTheDocument();
  });
});

describe("no English left in the Swedish interface", () => {
  const englishUi =
    /\b(Selected work|More projects|Explore project|Technical highlights|Experience|Education|Skills|Let's|Overview|Architecture|Technical decisions|Implementation|Screenshots|Progress|Built|Planned|Not built yet|Next project|My role|All work|Sole Developer|Personal|Background|How I work|How I worked|What I built|What I've learned|Where it stands|Paused|Internal tool)\b/;

  it("on the homepage", () => {
    render(<App />);
    expect(document.getElementById("main")!.textContent).not.toMatch(englishUi);
  });

  it.each(["nodia", "minsommar", "inspecto", "review-management-tool", "sitemap-generator"])("on the %s page", (id) => {
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

  it("tells why Nodia exists in her own words, as separate paragraphs", () => {
    window.history.replaceState(null, "", "/#project/nodia");
    render(<App />);
    expect(screen.getByRole("heading", { level: 2, name: "Varför jag började bygga Nodia" })).toBeInTheDocument();
    expect(screen.getByText(/^Idén till Nodia växte fram när jag arbetade på Readymade\./).tagName).toBe("P");
    expect(screen.getByText(/^Jag började undersöka om det fanns system/).tagName).toBe("P");
    expect(screen.getByText(/^Min idé blev att bygga en plattform/).tagName).toBe("P");
    expect(screen.getByText("Det är den långsiktiga visionen för Nodia.").tagName).toBe("P");
  });
});

describe("transparent Nodia presentation", () => {
  it.each([
    ["sv", "Tekniska utmaningar", "Lösning", "Så arbetar jag"],
    ["en", "Technical challenges", "Solution", "How I work"],
  ] as const)("labels Nodia's challenges with 'solution' and shows how I work (%s)", (lang, heading, rowLabel, howIWork) => {
    window.history.replaceState(null, "", `/?lang=${lang}#project/nodia`);
    render(<App />);
    expect(screen.getByRole("heading", { level: 2, name: heading })).toBeInTheDocument();
    expect(screen.getAllByText(rowLabel, { selector: "dt" })).toHaveLength(3);
    const role = screen.getByRole("heading", { level: 3, name: howIWork }).nextElementSibling!;
    expect(role).toHaveTextContent(/Claude/);
  });

  it.each([
    ["sv", "Tekniska utmaningar", "Lösning", "Bakgrund"],
    ["en", "Technical challenges", "Solution", "Background"],
  ] as const)("uses the same headings on every project page (%s)", (lang, heading, rowLabel, background) => {
    window.history.replaceState(null, "", `/?lang=${lang}#project/minsommar`);
    render(<App />);
    expect(screen.getByRole("heading", { level: 2, name: heading })).toBeInTheDocument();
    expect(screen.getAllByText(rowLabel, { selector: "dt" })).toHaveLength(3);
    goTo("#project/review-management-tool");
    expect(screen.getByRole("heading", { level: 2, name: background })).toBeInTheDocument();
  });

  it.each(["sv", "en"] as const)("states the AI-assisted role and the Lovable origin (%s)", (lang) => {
    const nodia = projectsByLang[lang].find((p) => p.id === "nodia")!;
    expect(nodia.role).toMatch(lang === "sv" ? /AI-assisterat/ : /AI-assisted/);
    expect(nodia.myRole).toMatch(/Claude/);
    // The Lovable origin is shown on the page, under the tech list.
    expect(nodia.techNote).toMatch(/Lovable/);
    expect(nodia.techNote).toMatch(/Vite/);
    expect(nodia.techNote).toMatch(/React Router/);
  });
});
