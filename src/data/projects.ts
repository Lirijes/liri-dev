import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "revolutionrace-ecommerce",
    title: "RevolutionRace E-commerce",
    shortDescription: "Scalable e-commerce platform handling millions of visitors with high conversion rates and multi-market support.",
    overview: "Contributed to one of Sweden's fastest-growing outdoor apparel brands. The platform supports multiple markets, currencies, and languages while maintaining exceptional performance during high-traffic sales events.",
    image: "/placeholder.svg",
    type: "Fullstack",
    status: "Live",
    techStack: [".NET Core", "React", "MS SQL", "Azure", "REST API"],
    role: "Fullstack Developer",
    responsibilities: [
      "Developed and maintained e-commerce features",
      "Optimized performance for high-traffic scenarios",
      "Implemented multi-market functionality",
      "Built integrations with third-party services"
    ],
    architecture: "Microservices architecture with .NET Core backend, React frontend, and Azure cloud infrastructure.",
    challenges: [
      "Handling traffic spikes during sales campaigns",
      "Managing complexity of multi-market pricing and inventory",
      "Ensuring consistent UX across different markets"
    ],
    links: [
      { label: "Visit Site", url: "https://revolutionrace.com", type: "demo" }
    ],
    featured: true
  },
  {
    id: "houshmand-platform",
    title: "Houshmand Tech Platform",
    shortDescription: "End-to-end development of web applications with modern tech stack and automated workflows.",
    overview: "Built comprehensive web solutions for clients, handling everything from architecture decisions to deployment. Focused on creating maintainable, scalable applications with excellent developer experience.",
    image: "/placeholder.svg",
    type: "Fullstack",
    status: "Case",
    techStack: ["Vue.js", ".NET Core", "Entity Framework", "Azure DevOps"],
    role: "Fullstack Developer",
    responsibilities: [
      "Architected and built client applications from scratch",
      "Set up CI/CD pipelines and deployment workflows",
      "Implemented automated testing strategies",
      "Mentored junior developers"
    ],
    architecture: "Monolithic .NET Core applications with Vue.js frontends, deployed on Azure.",
    challenges: [
      "Balancing feature velocity with code quality",
      "Designing flexible systems for varying client needs",
      "Maintaining multiple projects simultaneously"
    ],
    links: [],
    featured: true
  },
  {
    id: "readymade-cms",
    title: "Enterprise CMS Solutions",
    shortDescription: "Custom CMS implementations and integrations for enterprise clients with complex content needs.",
    overview: "Developed and customized content management solutions for various enterprise clients, focusing on usability, performance, and seamless integrations with existing systems.",
    image: "/placeholder.svg",
    type: "Web",
    status: "Case",
    techStack: [".NET Core", "Razor", "JavaScript", "MS SQL", "REST API"],
    role: "Backend Developer",
    responsibilities: [
      "Built custom CMS modules and extensions",
      "Integrated third-party services and APIs",
      "Optimized database queries and caching",
      "Implemented SEO best practices"
    ],
    challenges: [
      "Working with legacy codebases",
      "Meeting strict enterprise security requirements",
      "Migrating content from old systems"
    ],
    links: [],
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
