const experiences = [
  {
    title: "Fullstack Developer",
    company: "Readymade AB",
    location: "Skene",
    period: "Sep 2025 - Present",
    description: "Working on developing the company's e-commerce solutions. Initially launched six concept sites on Quickbutik, then transitioned to WordPress WooCommerce for greater flexibility. Focus on frontend (HTML, CSS, JavaScript), simple backend, multisite configuration, workflow automation via scripts and tools, and SEO optimization.",
    technologies: ["HTML", "CSS", "JavaScript", "WooCommerce", "WordPress", "SEO"]
  },
  {
    title: "Fullstack Developer (Internship)",
    company: "Houshmand Tech",
    location: "Gothenburg",
    period: "Dec 2024 - Jun 2025",
    description: "Development and maintenance of a club shop platform for associations and a matching tool that connects users with clubs. Focus on scalable and user-friendly solutions. Responsible for backend development, implementing new features and improving existing functionality.",
    technologies: [".NET Core", "Razor", "nopCommerce", "C#"]
  },
  {
    title: "Fullstack Developer (Internship)",
    company: "RevolutionRace",
    location: "Borås",
    period: "Nov 2023 - May 2024",
    description: "Created a Nuxt.js webapp for administrators to manage customer reviews. Participated in developing the company's new footer and made changes to the XML map and CMS system. Fetched data via GraphQL. Worked with Azure DevOps and Git for version control.",
    technologies: ["Nuxt.js", "Vue.js", "GraphQL", "Azure DevOps", "Git", "SCRUM"]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-2">
            Career Path
          </p>
          <h2 className="font-display text-4xl text-foreground">Experience</h2>
        </div>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                  <p className="text-primary">{exp.company}</p>
                </div>
                <div className="text-sm text-muted-foreground text-right">
                  <p>{exp.period}</p>
                  <p>{exp.location}</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {exp.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
