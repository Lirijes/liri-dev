import { describe, it, expect } from "vitest";
import { screen, within } from "@testing-library/react";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import { skillAreasByLang } from "@/data/skills";
import { renderIn } from "./render";

describe("Skills", () => {
  it("shows every area as typography, without cards, bars or chips", () => {
    const { container } = renderIn("en", <Skills />);
    for (const area of skillAreasByLang.en) expect(screen.getByText(area.label)).toBeInTheDocument();
    expect(screen.getByText("C#, .NET, ASP.NET Core, Entity Framework Core")).toBeInTheDocument();
    expect(container.querySelector('[role="progressbar"], .rounded-full, .rounded-lg')).toBeNull();
  });

  it("uses Swedish area labels but keeps tool names as they are", () => {
    renderIn("sv", <Skills />);
    expect(screen.getByRole("region", { name: "Kompetens" })).toBeInTheDocument();
    expect(screen.getByText("Leverans & testning")).toBeInTheDocument();
    expect(screen.getByText("C#, .NET, ASP.NET Core, Entity Framework Core")).toBeInTheDocument();
  });

  it("lists the same tools in both languages", () => {
    const primary = (lang: "sv" | "en") => skillAreasByLang[lang].flatMap((a) => a.primary);
    expect(primary("sv")).toEqual(primary("en"));
  });
});

describe("Experience and education", () => {
  it("lists employers and education side by side, and links the review tool", () => {
    renderIn("en", <Experience />);
    const section = screen.getByRole("region", { name: "Experience and education" });
    expect(section.className).toContain("lg:grid-cols-[65fr_35fr]");
    for (const company of ["Readymade AB", "Houshmand Tech", "RevolutionRace"]) {
      expect(within(section).getByRole("heading", { name: company })).toBeInTheDocument();
    }
    expect(within(section).getByRole("heading", { name: "DevSecOps with a focus on security" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "review moderation tool" })).toHaveAttribute(
      "href",
      "#project/review-management-tool"
    );
  });

  it("reads in Swedish with the same employers and link", () => {
    renderIn("sv", <Experience />);
    const section = screen.getByRole("region", { name: "Erfarenhet och utbildning" });
    expect(within(section).getByText("Fullstackutvecklare · Göteborg")).toBeInTheDocument();
    expect(within(section).getByRole("heading", { name: "DevSecOps med inriktning på säkerhet" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "verktyget för recensionsmoderering" })).toHaveAttribute(
      "href",
      "#project/review-management-tool"
    );
  });
});
