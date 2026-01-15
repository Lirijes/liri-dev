const educationData = [
  {
    degree: "Web Developer .NET",
    school: "EC Utbildning",
    period: "Aug 2022 - May 2024",
    type: "Distance Learning",
    description: "Created multiple web applications for e-commerce using React, MongoDB, C#, ASP.NET WPF, and Umbraco CMS. Built MVC apps for case management. Projects conducted with agile methodologies."
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
    <section id="education" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-2">
            Academic Background
          </p>
          <h2 className="font-display text-4xl text-foreground">Education</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          {educationData.map((edu, index) => (
            <div key={index} className="border-l-2 border-primary/30 pl-6">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                {edu.credits && (
                  <span className="text-xs text-primary">
                    {edu.credits}
                  </span>
                )}
              </div>
              <p className="text-primary text-sm mb-1">{edu.school}</p>
              <p className="text-muted-foreground text-sm mb-2">
                {edu.period} {edu.type && `• ${edu.type}`}
              </p>
              {edu.description && (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
