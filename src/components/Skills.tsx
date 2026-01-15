const skillCategories = [
  {
    title: "Backend",
    skills: ["C#", ".NET Core", "ASP.NET MVC", "Entity Framework Core", "Razor", "REST API"]
  },
  {
    title: "Frontend",
    skills: ["TypeScript", "JavaScript", "React", "Vue.js", "HTML", "CSS"]
  },
  {
    title: "Database & Tools",
    skills: ["MS SQL Server", "Azure DevOps", "Git", "SCRUM"]
  },
  {
    title: "Other",
    skills: ["E-commerce Solutions", "CMS", "SEO Optimization", "Unit & Integration Tests", "Workflow Automation"]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-2">
            Technical Expertise
          </p>
          <h2 className="font-display text-4xl text-foreground">Skills</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="p-6 bg-card rounded-2xl border border-border"
            >
              <h3 className="font-semibold text-foreground mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li 
                    key={skillIndex}
                    className="text-muted-foreground text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
