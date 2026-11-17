/**
 * Skills by area. `primary` is what I use most — set large; `secondary` is
 * what I have worked with — set small. Typography carries the hierarchy, so
 * there are no ratings or bars.
 */
export interface SkillArea {
  label: string;
  primary: string[];
  secondary: string[];
}

export const skillAreas: SkillArea[] = [
  {
    label: "Backend",
    primary: ["C#", ".NET", "ASP.NET Core", "Entity Framework Core"],
    secondary: ["REST APIs", "Node.js"],
  },
  {
    label: "Data",
    primary: ["PostgreSQL", "SQL", "GraphQL"],
    secondary: ["Supabase", "Row Level Security", "SQL Server"],
  },
  {
    label: "Frontend",
    primary: ["TypeScript", "React"],
    secondary: ["JavaScript", "Vue", "Nuxt", "Astro", "HTML & CSS"],
  },
  {
    label: "Delivery & testing",
    primary: ["Git", "Docker", "GitHub Actions"],
    secondary: ["xUnit", "Testcontainers", "Azure DevOps", "Vercel"],
  },
  {
    label: "CMS & e-commerce",
    primary: ["DatoCMS", "nopCommerce"],
    secondary: ["Umbraco", "Storyblok", "WooCommerce"],
  },
];

export const aiAssistedTools = ["Claude Code", "GitHub Copilot"];
