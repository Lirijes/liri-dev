import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";
import Contact from "@/components/Contact";
import { Connector, Diagram, DiagramNode, Flow, StepFlow } from "@/components/diagrams/kit";

describe("Header", () => {
  it("has plain, unnumbered section links and a mobile menu", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(nav).toHaveTextContent("WorkSkillsExperienceContact");
    expect(nav.textContent).not.toMatch(/\(0\d\)/);
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });
});

describe("Hero", () => {
  it("shows the portrait uncropped and links to the CV, GitHub and LinkedIn", async () => {
    const { default: About } = await import("@/components/About");
    render(<About />);
    const portrait = screen.getByAltText("Portrait of Lirije Shabani");
    expect(portrait.className).not.toMatch(/object-cover|aspect-/);
    expect(screen.getByRole("link", { name: "CV ↓" })).toHaveAttribute("download");
    expect(screen.getByRole("link", { name: "GitHub ↗" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LinkedIn ↗" })).toBeInTheDocument();
  });
});

describe("Contact", () => {
  it("does not publish a phone number", () => {
    const { container } = render(<Contact />);
    expect(container.querySelector('a[href^="tel:"]')).toBeNull();
    expect(container.textContent).not.toMatch(/\+46|070/);
  });

  it("has a quiet Ko-fi link that opens in a new tab", () => {
    render(<Contact />);
    const kofi = screen.getByRole("link", { name: "Buy me a coffee ↗" });
    expect(kofi).toHaveAttribute("href", "https://ko-fi.com/lirijes");
    expect(kofi).toHaveAttribute("target", "_blank");
    expect(kofi).toHaveAttribute("rel", "noopener noreferrer");
  });
});

describe("Diagram kit", () => {
  it("renders nodes and connector labels as real text with a described figure", () => {
    render(
      <Diagram title="Example" description="A calls B.">
        <Flow>
          <DiagramNode kind="client" title="Frontend" items={["React"]} />
          <Connector label="HTTP" />
          <DiagramNode kind="server" title="API" />
        </Flow>
      </Diagram>
    );
    expect(screen.getByRole("figure")).toBeInTheDocument();
    expect(screen.getByText("A calls B.")).toHaveClass("sr-only");
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    // The label is rendered for both the horizontal and the vertical layout.
    expect(screen.getAllByText("HTTP")).toHaveLength(2);
  });

  it("numbers steps and shows the outcomes that stop the flow", () => {
    render(
      <StepFlow
        steps={[
          { title: "Validate token", stops: [{ code: "401", label: "invalid token" }] },
          { title: "Done", kind: "success" },
        ]}
      />
    );
    expect(screen.getAllByRole("listitem")[0]).toHaveTextContent("Validate token");
    expect(screen.getByText("401")).toBeInTheDocument();
  });
});
