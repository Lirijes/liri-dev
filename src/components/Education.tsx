import { motion } from "framer-motion";

const educationData = [
  {
    degree: "Web Developer .NET",
    school: "EC Utbildning",
    period: "Aug 2022 - May 2024",
    type: "Distance Learning",
    description: "Created multiple web applications for e-commerce using React, MongoDB, C#, ASP.NET WPF, and Umbraco CMS. Built MVC apps for case management. Projects conducted with agile methodologies.",
    highlight: true
  },
  {
    degree: "Information Technology",
    school: "Uppsala University",
    period: "2023",
    credits: "10 hp"
  },
  {
    degree: "Cybersecurity",
    school: "Linköping University",
    period: "2023",
    credits: "3 hp"
  },
  {
    degree: "AI Fundamentals",
    school: "Linköping University",
    period: "2023",
    credits: "2 hp"
  }
];

const Education = () => {
  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-2">
            Academic Background
          </p>
          <h2 className="font-display text-4xl text-foreground">Education</h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          {educationData.map((edu, index) => (
            <motion.div 
              key={index} 
              className={`border-l-2 pl-6  duration-300 ${edu.highlight ? 'border-primary' : 'border-border/50'}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-start mb-1">
                <motion.h3 
                  className="font-semibold text-foreground"
                >
                  {edu.degree}
                </motion.h3>
                {edu.credits && (
                  <span className="text-xs px-2 py-1 rounded-md text-muted-foreground rounded-full border border-border">
                    {edu.credits}
                  </span>
                )}
              </div>
              <p className="text text-sm mb-1 font-medium">{edu.school}</p>
              <p className="text-muted-foreground text-sm mb-2">
                {edu.period} {edu.type && `• ${edu.type}`}
              </p>
              {edu.description && (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {edu.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
