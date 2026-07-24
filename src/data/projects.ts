import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "minsommar",
    title: "MinSommar",
    shortDescription:
      "A fullstack web application for families that makes it easier to find, plan and keep track of summer activities together.",
    overview:
      "MinSommar is a fullstack application I developed from idea to working product. It helps families collect activities and things they want to do during the summer in one place, with shared bucket lists and an optional points and rewards system for children. I built the application end-to-end, including UX, frontend, backend logic, database structure, authentication and authorization.",
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
    techStack: ["TypeScript", "React", "TanStack Start", "Supabase", "PostgreSQL"],
    role: "Fullstack Developer",
    responsibilities: [
      "Designed and developed the application from idea to working product",
      "Built the frontend and application flows in React and TypeScript",
      "Designed the PostgreSQL database structure",
      "Implemented authentication and family-based access",
      "Built authorization and data isolation using Row Level Security (RLS)",
      "Implemented server-side logic and database/RPC functions",
      "Built activities, categories and shared bucket lists",
      "Built an optional points and rewards system",
      "Implemented family onboarding and a child mode",
      "Deployed the application"
    ],
    architecture:
      "Built with React and TypeScript on TanStack Start, with routing handled by TanStack Router. Supabase provides authentication, the PostgreSQL database and Row Level Security (RLS) policies that isolate data per family. Sensitive operations run server-side through database/RPC functions rather than on the client. Deployed on Vercel.",
    challenges: [
      "Designing access around families rather than individual users — sharing data within a family while keeping it isolated from other families, using the data model together with Supabase authentication and RLS policies.",
      "Keeping sensitive operations server-side rather than relying only on the client, combining client- and server-side functionality."
    ],
    links: [
      { label: "Visit Site", url: "https://minsommar.se/", type: "demo" },
      { label: "GitHub", url: "https://github.com/Lirijes/minsommar", type: "github" }
    ],
    featured: true
  },
  {
    id: "inspecto-app",
    title: "Inspecto Management Application",
    shortDescription: "Web application for managing inspections, objects, and cases with a scalable backend architecture.",
    overview: "A dashboard application for managing facilities, cases and inspections, with authentication and full CRUD functionality. The project started as a rapid prototype and evolved into a more structured solution with a separate C#/.NET Web API running against the same PostgreSQL database for improved control and scalability.",
    image: "/inspectoboard.png",
    images: ["/inspectoboard.png"],
    type: "App",
    status: "Case",
    techStack: ["TypeScript", "React", "C#", "ASP.NET Core Web API", "Entity Framework Core", "PostgreSQL (Supabase)", "Swagger/OpenAPI", "Vercel"],
    role: "Fullstack Developer",
    responsibilities: [
      "Built the initial application using React and Supabase",
      "Developed a separate C#/.NET Web API against the same PostgreSQL database",
      "Modelled data and access with Entity Framework Core",
      "Designed REST endpoints and documented them with Swagger/OpenAPI",
      "Integrated the frontend with the backend services"
    ],
    architecture: "React frontend (Vite) with authentication and CRUD via Supabase, plus a separate ASP.NET Core Web API using Entity Framework Core against the same PostgreSQL database, documented with Swagger/OpenAPI.",
    challenges: [
      "Migrating from direct database access to an API-based architecture",
      "Defining clear boundaries between frontend and backend responsibilities",
      "Maintaining development speed while improving structure"
    ],
    links: [
      { label: "Visit Site", url: "https://inspecto-silk.vercel.app/", type: "demo" },
      { label: "GitHub – Frontend", url: "https://github.com/Lirijes/inspecto", type: "github" },
      { label: "GitHub – Backend", url: "https://github.com/Lirijes/inspecto-api", type: "github" }
    ],
    featured: false
  },
  {
    id: "internal-review-management-app",
    title: "Internal Review Management App",
    shortDescription: "Internal review management application built for RevolutionRace, focusing on moderation workflows and search.",
    overview: "An internal tool built to help editors and content managers handle customer reviews efficiently. The application allows users to search, filter, publish and unpublish reviews, providing better control over review visibility and moderation.",
    image: "/adminreviews.png",
    images: ["/adminreviews.png"],
    type: "Web",
    status: "Internal",
    techStack: ["Nuxt", "Vue", "GraphQL", "TypeScript", "Azure DevOps"],
    role: "Fullstack Developer",
    responsibilities: [
      "Built internal tooling for managing and moderating reviews",
      "Implemented publishing and unpublishing workflows",
      "Developed search and filtering functionality for large datasets",
      "Integrated frontend with a GraphQL API"
    ],
    architecture: "Internal web application built with Nuxt, consuming data via a GraphQL API. Focus on editor workflows and efficient data querying.",
    challenges: [
      "Designing efficient search and filtering for review data",
      "Creating clear moderation workflows for editors",
      "Working within an existing internal system and API structure"
    ],
    links: [
    ],
    featured: false
  },
  {
    id: "datespot-app",
    title: "DateSpot",
    shortDescription: "Location-based web app for discovering and saving nearby date spots, with authentication and user favorites.",
    overview: "A location-based application built to help users discover date spots near their current location. Users can create accounts, log in, and save places as favorites. The project was generated using Lovable with a custom Supabase setup, where core functionality such as authentication, data handling, and user logic was implemented manually.",
    image: "/datespot.png",
    images: ["/datespot.png"],
    type: "App",
    status: "Case",
    techStack: ["TypeScript", "React", "Supabase", "Geolocation API", "Vercel"],
    role: "Fullstack Developer",
    responsibilities: [
      "Built the initial application using Lovable and Supabase",
      "Set up and configured Supabase backend and database schema",
      "Built functionality for saving and managing favorite locations",
      "Worked with geolocation-based data to fetch nearby places",
      "Extended and refined functionality beyond the generated baseline"
    ],
    architecture: "Client-side application built with React and Vite, using Supabase for authentication, database access, and backend services. Data is stored in a PostgreSQL database.",
    challenges: [
      "Designing a simple but flexible data model for user favorites",
      "Handling location-based queries in a performant way",
      "Taking ownership of functionality instead of relying on generated code"
    ],
    links: [
      { label: "Live Demo", url: "https://datespot.vercel.app/", type: "demo" },
      { label: "GitHub", url: "https://github.com/Lirijes/lovable-date", type: "github" }
    ],
    featured: false
  },
  {
    id: "sitemap-generator",
    title: "Sitemap Generator",
    shortDescription: "ASP.NET-based tool for generating XML sitemaps for websites.",
    overview: "A standalone tool that, given a URL, crawls a website and generates either an XML sitemap or a structured HTML data extraction, with the option to download the result. Built and deployed in its own Docker container.",
    image: "/sitemapp.png",
    images: ["/sitemapp.png"],
    type: "Backend",
    status: "Live",
    techStack: ["C#", ".NET", "ASP.NET Core MVC", "HtmlAgilityPack", "Docker", "XML"],
    role: "Backend Developer",
    responsibilities: [
      "Implemented URL crawling and sitemap generation logic",
      "Built structured HTML data extraction using HtmlAgilityPack",
      "Handled XML output, validation and downloadable results",
      "Containerised and deployed the tool with Docker"
    ],
    architecture: "Server-side ASP.NET Core MVC application that crawls a target URL with HtmlAgilityPack and generates downloadable XML/HTML output, packaged and deployed as a Docker container.",
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
