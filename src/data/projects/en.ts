import { Project } from "@/types/project";

// English project content (the original text).
// Every technical claim here is verified against the project's source code,
// or (for the RevolutionRace tool, whose code is not available) limited to
// what is stated in the CV.
export const projectsEn: Project[] = [
  {
    id: "nodia",
    title: "Nodia",
    tagline: "AI platform for company data",
    year: "2026",
    role: "Project owner & developer (AI-assisted)",
    type: "Fullstack",
    status: "In development",
    featured: true,
    decisionsTerm: "solutions",
    summary:
      "An AI platform for searching and working with company data, in development. The foundation is in place: a .NET API with Supabase authentication, multi-tenant workspaces and tested data isolation.",
    overview:
      "Nodia is an AI platform I'm developing for companies that want to search, ask questions about and eventually carry out tasks with their own data. The work so far has focused on the technical foundation: a .NET API that handles authentication, permissions and access to company data. The platform is built for multiple companies, and each user should only be able to reach information belonging to companies they are a member of — document retrieval must never return another company's content. The backend is an ASP.NET Core Web API on .NET 10 with Entity Framework Core against PostgreSQL in Supabase. The React and TypeScript frontend signs in through Supabase Auth and calls the API with the user's access token. The frontend started as a Lovable prototype and was then moved to Vite and React Router.",
    myRole: "I own the project: I defined what Nodia should do and its security requirements, decided scope and priorities, and tested each feature as it was built. Much of the architecture analysis and code was produced with Claude, an AI coding assistant, which I directed and whose suggestions I discussed and chose between. I'm currently working through the code to deepen my understanding and become comfortable explaining the technical decisions and implementation.",
    keyPoints: [
      "ASP.NET Core API on .NET 10 that verifies Supabase JWTs and requires login by default",
      "Multi-tenant companies and memberships, with a membership check on every company route",
      "Around 30 integration tests against a real PostgreSQL container, run in CI",
    ],
    story:
      "An AI platform for companies that want to search and work with their own data. The foundation is built in .NET with sign-in, company-based permissions and secure data handling. The AI features are the next step.",
    visualTone: "paper",
    implementation: [
      {
        title: "Login by default",
        text: "A fallback authorization policy protects every endpoint; only the health check is marked public.",
      },
      {
        title: "A membership filter",
        text: "A [CompanyMember] attribute creates a filter per request, using that request's database context. Non-members get 404, a role that's too low gets 403.",
      },
      {
        title: "Migrations as the security record",
        text: "EF Core migrations, with raw SQL for foreign keys to Supabase's auth schema and for Row Level Security and revoked privileges.",
      },
      {
        title: "Tests and CI",
        text: "About 30 xUnit integration tests run against PostgreSQL 17 through Testcontainers. GitHub Actions builds and tests both repositories.",
      },
      {
        title: "One-command development",
        text: "Docker Compose runs the API with hot reload next to the Vite frontend, which proxies /api — so no CORS setup, and secrets are mounted read-only.",
      },
    ],
    visual: { kind: "diagram", id: "nodia-architecture" },
    diagrams: ["nodia-architecture", "nodia-request-flow"],
    architecture:
      "Two repositories: a React/Vite frontend and an ASP.NET Core Web API. The browser signs in with Supabase Auth and calls the API through a Vite proxy with the access token. The API validates the token, checks company membership and is the only component that talks to PostgreSQL. Both run together in Docker Compose during development.",
    cardTech: ["C#", "ASP.NET Core", "EF Core", "PostgreSQL", "React"],
    tech: [
      { label: "Backend", items: ["C#", "ASP.NET Core Web API (.NET 10)", "Entity Framework Core", "Swagger/OpenAPI"] },
      { label: "Frontend", items: ["React", "TypeScript", "Vite", "React Router", "Tailwind CSS"] },
      { label: "Data & auth", items: ["PostgreSQL (Supabase)", "Supabase Auth", "JWT"] },
      { label: "Testing & infrastructure", items: ["xUnit", "Testcontainers", "Vitest", "Docker Compose", "GitHub Actions"] },
    ],
    plannedTech: ["Semantic Kernel", "Ollama"],
    decisions: [
      {
        title: "The API is the only path to the data",
        problem:
          "Supabase exposes every table through its own Data API by default, which would let a client go around the API's authorization.",
        decision:
          "The migrations enable Row Level Security without any policies and revoke table privileges — including default privileges for future tables — from Supabase's client roles.",
        why: "Authorization lives in one place, and tests check that the client roles have no access to any table.",
      },
      {
        title: "Identity only from the verified token",
        problem: "A user id sent by the client can be manipulated.",
        decision:
          "The user id always comes from the subject claim of the verified JWT. Ids in the URL, body or headers are never used as identity.",
        why: "Tests send another user's id in exactly those places and check that the result doesn't change.",
      },
      {
        title: "Not revealing which companies exist",
        problem: "Answering 403 for another company's data confirms that the company exists.",
        decision:
          "Non-members get 404 — the same response as for a company that doesn't exist. Members whose role is too low get 403.",
      },
      {
        title: "Security rules enforced by tests",
        problem: "A new endpoint could be added without the membership check.",
        decision:
          "Login is required by default, and architecture tests fail the build if a route with {companyId} lacks the membership filter, or if anything other than the health check allows anonymous access.",
      },
      {
        title: "A real database in tests",
        problem:
          "An in-memory database can't exercise constraints, foreign keys to Supabase's auth schema or Row Level Security.",
        decision: "Integration tests run against PostgreSQL 17 in Docker via Testcontainers, with the real migrations applied.",
      },
    ],
    progress: {
      built: [
        "API foundation: ASP.NET Core on .NET 10, EF Core migrations against Supabase PostgreSQL, Swagger",
        "Authentication: Supabase JWT validation and login required by default; sign up, sign in and protected routes in the React frontend",
        "Multi-tenancy: companies and memberships (owner/member), a membership check on every company route, and database access locked to the API",
        "Workspaces: onboarding for the first workspace, a workspace switcher, and the active workspace remembered per user",
        "Quality: around 30 integration tests against real PostgreSQL, GitHub Actions CI for both repositories and a Docker Compose development environment",
      ],
      planned: [
        "Document upload, management and search",
        "Retrieval-Augmented Generation (RAG) for questions answered from company documents",
        "AI integration with Semantic Kernel, using local models through Ollama",
        "AI agents with tool calling and multi-step workflows",
        "Human-in-the-loop review and approval of AI-proposed actions",
        "Execution logs for AI activity",
      ],
    },
    links: [
      { label: "Frontend", url: "https://github.com/Lirijes/nodia", type: "github" },
      { label: "Backend", url: "https://github.com/Lirijes/NodiaApi", type: "github" },
    ],
  },
  {
    id: "minsommar",
    title: "MinSommar",
    tagline: "Summer planner for families",
    year: "2026",
    role: "Sole Developer",
    type: "Fullstack",
    status: "Live",
    featured: true,
    summary:
      "A web app where families plan summer activities together — with several parents per family, a login-free view for children and an optional points and rewards system.",
    overview:
      "MinSommar is a fullstack application I took from idea to live product. Parents collect activities, bucket lists and favourites for their children, and can turn on an optional points and rewards system. Several parents can manage the same family, and children use the app through a family link without needing an account. I built it end-to-end: UX, frontend, data model, authentication, authorization, server logic and deployment.",
    myRole: "Sole developer, from idea to deployed product.",
    keyPoints: [
      "Family-scoped data model where every table is protected by Row Level Security",
      "Two access paths: parents with Supabase accounts, children through a signed family-link session",
      "Reward approvals checked in the database and safe against concurrent requests",
    ],
    story:
      "A summer planner for families, taken from idea to live product. Behind the playful interface is an authorization problem: several parents share one family, children get in through a link instead of an account, and the database — not the UI — decides who sees what.",
    visualTone: "mint",
    implementation: [
      {
        title: "Server-only code stays on the server",
        text: "Server functions are thin wrappers that validate input with zod and import the server-only module dynamically, so the service-role client and cookie logic never reach the browser bundle.",
      },
      {
        title: "One family per request",
        text: "A parent's family comes from the verified token and their membership — a requested family is only honoured after checking it. A child's comes from the signed cookie.",
      },
      {
        title: "Points are derived, not stored",
        text: "Earned points are summed from completed activities; available points subtract approved rewards, and pending requests are reserved so a child can't over-ask.",
      },
      {
        title: "Strict RLS as its own migration",
        text: "The prototype started with open policies. A dedicated migration replaced them with membership-scoped policies on every family table and revoked anonymous access.",
      },
      {
        title: "Invites that can't be reused",
        text: "Only a SHA-256 hash of each invite token is stored. Invites expire after seven days, must match the signed-in email, and only one can be pending per address in a family.",
      },
    ],
    visual: { kind: "image", src: "/minsommar.png", alt: "MinSommar child view showing daily goals and points" },
    images: ["/minsommar.png", "/minsommar-2.png", "/minsommar-3.png", "/minsommar-4.png", "/minsommar-5.png"],
    diagrams: ["minsommar-access", "minsommar-rewards"],
    architecture:
      "A TanStack Start application on Vercel, with Supabase for authentication and PostgreSQL. Parents use the Supabase client, where RLS policies scope every query to their family, plus SECURITY DEFINER functions for operations that need extra checks. Children have no account: a family link sets a signed cookie, and their requests go through server functions that enforce the family scope themselves.",
    cardTech: ["TypeScript", "React", "TanStack Start", "Supabase", "PostgreSQL"],
    tech: [
      { label: "Frontend", items: ["TypeScript", "React", "TanStack Start", "TanStack Router"] },
      { label: "Server", items: ["TanStack Start server functions", "PostgreSQL functions (SECURITY DEFINER)"] },
      { label: "Data & auth", items: ["PostgreSQL (Supabase)", "Supabase Auth", "Row Level Security"] },
      { label: "Hosting", items: ["Vercel"] },
    ],
    decisions: [
      {
        title: "Authorization in the database",
        problem: "All data belongs to a family, and several parents share it.",
        decision:
          "Every family table has an RLS policy built on is_family_member(family_id) — a SECURITY DEFINER helper that checks membership without triggering RLS recursion. Tables such as completions are scoped through the child's family.",
        why: "The access rules hold no matter which query the client sends, and anonymous access to family tables is revoked entirely.",
      },
      {
        title: "Children without accounts",
        problem: "Children should be able to use the app without an email and password.",
        decision:
          "A parent shares a family link with a revocable token. The server validates it and sets a signed, httpOnly cookie (HMAC) containing only the family id. Children's requests go through server functions that use the service role and check the family scope explicitly.",
        why: "The service role bypasses RLS, so each server function enforces the scope itself and never trusts ids from the caller.",
      },
      {
        title: "Reward approvals under concurrency",
        problem:
          "With several parents, two could approve rewards for the same child at the same time and spend more points than the child has.",
        decision:
          "Approval runs in a SECURITY DEFINER function that locks the request row, takes a per-child advisory lock and recalculates the balance before approving.",
        why: "Points are never stored as a balance — they're derived from completed activities minus approved rewards — so there is no counter that can drift.",
      },
      {
        title: "Joining a family only by invitation",
        problem: "Becoming a member of an existing family must not be possible through a client-side insert.",
        decision:
          "Parents join through an email invite accepted in a SECURITY DEFINER function, which checks that the invite is pending, unexpired and sent to the signed-in user's email. Only a SHA-256 hash of the invite token is stored, and only the owner can remove members.",
        why: "A database leak doesn't expose usable invitations, and no parent can remove the owner.",
      },
    ],
    links: [
      { label: "Visit site", url: "https://minsommar.se/", type: "demo" },
      { label: "GitHub", url: "https://github.com/Lirijes/minsommar", type: "github" },
    ],
  },
  {
    id: "inspecto",
    title: "Inspecto",
    tagline: "Case management + .NET API",
    year: "2026",
    role: "Sole Developer",
    type: "Fullstack",
    status: "Demo",
    summary:
      "Dashboard for managing facilities, cases and inspections, built on Supabase — plus a separate ASP.NET Core Web API for the same database.",
    overview:
      "A dashboard application for managing facilities, cases and inspections, with authentication and CRUD functionality. The frontend works directly against Supabase. Alongside it I built a separate C#/.NET Web API on the same PostgreSQL schema, as a step towards moving business logic and validation into a backend I control. Switching the frontend over to the API is the next step.",
    myRole: "Sole developer of both the dashboard and the API.",
    highlights: [
      "Mapped an existing Supabase schema to EF Core with a baseline migration",
      "Controllers, separate create/update DTOs and a service layer",
      "JWT authentication and Swagger/OpenAPI documentation",
    ],
    visual: { kind: "image", src: "/inspectoboard.png", alt: "Inspecto dashboard with case and inspection overview" },
    images: ["/inspectoboard.png"],
    diagrams: ["inspecto-architecture"],
    architecture:
      "The React frontend uses Supabase for authentication and data. The ASP.NET Core Web API uses Entity Framework Core against the same PostgreSQL database, with controllers, request DTOs and a service layer, secured with JWT and documented with Swagger/OpenAPI.",
    cardTech: ["React", "C#", "ASP.NET Core", "EF Core"],
    tech: [
      { label: "Frontend", items: ["TypeScript", "React", "Vite"] },
      { label: "Backend", items: ["C#", "ASP.NET Core Web API", "Entity Framework Core", "Swagger/OpenAPI"] },
      { label: "Data & auth", items: ["PostgreSQL (Supabase)", "Supabase Auth", "JWT"] },
      { label: "Hosting", items: ["Vercel"] },
    ],
    decisions: [
      {
        title: "EF Core on an existing database",
        problem: "The database schema already existed in Supabase.",
        decision:
          "Modelled the existing tables in EF Core and created a baseline migration, instead of letting EF generate a new schema.",
      },
      {
        title: "Where the logic belongs",
        problem:
          "Talking to Supabase directly from the frontend was fast to build, but spreads validation and business rules across the client.",
        decision:
          "Built a separate Web API — controllers, separate create/update DTOs and a service layer — as the place for those rules. Moving the frontend over to it is the next step.",
      },
    ],
    links: [
      { label: "Visit site", url: "https://inspecto-silk.vercel.app/", type: "demo" },
      { label: "Frontend", url: "https://github.com/Lirijes/inspecto", type: "github" },
      { label: "Backend", url: "https://github.com/Lirijes/inspecto-api", type: "github" },
    ],
  },
  {
    id: "review-management-tool",
    title: "Review Management Tool",
    tagline: "Internal tool · RevolutionRace",
    context: "RevolutionRace",
    year: "2024",
    role: "Fullstack Developer (Internship)",
    type: "Web",
    status: "Internal",
    summary:
      "Internal tool that lets editors moderate customer reviews — search, filter, publish and unpublish — on top of the company's GraphQL API.",
    overview:
      "Developed during my internship at RevolutionRace as an internal admin application for editors and content managers. It gives them one place to find customer reviews and control which ones are visible, by searching, filtering, publishing and unpublishing reviews. Built in Nuxt against the company's existing GraphQL API.",
    myRole: "Built the application during my internship, as part of the team's sprint work.",
    highlights: [
      "Moderation workflow for publishing and unpublishing reviews",
      "Search and filtering through the company's GraphQL API",
      "Built in the team's sprints, alongside CMS and sitemap work",
    ],
    visual: { kind: "image", src: "/adminreviews.png", alt: "Review management tool listing customer reviews" },
    images: ["/adminreviews.png"],
    cardTech: ["Nuxt", "Vue", "TypeScript", "GraphQL"],
    tech: [
      { label: "Frontend", items: ["Nuxt", "Vue", "TypeScript"] },
      { label: "API", items: ["GraphQL"] },
      { label: "Tools", items: ["Azure DevOps", "Git"] },
    ],
    decisions: [
      {
        title: "One place for moderation",
        problem: "Editors and content managers needed to control which customer reviews are visible.",
        decision: "Built an internal admin application where they can find reviews and publish or unpublish them.",
      },
      {
        title: "Search and filtering on review data",
        problem: "Finding specific reviews in a large set of review data.",
        decision:
          "Implemented search and filtering on top of the company's existing GraphQL API, working within the existing API and system structure.",
      },
    ],
    links: [],
  },
  {
    id: "sitemap-generator",
    title: "Sitemap Generator",
    tagline: "Web page → XML · C#",
    year: "2024",
    role: "Sole Developer",
    type: "Backend",
    status: "Live",
    summary:
      "ASP.NET Core MVC tool that reads a web page and turns it into an XML sitemap or an XML extract of its HTML content, packaged with Docker.",
    overview:
      "Given a URL, the tool fetches the page and generates one of two outputs: a sitemap following the sitemaps.org schema, built from the links on the page, or an XML document describing every element in the page body with its text and attributes. The result can be viewed in the browser or downloaded as a file.",
    myRole: "Sole developer.",
    highlights: [
      "One fetch-and-parse pipeline with two XML outputs",
      "Relative links resolved to absolute URLs, with priority set by path depth",
      "Multi-stage Docker build on .NET 8",
    ],
    visual: { kind: "image", src: "/sitemapp.png", alt: "Sitemap Generator form for entering a URL" },
    images: ["/sitemapp.png"],
    diagrams: ["sitemap-pipeline"],
    architecture:
      "A single ASP.NET Core MVC controller handles the form. Both output modes share the same fetch and parse steps and differ only in how the XML is built.",
    cardTech: ["C#", "ASP.NET Core MVC", "HtmlAgilityPack", "Docker"],
    tech: [
      { label: "Backend", items: ["C#", "ASP.NET Core MVC (.NET 8)", "HtmlAgilityPack", "LINQ to XML"] },
      { label: "Infrastructure", items: ["Docker (multi-stage build)", "Render"] },
    ],
    decisions: [
      {
        title: "One pipeline, two outputs",
        problem: "The same page should be usable both for a sitemap and for a structured content extract.",
        decision:
          "Both modes share fetching (HttpClient) and parsing (HtmlAgilityPack); only the XML-building step differs, selected by an option in the form.",
      },
      {
        title: "Valid sitemap output",
        problem: "Links on a page are often relative, and the output has to follow the sitemap schema.",
        decision:
          "Links are resolved against the page URL into absolute URLs and written with LINQ to XML in the sitemaps.org namespace, with lastmod and a priority that drops by 0.1 per path level, never below 0.5.",
      },
      {
        title: "Containerised deployment",
        problem: "The app should run the same way regardless of the host's .NET setup.",
        decision: "A multi-stage Dockerfile builds with the .NET 8 SDK image and runs on the smaller ASP.NET runtime image.",
      },
    ],
    links: [
      { label: "Live demo", url: "https://sitemapgenerator-cz9s.onrender.com/", type: "demo" },
      { label: "GitHub", url: "https://github.com/Lirijes/SitemapGenerator", type: "github" },
    ],
  },
];
