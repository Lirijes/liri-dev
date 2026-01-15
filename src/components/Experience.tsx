import { motion } from "framer-motion";

const experiences = [
  {
    title: "Fullstack Developer",
    company: "Readymade AB",
    location: "Skene",
    period: "Sep 2025 - Present",
    description: "Working on developing the company's e-commerce solutions. Initially launched six concept sites on Quickbutik, then transitioned to WordPress WooCommerce for greater flexibility. Focus on frontend (HTML, CSS, JavaScript), simple backend, multisite configuration, workflow automation via scripts and tools, and SEO optimization.",
    technologies: ["HTML", "CSS", "JavaScript", "WooCommerce", "WordPress", "SEO"],
    color: "primary"
  },
  {
    title: "Fullstack Developer (Internship)",
    company: "Houshmand Tech",
    location: "Gothenburg",
    period: "Dec 2024 - Jun 2025",
    description: "Development and maintenance of a club shop platform for associations and a matching tool that connects users with clubs. Focus on scalable and user-friendly solutions. Responsible for backend development, implementing new features and improving existing functionality.",
    technologies: [".NET Core", "Razor", "nopCommerce", "C#"],
    color: "accent"
  },
  {
    title: "Fullstack Developer (Internship)",
    company: "RevolutionRace",
    location: "Borås",
    period: "Nov 2023 - May 2024",
    description: "Created a Nuxt.js webapp for administrators to manage customer reviews. Participated in developing the company's new footer and made changes to the XML map and CMS system. Fetched data via GraphQL. Worked with Azure DevOps and Git for version control.",
    technologies: ["Nuxt.js", "Vue.js", "GraphQL", "Azure DevOps", "Git", "SCRUM"],
    color: "coral"
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-secondary/30">
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
                  className={`absolute -left-4 top-0 w-1 h-0 bg-${exp.color} rounded-full`}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                />
                <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {exp.title}
                </h3>
                <p className={`text-${exp.color} mb-4 font-medium`}>{exp.company}</p>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {exp.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <motion.span 
                      key={techIndex}
                      className="text-xs px-2 py-1 rounded-md bg-background text-muted-foreground"
                      whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--primary) / 0.1)" }}
                    >
                      {tech}
                    </motion.span>
                  ))}
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
