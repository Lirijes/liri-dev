import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
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
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-8 mb-12 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.a 
              href="mailto:Lirije11@hotmail.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              >
                <Mail className="w-4 h-4 group-hover:text-primary" />
              </motion.div>
              Lirije11@hotmail.com
            </motion.a>
            
            <motion.a 
              href="tel:+46700999544"
              className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="w-4 h-4" />
              +46 70 099 95 44
            </motion.a>
            
            <motion.span 
              className="flex items-center gap-2 text-muted-foreground"
              whileHover={{ scale: 1.05 }}
            >
              <MapPin className="w-4 h-4 text-coral" />
              Skene, Sweden
            </motion.span>
          </motion.div>
          
          <motion.div 
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
              whileHover={{ scale: 1.1, rotate: -360 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Linkedin size={20} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
