import profileImage from "@/assets/profile.jpg";

const About = () => {
  return (
    <section id="about" className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
              <img 
                src={profileImage} 
                alt="Lirije Shabani" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="md:col-span-8 space-y-6">
            <div className="space-y-2">
              <p className="text-primary font-medium text-sm tracking-wide uppercase">
                Fullstack Developer
              </p>
              <h1 className="font-display text-5xl md:text-6xl text-foreground">
                Lirije Shabani
              </h1>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              I'm a fullstack developer who loves creating digital solutions that truly make 
              a difference for users. I'm driven by understanding problems, finding smart 
              technical solutions, and constantly evolving. Currently looking for a place 
              where I can contribute my code and grow together with an engaged team.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-4">
              <span className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm">
                .NET / C#
              </span>
              <span className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm">
                React
              </span>
              <span className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm">
                Vue.js
              </span>
              <span className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm">
                TypeScript
              </span>
              <span className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm">
                E-commerce
              </span>
            </div>
            
            <div className="pt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Based in Skene, Sweden</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Available for opportunities</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
