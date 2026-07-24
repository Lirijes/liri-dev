import { motion } from "framer-motion";

// Categories mirror the structure used in the current CV so the portfolio
// stays in sync. `dotColor` is a literal class (not interpolated) so Tailwind
// can see it at build time.
const skillCategories = [
  {
    title: "Backend",
    skills: ["C#", ".NET", "ASP.NET Core", "Node.js"],
    dotColor: "bg-primary",
  },
  {
    title: "Frontend",
    skills: ["JavaScript", "TypeScript", "React", "Vue", "Astro", "HTML/CSS"],
    dotColor: "bg-accent",
  },
  {
    title: "Database & API",
    skills: ["SQL", "PostgreSQL", "GraphQL", "REST API"],
    dotColor: "bg-primary",
  },
  {
    title: "CMS & E-commerce",
    skills: ["DatoCMS", "Umbraco", "nopCommerce", "Storyblok"],
    dotColor: "bg-accent",
  },
  {
    title: "Tools",
    skills: ["Git", "Azure DevOps", "Docker", "Automation"],
    dotColor: "bg-primary",
  },
  {
    title: "AI-assisted Development",
    skills: ["Claude", "GitHub Copilot"],
    dotColor: "bg-accent",
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-2">
            Technical Expertise
          </p>
          <h2 className="font-display text-4xl text-foreground">Skills</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="font-semibold text-foreground mb-4 pb-2 border-b-2 border-border/50">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skill}
                    className="text-muted-foreground text-sm flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 + skillIndex * 0.05 }}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${category.dotColor} opacity-70`}
                    />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
