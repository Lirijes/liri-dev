import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Backend",
    skills: ["C#", ".NET Core", "ASP.NET MVC", "Entity Framework Core", "Razor", "REST API"],
    color: "primary"
  },
  {
    title: "Frontend",
    skills: ["TypeScript", "JavaScript", "React", "Vue.js", "HTML", "CSS"],
    color: "accent"
  },
  {
    title: "Database & Tools",
    skills: ["MS SQL Server", "Azure DevOps", "Git", "SCRUM"],
    color: "coral"
  },
  {
    title: "Other",
    skills: ["E-commerce Solutions", "CMS", "SEO Optimization", "Unit & Integration Tests", "Workflow Automation"],
    color: "lavender"
  }
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className={`font-semibold text-foreground mb-4 pb-2 border-b-2 border-${category.color}`}>
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.li 
                    key={skillIndex}
                    className="text-muted-foreground text-sm flex items-center gap-2 group cursor-default"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 + skillIndex * 0.05 }}
                    whileHover={{ x: 5, color: "hsl(var(--foreground))" }}
                  >
                    <motion.span 
                      className={`w-1.5 h-1.5 rounded-full bg-${category.color} opacity-50 group-hover:opacity-100 transition-opacity`}
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
