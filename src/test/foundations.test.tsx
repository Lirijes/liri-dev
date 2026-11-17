import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";
import Contact from "@/components/Contact";
import About from "@/components/About";
import { Connector, Diagram, DiagramNode, Flow, StepFlow } from "@/components/diagrams/kit";
import { renderIn } from "./render";

describe("Header", () => {
  it("has plain, unnumbered section links and a mobile menu (English)", () => {
    renderIn("en", <Header />);
    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(nav).toHaveTextContent("WorkSkillsExperienceContact");
    expect(nav.textContent).not.toMatch(/\(0\d\)/);
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });

  it("is in Swedish by default", () => {
    renderIn("sv", <Header />);
    const nav = screen.getByRole("navigation", { name: "Huvudmeny" });
    expect(nav).toHaveTextContent("ProjektKompetensErfarenhetKontakt");
    expect(screen.getByLabelText("Öppna meny")).toHaveTextContent("Meny");
  });

  it("has an SV · EN switcher showing the current language", () => {
    renderIn("sv", <Header />);
    const group = screen.getByRole("group", { name: "Språk" });
    expect(group).toHaveTextContent("SV·EN");
    expect(screen.getByRole("button", { name: /^SV/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /^EN/ })).toHaveAttribute("aria-pressed", "false");
  });
});

describe("Hero", () => {
  it("shows the portrait uncropped and links to the CV, GitHub and LinkedIn", () => {
    renderIn("en", <About />);
    const portrait = screen.getByAltText("Portrait of Lirije Shabani");
    expect(portrait.className).not.toMatch(/object-cover|aspect-/);
    expect(screen.getByRole("link", { name: "CV ↓" })).toHaveAttribute("download");
    expect(screen.getByRole("link", { name: "GitHub ↗" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "LinkedIn ↗" })).toBeInTheDocument();
  });

  it("reads in Swedish, and says the CV is in English", () => {
    renderIn("sv", <About />);
    expect(screen.getByText(/bakom API:et/)).toBeInTheDocument();
    expect(screen.getByAltText("Porträtt av Lirije Shabani")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "CV (engelska) ↓" })).toHaveAttribute("download");
  });
});

describe("Contact", () => {
  it("does not publish a phone number", () => {
    const { container } = renderIn("en", <Contact />);
    expect(container.querySelector('a[href^="tel:"]')).toBeNull();
    expect(container.textContent).not.toMatch(/\+46|070/);
  });

  it("has a quiet Ko-fi link that opens in a new tab", () => {
    renderIn("en", <Contact />);
    const kofi = screen.getByRole("link", { name: "Buy me a coffee ↗" });
    expect(kofi).toHaveAttribute("href", "https://ko-fi.com/lirijes");
    expect(kofi).toHaveAttribute("target", "_blank");
    expect(kofi).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("closes in Swedish", () => {
    renderIn("sv", <Contact />);
    expect(screen.getByText("dig.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Bjud mig på en kaffe ↗" })).toHaveAttribute(
      "href",
      "https://ko-fi.com/lirijes"
    );
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
