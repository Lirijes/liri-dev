import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectDiagram } from "@/components/diagrams";
import { projects } from "@/data/projects";

const usedDiagrams = [...new Set(projects.flatMap((p) => [...(p.diagrams ?? []), ...(p.visual.kind === "diagram" ? [p.visual.id] : [])]))];

describe("diagrams", () => {
  it.each(usedDiagrams)("%s renders as a figure with a text description", (id) => {
    const { container } = render(<ProjectDiagram id={id} />);
    expect(screen.getByRole("figure")).toBeInTheDocument();
    expect(container.querySelector(".sr-only")?.textContent?.length).toBeGreaterThan(40);
  });

  it("labels Nodia's AI layer as planned in both versions", () => {
    const { unmount } = render(<ProjectDiagram id="nodia-architecture" compact />);
    expect(screen.getByText("AI layer — planned")).toBeInTheDocument();
    unmount();
    render(<ProjectDiagram id="nodia-architecture" />);
    expect(screen.getByText("AI layer — planned, behind the API")).toBeInTheDocument();
  });

  it("does not describe the Sitemap Generator as a crawler", () => {
    const sitemap = projects.find((p) => p.id === "sitemap-generator")!;
    const { container } = render(<ProjectDiagram id="sitemap-pipeline" />);
    const text = [container.textContent, sitemap.summary, sitemap.overview, ...(sitemap.highlights ?? [])].join(" ");
    expect(text).not.toMatch(/crawl/i);
  });
});
