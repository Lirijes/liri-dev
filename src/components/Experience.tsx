import { motion } from "framer-motion";

const experiences = [
  {
    title: "Fullstack Developer",
    company: "Readymade AB",
    location: "Skene",
    period: "Sep 2025 - Present",
    description: "Developing and improving the company's e-commerce platform. A large part of the role is structuring and quality-assuring existing code, building reusable components, and improving the UI and design system, as well as handling and quality-assuring large volumes of product data and integrations. I also work with databases, APIs and CMS, and build automations that streamline workflows and reduce manual work.",
    technologies: ["TypeScript", "Astro", "DatoCMS", "GraphQL", "REST API", "SQL"],
    focus: ["E-commerce", "Product Data", "Integrations", "CMS", "Automation", "Reusable Components", "Design System"],
    barColor: "bg-primary",
    textColor: "text-primary"
  },
  {
    title: "Fullstack Developer",
    company: "Houshmand Tech",
    location: "Gothenburg",
    period: "Dec 2024 - Jun 2025",
    description: "Development and maintenance of a club shop platform for associations and a matching tool that connects users with clubs. Covered both frontend and backend work with a focus on .NET Core, Razor and nopCommerce, building new features and integrations and improving existing functionality to make the platform more user-friendly.",
    technologies: [".NET Core", "Razor", "nopCommerce", "C#", "SQL", "JavaScript", "HTML", "CSS"],
    barColor: "bg-accent",
    textColor: "text-accent"
  },
  {
    title: "Fullstack Developer (Internship)",
    company: "RevolutionRace",
    location: "Borås",
    period: "Nov 2023 - May 2024",
    description: "Built a Nuxt.js admin application for managing customer reviews and contributed to the company's web platform through improvements to the CMS, XML sitemap and the new footer. Fetched data via GraphQL and worked with Azure DevOps and Git, taking active part in the full agile process from planning and estimation to sprint deliveries.",
    technologies: ["Nuxt.js", "Vue.js", "TypeScript", "GraphQL", "Azure DevOps", "Git", "SCRUM", "CMS"],
    barColor: "bg-accent",
    textColor: "text-accent"
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-2">
            Career Path
          </p>
          <h2 className="font-display text-4xl text-foreground">Experience</h2>
        </motion.div>
        
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              className="grid md:grid-cols-12 gap-6 pb-12 border-b border-border last:border-0 last:pb-0 group"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="md:col-span-3 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{exp.period}</p>
                <p>{exp.location}</p>
              </div>
              
              <div className="md:col-span-9 relative">
                <motion.div
                  className={`absolute -left-4 top-0 w-1 h-0 ${exp.barColor} rounded-full`}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                />
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {exp.title}
                </h3>
                <p className={`${exp.textColor} mb-4 font-medium`}>{exp.company}</p>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {exp.description}
                </p>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
                      Tech
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {exp.focus && exp.focus.length > 0 && (
                    <div>
                      <p className="text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
                        Focus
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.focus.map((area) => (
                          <span
                            key={area}
                            className="text-xs px-2.5 py-1 rounded-full bg-secondary/70 text-secondary-foreground"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
