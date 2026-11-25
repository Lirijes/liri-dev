import { describe, it, expect } from "vitest";
import { screen, within } from "@testing-library/react";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { renderIn } from "./render";

describe("Experience", () => {
  it("lists one line per employer and the two programmes with their schools", () => {
    renderIn("en", <Experience />);
    const section = screen.getByRole("region", { name: "Experience" });
    for (const company of ["Readymade AB", "Houshmand Tech", "RevolutionRace"]) {
      expect(within(section).getByRole("heading", { name: company })).toBeInTheDocument();
    }
    expect(within(section).getByText("2023–2024")).toBeInTheDocument();
    expect(within(section).getByText("DevSecOps with a focus on security")).toBeInTheDocument();
    expect(within(section).getByText("Handelsakademin")).toBeInTheDocument();
    expect(within(section).getByText(".NET Web Developer")).toBeInTheDocument();
    expect(within(section).getByText("EC Utbildning")).toBeInTheDocument();
    expect(section.textContent).not.toMatch(/Studying DevSecOps|University courses/);
  });

  it("reads in Swedish with the same employers and education", () => {
    renderIn("sv", <Experience />);
    const section = screen.getByRole("region", { name: "Erfarenhet" });
    expect(within(section).getByRole("heading", { name: "RevolutionRace" })).toBeInTheDocument();
    expect(within(section).getByText("Fullstackutvecklare, praktik")).toBeInTheDocument();
    expect(within(section).getByRole("heading", { name: "Utbildning" })).toBeInTheDocument();
    expect(within(section).getByText("DevSecOps med inriktning på säkerhet")).toBeInTheDocument();
    expect(within(section).getByText(".NET-webbutvecklare")).toBeInTheDocument();
    expect(section.textContent).not.toMatch(/Studerar DevSecOps/);
  });
});

describe("Contact and footer", () => {
  it("shows the email address and no phone number", () => {
    const { container } = renderIn("sv", <Contact />);
    expect(screen.getByText(/Hör av dig/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Lirije11@hotmail.com" })).toHaveAttribute(
      "href",
      "mailto:Lirije11@hotmail.com"
    );
    expect(container.querySelector('a[href^="tel:"]')).toBeNull();
  });

  it("keeps the Ko-fi link in the footer", () => {
    renderIn("en", <Footer />);
    expect(screen.getByRole("link", { name: "Buy me a coffee ↗" })).toHaveAttribute(
      "href",
      "https://ko-fi.com/lirijes"
    );
  });
});
