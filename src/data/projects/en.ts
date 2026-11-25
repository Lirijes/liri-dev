import { Project } from "@/types/project";

// English project content. The same facts as sv.ts — only the language differs.
// Every technical claim here is verified against the project's source code,
// or (for the RevolutionRace tool, whose code is not available) limited to
// what is stated in the CV and by me.
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
    summary:
      "An AI platform for companies that want to search and work with their own data. The foundation is built in .NET with sign-in, company-based permissions and secure data handling. The AI features are the next step.",
    background:
      "The idea for Nodia grew out of my time at Readymade. Quotes were put together by hand there, because every customer request could look very different depending on which products and services the customer needed.\n\nI started looking into whether there were systems that could automate the process based on the customer's needs and the company's existing data. I found tools that could generate quote text with AI, but I was missing a more complete way of handling quotes, where the content could be tailored while keeping the company's visual identity and structure.\n\nMy idea became a platform where companies can gather their information, connect their own data sources and use AI to match customer requests with the right products and services. The AI would then draft a quote in the company's own template, with the right logo, fonts and layout. Before the quote is sent, an employee should be able to review and approve it.\n\nThat is the long-term vision for Nodia.",
    currentFocus:
      "Before any AI comes in, the foundation has to be secure. So I started with the API, sign-in and keeping each company's data separate. The AI part comes next.",
    myRole:
      "I have driven the idea, the requirements, the priorities and the testing. Claude has been used for analysis and code generation, and I have gradually worked on understanding and reviewing the implementation.",
    visualTone: "paper",
    visual: { kind: "diagram", id: "nodia-architecture" },
    diagrams: ["nodia-architecture"],
    architecture:
      "The browser signs in through Supabase and sends its token to the API. The API checks who you are and which company you belong to, and it is the only thing allowed to talk to the database.",
    cardTech: ["C#", "ASP.NET Core", "EF Core", "PostgreSQL", "React"],
    tech: [
      { label: "Backend", items: ["C#", "ASP.NET Core Web API (.NET 10)", "Entity Framework Core", "Swagger/OpenAPI"] },
      { label: "Frontend", items: ["React", "TypeScript", "Vite", "React Router", "Tailwind CSS"] },
      { label: "Data & auth", items: ["PostgreSQL (Supabase)", "Supabase Auth", "JWT"] },
      { label: "Testing & infrastructure", items: ["xUnit", "Testcontainers", "Vitest", "Docker Compose", "GitHub Actions"] },
    ],
    plannedTech: ["Semantic Kernel", "Ollama"],
    techNote: "The frontend started as a Lovable prototype and was then moved to Vite and React Router.",
    challengesIntro: "Most of the work so far comes down to one thing: making sure nobody can see another company's data.",
    decisions: [
      {
        title: "No shortcut past the API",
        problem:
          "By default, Supabase makes every table reachable directly from the client, which would let someone skip the API's permission checks.",
        decision:
          "Row Level Security is on with no policies, and the client roles' privileges are revoked, including for tables added later.",
        why: "Permissions are decided in one place, and tests check that the client roles can't reach any table.",
      },
      {
        title: "The right person, the right company",
        problem:
          "A user may only see data from companies they belong to, and an id sent by the client can be tampered with.",
        decision:
          "Identity always comes from the verified token, and a filter on every company route checks membership. Non-members get 404, the same answer as for a company that doesn't exist.",
        why: "A 403 would reveal that the company exists.",
      },
      {
        title: "Rules you can't forget",
        problem: "A new endpoint could be added without the membership check.",
        decision:
          "Sign-in is required by default, and architecture tests fail the build if a company route is missing the filter. About 30 integration tests run against a real PostgreSQL in Docker, in CI.",
        why: "An in-memory database can't test Row Level Security or the link to Supabase's sign-in.",
      },
    ],
    progress: {
      built: [
        ".NET 10 API with sign-in required by default",
        "Companies, memberships and roles",
        "Workspaces: onboarding, a switcher and an active workspace per user",
        "The database locked so only the API can reach it",
        "About 30 integration tests and CI for both repos",
        "Development environment in Docker Compose",
      ],
      planned: [
        "Uploading and searching documents",
        "Answers based on the company's own documents (RAG)",
        "AI through Semantic Kernel and local models in Ollama",
        "Agents whose actions a person reviews and approves, with run logs",
        "Quote drafts in the company's own template, reviewed and approved by an employee before they're sent",
      ],
    },
    learnings: [
      "Setting up a structured development workflow from scratch in GitHub Actions: tests that run automatically, pull requests that are opened automatically, and a gate that requires a human approval before changes to sensitive parts, such as permissions and the database, can be merged. I had worked with workflows like these before, but never configured them myself.",
      "How an application is split between frontend, API, authentication and database, and how the parts fit together in practice.",
    ],
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
    role: "Project owner & developer (AI-assisted)",
    type: "Fullstack",
    status: "Live",
    featured: true,
    summary:
      "A web app where families plan summer activities together — with several parents per family, a login-free view for children and an optional points and rewards system.",
    background:
      "MinSommar is a personal project for families with children. The aim is to encourage children to do more activities and spend less time on screens, through activities, goals and points.\n\nParents collect activities, bucket lists and favourites for their children and can turn on points and rewards. Several parents can manage the same family, and children use the app through a family link without needing an account. The app is live at minsommar.se.",
    myRole:
      "I used AI as support during development. I described what I wanted to build, specified the functionality and directed Claude Code in the work. AI helped with various features and the implementation, but I drove the project and was responsible for setting up the development workflow and the technical solutions.",
    visualTone: "mint",
    visual: { kind: "image", src: "/minsommar.png", alt: "MinSommar child view showing daily goals and points" },
    images: ["/minsommar.png", "/minsommar-2.png", "/minsommar-3.png", "/minsommar-4.png", "/minsommar-5.png"],
    diagrams: ["minsommar-access"],
    architecture:
      "Parents sign in with Supabase, and the database's access rules make sure they only reach their own family. Children have no account: the family link sets a signed cookie, and their requests go through server functions that check which family they belong to themselves.",
    cardTech: ["TypeScript", "React", "TanStack Start", "Supabase", "PostgreSQL"],
    tech: [
      { label: "Frontend", items: ["TypeScript", "React", "TanStack Start", "TanStack Router"] },
      { label: "Server", items: ["TanStack Start server functions", "PostgreSQL functions (SECURITY DEFINER)"] },
      { label: "Data & auth", items: ["PostgreSQL (Supabase)", "Supabase Auth", "Row Level Security"] },
      { label: "Hosting", items: ["Vercel"] },
    ],
    challengesIntro:
      "Behind the playful interface is an authorization problem: the database, not the interface, decides who sees what.",
    decisions: [
      {
        title: "Children without accounts",
        problem: "Children should be able to use the app without an email and password.",
        decision:
          "A parent shares a family link that can be revoked. The server sets a signed cookie containing only the family id, and children's requests go through server functions that check the family themselves.",
        why: "The server functions bypass the database's access rules, so they must never trust ids sent with the request.",
      },
      {
        title: "One family, several parents",
        problem:
          "All data belongs to a family shared by several parents, and nobody should become a member without being invited.",
        decision:
          "Every family table is protected by Row Level Security that checks membership. Parents join through an email invite that expires after seven days and only works for the signed-in user's address.",
        why: "The rules hold no matter which query the client sends, and because only a hash of the invite link is stored, a data leak doesn't expose usable invitations.",
      },
      {
        title: "Two parents, one reward",
        problem:
          "Two parents could approve rewards for the same child at the same time and spend more points than the child has.",
        decision:
          "Approval runs in a database function that locks the request and the child and recalculates the balance before approving.",
        why: "Points are never stored as a balance — they're derived from completed activities minus approved rewards — so there is no counter that can drift.",
      },
    ],
    learnings: [
      "How email ties into sign-in: account confirmations when signing up, and invitations that have to go out and work before anyone can start using the app.",
      "How to build a family structure where several accounts belong to the same family, so that two parents can sign in with their own accounts and still see and manage the same content.",
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
    role: "Project owner & developer (AI-assisted)",
    type: "Fullstack",
    status: "Paused",
    summary:
      "Dashboard for managing facilities, cases and inspections, built on Supabase — plus a separate ASP.NET Core Web API for the same database.",
    background:
      "Inspecto started as a need I saw while working at Readymade. The company handled inspections but had no proper system for them. So I started building my own system that could also handle other kinds of cases, such as troubleshooting and problems related to buildings.\n\nI didn't have time to finish it during working hours, so I continued developing it in my own time.",
    myRole:
      "As with MinSommar, I mainly used Claude Code as support. I described what I wanted to build and directed the work on functionality and implementation.",
    visual: { kind: "image", src: "/inspectoboard.png", alt: "Inspecto dashboard with case and inspection overview" },
    images: ["/inspectoboard.png"],
    diagrams: ["inspecto-architecture"],
    architecture:
      "Today the frontend works directly against Supabase for sign-in and data. Alongside it is a separate C#/.NET Web API on the same PostgreSQL database, with controllers, DTOs and a service layer, secured with JWT and documented with Swagger.",
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
          "I modelled the existing tables in EF Core and created a baseline migration, instead of letting EF generate a new schema.",
      },
      {
        title: "Where the logic belongs",
        problem:
          "Talking to Supabase directly from the frontend was fast to build, but spreads validation and business rules across the client.",
        decision:
          "A separate Web API — controllers, separate create/update DTOs and a service layer — became the place for those rules.",
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
    background:
      "I built the tool during my internship at RevolutionRace. The company needed a simpler way to handle reviews. Among other things, they needed to unpublish reviews when customers asked them to, and to publish reviews with images manually, since those weren't published automatically.",
    myRole:
      "I developed the design together with a UX designer. The functionality was shaped by the company's needs and by studying how existing features worked in their web app. The work was done in the team's sprints, alongside work on the CMS and sitemap. I used ChatGPT for the occasional question, but not to write the code.",
    visual: { kind: "image", src: "/adminreviews.png", alt: "Review management tool listing customer reviews" },
    images: ["/adminreviews.png"],
    cardTech: ["Nuxt", "Vue", "TypeScript", "GraphQL"],
    tech: [
      { label: "Frontend", items: ["Nuxt", "Vue", "TypeScript"] },
      { label: "API", items: ["GraphQL"] },
      { label: "Tools", items: ["Azure DevOps", "Git"] },
    ],
    decisions: [],
    builtItems: [
      "A moderation workflow for publishing and unpublishing reviews.",
      "Search and filtering of review data through the company's existing GraphQL API.",
    ],
    learnings: [
      "Building a web application for an established company, with their requirements for structure and functionality.",
      "GraphQL, and how to use it to fetch and present data.",
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
    background:
      "I had worked quite a bit with XML at RevolutionRace, and my mentor suggested I build my own application that generates XML files. That became Sitemap Generator, a personal project I built myself.",
    myRole: "I didn't use AI to build it, apart from sometimes asking ChatGPT for help when debugging.",
    visual: { kind: "image", src: "/sitemapp.png", alt: "Sitemap Generator form for entering a URL" },
    images: ["/sitemapp.png"],
    diagrams: ["sitemap-pipeline"],
    architectureLabel: "howItWorks",
    architecture:
      "Given a URL, the tool fetches the page and produces one of two outputs: a sitemap following sitemaps.org, built from the links on the page, or an XML document describing every element in the page body with its text and attributes. The result can be viewed in the browser or downloaded as a file. A single controller handles the form, and both modes share the same fetch and parse steps.",
    cardTech: ["C#", "ASP.NET Core MVC", "HtmlAgilityPack", "Docker"],
    tech: [
      { label: "Backend", items: ["C#", "ASP.NET Core MVC (.NET 8)", "HtmlAgilityPack", "LINQ to XML"] },
      { label: "Infrastructure", items: ["Docker (multi-stage build)", "Render"] },
    ],
    techNote: "Packaged with a multi-stage Dockerfile: it builds with the .NET 8 SDK and runs on the smaller ASP.NET runtime.",
    decisions: [
      {
        title: "Valid sitemap output",
        problem: "Links on a page are often relative, and the output has to follow the sitemap schema.",
        decision:
          "Links are resolved against the page URL into absolute URLs and written with LINQ to XML in the sitemaps.org namespace, with lastmod and a priority that drops by 0.1 per path level, never below 0.5.",
      },
      {
        title: "One pipeline, two outputs",
        problem: "The same page should be usable both for a sitemap and for a structured content extract.",
        decision:
          "Both modes share fetching (HttpClient) and parsing (HtmlAgilityPack); only the XML-building step differs, chosen in the form.",
      },
    ],
    links: [
      { label: "Live demo", url: "https://sitemapgenerator-cz9s.onrender.com/", type: "demo" },
      { label: "GitHub", url: "https://github.com/Lirijes/SitemapGenerator", type: "github" },
    ],
  },
];
