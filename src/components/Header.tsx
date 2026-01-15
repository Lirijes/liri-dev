import { Mail, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const HeaderLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <motion.a 
    href={href} 
    className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
    whileHover={{ y: -2 }}
    transition={{ type: "spring", stiffness: 400 }}
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
  </motion.a>
);

const Header = () => {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a 
          href="#" 
          className="font-display text-2xl text-foreground"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          Lirije<span className="text-primary">.</span>
        </motion.a>
        
        <nav className="hidden md:flex items-center gap-8">
          <HeaderLink href="#about">About</HeaderLink>
          <HeaderLink href="#experience">Experience</HeaderLink>
          <HeaderLink href="#skills">Skills</HeaderLink>
          <HeaderLink href="#education">Education</HeaderLink>
          <HeaderLink href="#contact">Contact</HeaderLink>
        </nav>

        <div className="flex items-center gap-4">
          <motion.a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
          </motion.a>
          <motion.a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin size={20} />
          </motion.a>
          <motion.a 
            href="mailto:Lirije11@hotmail.com"
            className="text-muted-foreground hover:text-coral transition-colors"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={20} />
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
