import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import { skillAreas } from "@/data/skills";

describe("Skills", () => {
  it("shows every area as typography, without cards, bars or chips", () => {
    const { container } = render(<Skills />);
    for (const area of skillAreas) expect(screen.getByText(area.label)).toBeInTheDocument();
    expect(screen.getByText("C#, .NET, ASP.NET Core, Entity Framework Core")).toBeInTheDocument();
    expect(container.querySelector('[role="progressbar"], .rounded-full, .rounded-lg')).toBeNull();
  });
});

describe("Experience and education", () => {
  it("lists employers and education side by side, and links the review tool", () => {
    render(<Experience />);
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
});
