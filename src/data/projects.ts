import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "nodia",
    title: "Nodia",
    shortDescription:
      "An AI platform for searching and working with company data, in development. So far: a .NET API with Supabase authentication, multi-tenant workspaces and data isolation covered by tests.",
    overview:
      "Nodia is a platform I'm building to let companies search, ask questions about and act on their own documents and data with AI. Before adding any AI features I'm building what everything else depends on: who the user is, which company's data they can reach, and making sure that boundary holds — document retrieval must never return another company's content. The backend is an ASP.NET Core Web API on .NET 10 with Entity Framework Core against PostgreSQL in Supabase. The React and TypeScript frontend signs in through Supabase Auth and calls the API with the user's access token.",
    image: "/nodia-architecture.svg",
    images: ["/nodia-architecture.svg"],
    type: "Fullstack",
    status: "In development",
    techStack: [
      "C#",
      "ASP.NET Core Web API (.NET 10)",
      "Entity Framework Core",
      "PostgreSQL (Supabase)",
      "Supabase Auth / JWT",
      "React",
      "TypeScript",
      "Vite",
      "Docker Compose",
      "xUnit",
      "Testcontainers",
      "GitHub Actions"
    ],
    cardTech: ["C#", "ASP.NET Core", "EF Core", "PostgreSQL", "React"],
    role: "Sole Developer",
    responsibilities: [
      "Architecture, backend, frontend, database and development environment",
      "Data model and access rules for multi-tenant company data",
      "Integration tests and CI pipelines for both repositories",
      "Planning the document, RAG and agent features on top of the foundation"
    ],
    progress: {
      built: [
        "ASP.NET Core Web API on .NET 10 with EF Core migrations against Supabase PostgreSQL, documented with Swagger",
        "Supabase JWT validation against the published signing keys (issuer, audience, lifetime); anonymous Supabase sessions are rejected",
        "Authorization required by default — endpoints are protected unless explicitly marked as public",
        "Multi-tenant model with companies and memberships (owner/member) and a membership filter on every company route",
        "Database hardening: Row Level Security enabled without policies and privileges revoked, so the API is the only path to the data",
        "Around 30 integration tests running against a real PostgreSQL container, covering authentication, tenant isolation and database security",
        "React and TypeScript frontend with Supabase Auth (sign up, sign in, protected routes) and an API client that sends the user's token",
        "Docker Compose development environment and GitHub Actions CI for both repositories"
      ],
      inProgress: [
        "Workspace onboarding and workspace switching in the frontend"
      ],
      planned: [
        "Document upload, management and search",
        "Retrieval-Augmented Generation (RAG) for questions answered from company documents",
        "AI integration with Semantic Kernel, using local models through Ollama",
        "AI agents with tool calling and multi-step workflows",
        "Human-in-the-loop review and approval of AI-proposed actions",
        "Execution logs for AI activity"
      ]
    },
    architecture:
      "Two repositories: a React/Vite frontend and an ASP.NET Core Web API. The browser authenticates with Supabase Auth and calls the API through a Vite proxy with the access token. The API validates the token, checks company membership and is the only component that talks to PostgreSQL. Both run together in Docker Compose during development.",
    challenges: [
      "Making the API the only way to reach the data. Supabase exposes tables through its own Data API by default, so the migrations enable RLS without any policies and revoke privileges — including default privileges for future tables — and tests verify this stays true.",
      "Taking identity only from the verified token. The user id always comes from the JWT's subject; ids sent in the URL, body or headers are ignored, and there are tests that try exactly that.",
      "Not leaking which companies exist: requests for another company's data return 404, the same as a company that doesn't exist, while too low a role returns 403.",
      "Enforcing security rules automatically: architecture tests fail the build if a company route is missing the membership check, or if anything other than the health check allows anonymous access.",
      "Testing against a real PostgreSQL instance (Testcontainers) instead of an in-memory database, so constraints, foreign keys to Supabase's auth schema and RLS are actually exercised."
    ],
    links: [
      { label: "GitHub – Frontend", url: "https://github.com/Lirijes/nodia", type: "github" },
      { label: "GitHub – Backend", url: "https://github.com/Lirijes/NodiaApi", type: "github" }
    ],
    featured: true
  },
  {
    id: "minsommar",
    title: "MinSommar",
    shortDescription:
      "A fullstack web application for families to find, plan and keep track of summer activities together, with data shared within a family and isolated from everyone else.",
    overview:
      "MinSommar is a fullstack application I took from idea to working product. Families collect activities they want to do during the summer in one place, save favourites, and can use an optional points and rewards system for children. A family can have several guardians, so data is shared within the family and kept isolated from other families. I built it end-to-end: UX, frontend, data model, authentication, authorization, server logic and deployment.",
    image: "/minsommar.png",
    images: [
      "/minsommar.png",
      "/minsommar-2.png",
      "/minsommar-3.png",
      "/minsommar-4.png",
      "/minsommar-5.png"
    ],
    type: "Fullstack",
    status: "Live",
    techStack: ["TypeScript", "React", "TanStack Start", "TanStack Router", "Supabase", "PostgreSQL", "Row Level Security", "Vercel"],
    cardTech: ["TypeScript", "React", "TanStack Start", "Supabase", "PostgreSQL"],
    role: "Fullstack Developer",
    responsibilities: [
      "Took the application from idea to working product",
      "Built the frontend and application flows in React and TypeScript",
      "Designed the PostgreSQL data model around families with multiple guardians",
      "Implemented authentication and family-based authorization with Row Level Security (RLS)",
      "Implemented server-side logic as PostgreSQL RPC functions",
      "Built the activity catalog, categories, favourites and shared bucket lists",
      "Built an optional points and rewards system, family onboarding and a child mode",
      "Deployed the application on Vercel"
    ],
    architecture:
      "React and TypeScript on TanStack Start, with routing handled by TanStack Router. Supabase provides authentication and the PostgreSQL database, where RLS policies isolate data per family. Operations that must not be decided by the client run server-side as PostgreSQL RPC functions. Deployed on Vercel.",
    challenges: [
      "Designing access around families rather than individual users — several guardians share the same data, which must stay invisible to other families. Solved with the data model together with Supabase Auth and RLS policies.",
      "Keeping sensitive operations, such as changes to points and rewards, server-side in RPC functions instead of trusting the client."
    ],
    links: [
      { label: "Visit Site", url: "https://minsommar.se/", type: "demo" },
      { label: "GitHub", url: "https://github.com/Lirijes/minsommar", type: "github" }
    ],
    featured: true
  },
  {
    id: "inspecto-app",
    title: "Inspecto",
    shortDescription:
      "Dashboard for managing facilities, cases and inspections, built on Supabase, plus a separate ASP.NET Core Web API for the same database.",
    overview:
      "A dashboard application for managing facilities, cases and inspections, with authentication and CRUD functionality. The frontend works directly against Supabase. Alongside it I built a separate C#/.NET Web API on the same PostgreSQL schema, as a step towards moving business logic and validation into a backend I control. Switching the frontend over to the API is the next step.",
    image: "/inspectoboard.png",
    images: ["/inspectoboard.png"],
    type: "Fullstack",
    status: "Case",
    techStack: ["TypeScript", "React", "Supabase", "C#", "ASP.NET Core Web API", "Entity Framework Core", "PostgreSQL", "Swagger/OpenAPI", "Vercel"],
    cardTech: ["TypeScript", "React", "C#", "ASP.NET Core", "PostgreSQL"],
    role: "Fullstack Developer",
    responsibilities: [
      "Built the dashboard in React and TypeScript with Supabase authentication and CRUD",
      "Built a separate ASP.NET Core Web API for facilities, cases and inspections",
      "Mapped the existing Supabase schema to Entity Framework Core models with a baseline migration",
      "Separated request models (create/update DTOs) from the database entities and put case logic in a service layer",
      "Secured the API with JWT authentication and documented it with Swagger/OpenAPI"
    ],
    architecture:
      "React frontend (Vite) using Supabase for authentication and data. The ASP.NET Core Web API uses Entity Framework Core against the same PostgreSQL database, with controllers, DTOs and a service layer, documented with Swagger/OpenAPI.",
    challenges: [
      "Bringing EF Core into a database that already existed in Supabase — modelling the existing tables and creating a baseline migration instead of generating a new schema.",
      "Deciding where logic belongs: the direct Supabase approach was fast to build, while the API gives one place for validation and business rules."
    ],
    links: [
      { label: "Visit Site", url: "https://inspecto-silk.vercel.app/", type: "demo" },
      { label: "GitHub – Frontend", url: "https://github.com/Lirijes/inspecto", type: "github" },
      { label: "GitHub – Backend", url: "https://github.com/Lirijes/inspecto-api", type: "github" }
    ],
    featured: false
  },
  {
    id: "review-management-tool",
    title: "Review Management Tool",
    shortDescription:
      "Internal tool built at RevolutionRace that lets editors moderate customer reviews — search, filter, publish and unpublish — on top of the company's GraphQL API.",
    overview:
      "Developed during my internship at RevolutionRace as an internal admin application for editors and content managers. It gives them one place to find customer reviews and control which ones are visible, by searching, filtering, publishing and unpublishing reviews. Built in Nuxt against the company's existing GraphQL API.",
    image: "/adminreviews.png",
    images: ["/adminreviews.png"],
    type: "Web",
    status: "Internal",
    techStack: ["Nuxt", "Vue", "TypeScript", "GraphQL", "Azure DevOps", "Git"],
    cardTech: ["Nuxt", "Vue", "TypeScript", "GraphQL"],
    role: "Fullstack Developer (Internship) · RevolutionRace",
    responsibilities: [
      "Built the moderation workflow: reviewing, publishing and unpublishing customer reviews",
      "Implemented search and filtering for a large set of review data",
      "Integrated the Nuxt application with the existing GraphQL API"
    ],
    architecture:
      "Internal Nuxt (Vue, TypeScript) application that reads and updates review data through the company's GraphQL API, with the focus on editor workflows and efficient data querying.",
    challenges: [
      "Designing efficient search and filtering for review data",
      "Making the moderation workflow clear for editors, so it's obvious which reviews are published",
      "Working within an existing API and internal system structure rather than designing them from scratch"
    ],
    links: [],
    featured: false
  },
  {
    id: "sitemap-generator",
    title: "Sitemap Generator",
    shortDescription:
      "ASP.NET Core tool that crawls a website and generates an XML sitemap or a structured HTML data extract, deployed in Docker.",
    overview:
      "A standalone tool that, given a URL, crawls a website and generates either an XML sitemap or a structured extract of the HTML content, with the option to download the result. Built and deployed in its own Docker container.",
    image: "/sitemapp.png",
    images: ["/sitemapp.png"],
    type: "Backend",
    status: "Live",
    techStack: ["C#", ".NET", "ASP.NET Core MVC", "HtmlAgilityPack", "Docker", "XML"],
    role: "Backend Developer",
    responsibilities: [
      "Implemented URL crawling and sitemap generation",
      "Built structured HTML data extraction with HtmlAgilityPack",
      "Generated valid XML output and downloadable results",
      "Containerised and deployed the tool with Docker"
    ],
    architecture:
      "Server-side ASP.NET Core MVC application that crawls a target URL with HtmlAgilityPack and produces downloadable XML or HTML output, packaged and deployed as a Docker container.",
    challenges: [
      "Designing a flexible crawling and sitemap structure",
      "Ensuring valid and standards-compliant XML output"
    ],
    links: [
      { label: "Live Demo", url: "https://sitemapgenerator-cz9s.onrender.com/", type: "demo" },
      { label: "GitHub", url: "https://github.com/Lirijes/SitemapGenerator", type: "github" }
    ],
    featured: false
  }
];
