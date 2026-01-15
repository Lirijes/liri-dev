import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-2">
            Get in Touch
          </p>
          <h2 className="font-display text-4xl text-foreground mb-6">
            Let's work together
          </h2>
          <p className="text-muted-foreground mb-12">
            I'm currently open to new opportunities. Whether you have a question or just want to say hi, 
            feel free to reach out!
          </p>
          
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <a 
              href="mailto:Lirije11@hotmail.com"
              className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-colors group"
            >
              <Mail className="w-6 h-6 text-primary mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                Email
              </p>
              <p className="text-xs text-muted-foreground mt-1">Lirije11@hotmail.com</p>
            </a>
            
            <a 
              href="tel:+46700999544"
              className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-colors group"
            >
              <Phone className="w-6 h-6 text-primary mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                Phone
              </p>
              <p className="text-xs text-muted-foreground mt-1">+46 70 099 95 44</p>
            </a>
            
            <div className="p-6 bg-card rounded-2xl border border-border">
              <MapPin className="w-6 h-6 text-primary mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground">Location</p>
              <p className="text-xs text-muted-foreground mt-1">Skene, Sweden</p>
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
