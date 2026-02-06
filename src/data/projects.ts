import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "inspecto-app",
    title: "Inspecto Management Application",
    shortDescription: "Web application for managing inspections, objects, and cases with a scalable backend architecture.",
    overview: "A web-based inspection management system designed to handle objects, inspections, and case workflows. The project started as a rapid prototype and evolved into a more structured solution with a separate backend for improved control and scalability.",
    image: "/inspectoboard.png",
    images: ["/inspectoboard.png"],
    type: "App",
    status: "Case",
    techStack: ["TypeScript", "React", ".NET", "REST API", "PostgreSQL (Supabase)", "Vercel"],
    role: "Fullstack Developer",
    responsibilities: [
      "Built the initial application using Lovable and Supabase",
      "Replaced direct database access with a custom .NET REST API",
      "Designed REST endpoints and data models",
      "Integrated frontend with backend services"
    ],
    architecture: "Frontend built with React and Vite communicating with a .NET REST API. The backend connects to a PostgreSQL database provided by Supabase.",
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
    featured: true
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
    featured: true
  },
  {
    id: "sitemap-generator",
    title: "Sitemap Generator",
    shortDescription: "ASP.NET-based tool for generating XML sitemaps for websites.",
    overview: "A backend-focused utility built in ASP.NET to generate XML sitemaps based on website structure. The project was created to explore backend logic, data processing, and file generation in a clean and maintainable way.",
    image: "/sitemapp.png",
    images: ["/sitemapp.png"],
    type: "Backend",
    status: "Live",
    techStack: [".NET", "C#", "Razor", "ASP.NET MVC", "XML", "MVVM", "Vercel"],
    role: "Backend Developer",
    responsibilities: [
      "Implemented sitemap generation logic",
      "Designed clean backend structure",
      "Handled XML output and validation"
    ],
    architecture: "Server-side ASP.NET application focused on backend logic and file generation.",
    challenges: [
      "Designing a flexible sitemap structure",
      "Ensuring valid and standards-compliant XML output"
    ],
    links: [
      { label: "Live Demo", url: "https://sitemapgenerator-cz9s.onrender.com/", type: "demo" },
      { label: "GitHub", url: "https://github.com/Lirijes/SitemapGenerator", type: "github" }
    ],
    featured: false
  },
  {
    id: "portfolio-site",
    title: "Personal Portfolio",
    shortDescription: "Modern, animated portfolio built with React and Framer Motion showcasing my work and skills.",
    overview: "Designed and built my personal portfolio from scratch, focusing on clean aesthetics, smooth animations, and excellent performance. Built as a single-page application with a focus on accessibility.",
    image: "/placeholder.svg",
    type: "Web",
    status: "Live",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    role: "Designer & Developer",
    responsibilities: [
      "Designed the visual identity and UX",
      "Implemented responsive layouts",
      "Added micro-interactions and animations",
      "Optimized for performance and SEO"
    ],
    architecture: "React SPA with Vite, deployed on Lovable.",
    challenges: [
      "Balancing visual flair with performance",
      "Creating a cohesive design system",
      "Making animations feel natural and purposeful"
    ],
    links: [
      { label: "GitHub", url: "https://github.com", type: "github" }
    ],
    featured: true
  }
];
