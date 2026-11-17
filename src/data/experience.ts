import type { Lang } from "@/i18n/lang";

/**
 * Work experience and education per language. Dates, companies and places are
 * the same in both; the descriptions are written for each language.
 */
export interface Role {
  period: string;
  company: string;
  role: string;
  location: string;
  /** Plain text, or text with one link to a project (rendered by Experience). */
  description: string | { before: string; linkText: string; projectId: string; after: string };
}

export interface EducationItem {
  title: string;
  meta: string;
  /** Short courses are set smaller than full programmes. */
  small?: boolean;
}

export const rolesByLang: Record<Lang, Role[]> = {
  en: [
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
      description: {
        before: "Built the ",
        linkText: "review moderation tool",
        projectId: "review-management-tool",
        after: " and improved the CMS, XML sitemap and footer, in an agile team.",
      },
    },
  ],
  sv: [
    {
      period: "2025 — 2026",
      company: "Readymade AB",
      role: "Fullstackutvecklare",
      location: "Skene",
      description:
        "Vidareutveckling av företagets e-handelsplattform: återanvändbara komponenter, designsystemet, kvaliteten i produktdatan och skript och automatiseringar som minskade det manuella arbetet.",
    },
    {
      period: "2024 — 2025",
      company: "Houshmand Tech",
      role: "Fullstackutvecklare",
      location: "Göteborg",
      description:
        "En plattform för föreningsbutiker och ett matchningsverktyg som kopplar ihop användare med föreningar, byggt i .NET Core, Razor och nopCommerce.",
    },
    {
      period: "2023 — 2024",
      company: "RevolutionRace",
      role: "Fullstackutvecklare, praktik",
      location: "Borås",
      description: {
        before: "Byggde ",
        linkText: "verktyget för recensionsmoderering",
        projectId: "review-management-tool",
        after: " och förbättrade CMS:et, XML-sitemapen och sidfoten i ett agilt team.",
      },
    },
  ],
};

export const educationByLang: Record<Lang, EducationItem[]> = {
  en: [
    { title: "DevSecOps with a focus on security", meta: "Handelsakademin · 2026 — ongoing" },
    { title: ".NET Web Developer", meta: "EC Utbildning · 2022 — 2024" },
    {
      title: "University courses in information technology, cybersecurity and AI",
      meta: "Uppsala and Linköping · 2023",
      small: true,
    },
  ],
  sv: [
    { title: "DevSecOps med inriktning på säkerhet", meta: "Handelsakademin · 2026 — pågående" },
    { title: ".NET-webbutvecklare", meta: "EC Utbildning · 2022 — 2024" },
    {
      title: "Universitetskurser i informationsteknik, cybersäkerhet och AI",
      meta: "Uppsala och Linköping · 2023",
      small: true,
    },
  ],
};
