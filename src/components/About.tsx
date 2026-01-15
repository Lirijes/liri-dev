import { motion } from "framer-motion";
import profileImage from "@/assets/profile.jpg";

const About = () => {

  return (
    <section id="about" className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <motion.div 
            className="md:col-span-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted relative group">
              <img 
                src={profileImage} 
                alt="Lirije Shabani" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
          
          <div className="md:col-span-8 space-y-6">
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-primary font-medium text-sm tracking-wide uppercase">
                Fullstack Developer
              </p>
              <h1 className="font-display text-5xl md:text-6xl text-foreground">
                Lirije Shabani
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-lg text-muted-foreground leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              I’m a full-stack developer focused on building clear, maintainable digital solutions. I enjoy understanding real problems, improving existing systems, and growing together with a collaborative team.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-3 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
            </motion.div>
            
            <motion.div 
              className="pt-6 flex flex-wrap gap-6 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <motion.div 
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span>Based in Skene, Sweden</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div 
                  className="w-2 h-2 rounded-full bg-accent"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <span>Available for opportunities</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
