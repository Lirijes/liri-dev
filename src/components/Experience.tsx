import type { ReactNode } from "react";
import { Reveal, SectionHead } from "@/components/editorial";
import { projectHash } from "@/lib/hash-route";

interface Role {
  period: string;
  company: string;
  role: string;
  location: string;
  description: ReactNode;
}

const roles: Role[] = [
  {
    period: "2025 — 2026",
    company: "Readymade AB",
    role: "Fullstack Developer",
    location: "Skene",
    description:
      "E-commerce platform development: reusable components, the design system, product data quality, and scripts and automations that cut manual work.",
  },
  {
    period: "2024 — 2025",
    company: "Houshmand Tech",
    role: "Fullstack Developer",
    location: "Gothenburg",
    description:
      "A club shop platform and a matching tool that connects users with associations, in .NET Core, Razor and nopCommerce.",
  },
  {
    period: "2023 — 2024",
    company: "RevolutionRace",
    role: "Fullstack Developer, internship",
    location: "Borås",
    description: (
      <>
        Built the{" "}
        <a href={projectHash("review-management-tool")} className="link">
          review moderation tool
        </a>{" "}
        and improved the CMS, XML sitemap and footer, in an agile team.
      </>
    ),
  },
];

const education = [
  { title: "DevSecOps with a focus on security", meta: "Handelsakademin · 2026 — ongoing" },
  { title: ".NET Web Developer", meta: "EC Utbildning · 2022 — 2024" },
  {
    title: "University courses in information technology, cybersecurity and AI",
    meta: "Uppsala and Linköping · 2023",
    small: true,
  },
];

/**
 * Experience (about 65%) and education (about 35%) side by side on desktop,
 * stacked on phones with experience first.
 */
const Experience = () => (
  <section
    id="experience"
    aria-label="Experience and education"
    className="page section-gap grid scroll-mt-4 gap-y-20 lg:grid-cols-[65fr_35fr] lg:gap-x-[4.5rem]"
  >
    <div>
      <SectionHead label="Experience" />
      <Reveal>
        <ol>
          {roles.map((r) => (
            <li
              key={r.company}
              className="grid gap-x-6 gap-y-1.5 border-b border-rule py-7 sm:grid-cols-[9.5rem_1fr]"
            >
              <p className="text-[0.8125rem] text-muted-foreground sm:pt-2.5">{r.period}</p>
              <div>
                <h3 className="font-display text-[clamp(1.75rem,2.6vw,2rem)] leading-tight">{r.company}</h3>
                <p className="mt-1 text-[0.8125rem] text-muted-foreground">
                  {r.role} · {r.location}
                </p>
                <p className="mt-2.5 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">{r.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </div>

    <div>
      <SectionHead label="Education" />
      <Reveal>
        <ol>
          {education.map((e) => (
            <li key={e.title} className="border-b border-rule py-5">
              <h3
                className={
                  e.small
                    ? "text-[0.9375rem] leading-relaxed text-ink-soft"
                    : "font-display text-2xl leading-tight"
                }
              >
                {e.title}
              </h3>
              <p className="mt-1.5 text-[0.8125rem] text-muted-foreground">{e.meta}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </div>
  </section>
);

export default Experience;
